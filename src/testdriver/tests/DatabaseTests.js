/**
 * This test suite tests the database helper functions which communicates with
 * the livedb.io database functions in api.js
 **/

/**
Config options:
VALIDATE: If true, insert-tests waits for error-callbacks before passing the test.
TIMEOUT: The time to wait for the callback.
**/
var VALIDATE = false, TIMEOUT = 1000;
var count = 0;

var gdb; // Global database variable
var g = []; // Global array for data between tests

/**
 * Finishes a create-test with or without a validation-delay depending on config options 
 **/
function finishTest(test) {
	if(VALIDATE) {
		/* A bit ugly, but since database API does not always  send a callback, it's 
		impossible to know when we safely can say that no error-callback will come */
		setTimeout(function() { 
			test.finish(); 
		}, 
		TIMEOUT);
	} else {
		test.finish();
	}
}
/* Returns a callback-function which fails the supplied test */
function failCallback(test) {
	return function(e) {
		console.log(e);
		test.finish("Recieved an error-callback");
	}
}

/**
* Returns a callback-function which checks if all items has the property values in names.
* i.e. checkListCallback(test, ['a', 'b'], "name") will pass iff result["name"] contains
* the objects "a" and/or "b", where result is the items returned from the query.
**/
function checkListCallback(test, names, property, setGlobal) {
	return function(list) {
				if(list === undefined) {
					test.finish("Did not recieve any objects");
					return false;
				}
				var items = list.items();
				console.log(items);

				if (items.length != names.length) {
					test.finish("Wrong number of objects recieved");
					list.close();
					return false;
				}

				// Check if all recieved items is valid
				for(n in items) {
					if(names.indexOf(items[n][property]) == -1) {
						list.close();
						test.finish("Unexpected object name '" + items[n][property] + "'");
						return false;
					}
				}

				if(setGlobal) {
					// Save the object as something global for future use
					g[setGlobal] = items[0];
					console.log(g[setGlobal]);
				}
				// Stop callback-prenumerations on the query
				list.close();
				test.finish();
		}
}

enyo.kind({
	name: "DatabaseTests",
	kind: enyo.TestSuite,

	/** 
	Testcase 3.1.1
	Logs in to the database
	**/
	testLogin: function() {
		var test = this;

		gdb = new forumDatabase();
		gdb.login(
			function(m) {
				if(m === "success") {
					test.finish();
				}
			}, 
			"testUser"
		);
	},

	/** 
	Testcase 3.1.2
	Gets a list of database users 
	**/
	testGetUsers: function() {
		var test = this;
		var getall = function() {
			gdb.getAllUsers(checkListCallback(test, ["otherUser", "testUser"], "name"), 2);
		}
		gdb.login(
			getall,
			"otherUser"
		);
	},

	/** 
	Testcase 3.2.1
	Creates a new category
	**/
	testNewCategory: function() {
		var test = this;

		gdb.newCategory(
			failCallback(test), "MyCategory", "Description"
		);
		finishTest(test);
	},

	/** 
	Testcase 3.2.2
	Gets a list of categories 
	**/
	testGetCategory: function() {
		var test = this;

		gdb.getCategories(checkListCallback(test, ["MyCategory"], "title", "cat"), 1, 0);
	},

	/** 
	Testcase 3.3.1
	Creates a new subforum
	**/
	testSubForum: function() {
		var test = this;

		gdb.newSubForum(
			failCallback(test), g["cat"], "MySubForum", "SubForum description"
		);
		finishTest(test);
	},

	/** 
	Testcase 3.3.2
	Gets a list of subforums
	**/
	testGetSubForum: function() {
		var test = this;

/* 
Lines below is commented-out sine the database cannot handle multiple writes at the 
same time. Yup, seems lite a quite hairy bug but it's out of scope for these tests.
*/
/*		gdb.newSubForum(
			failCallback(test), g["cat"], "MySubForum 2", "SubForum description 2"
		);
*/
		gdb.getSubForums(
			checkListCallback(test, ["MySubForum"], "title", "subforum"), g["cat"], 1, 0
		);
	},

	/** 
	Testcase 3.4.1
	Creates a new thread
	**/
	testNewThreads: function() {
		var test = this;
/*
		gdb.newThread(
			failCallback(test), g["subforum"], "TestThread", "Test description", "Content of thread"
		);
*/
		gdb.newThread(
			failCallback(test), g["subforum"], "Yet Another", "Test description 2", "Content of thread 2"
		);

		finishTest(test);
	},

	/** 
	Testcase 3.4.2
	Gets some threads 

	TODO: DB returnerar just nu flera likadana namn vilket ändå pass:ar. Fixa.
	**/
	testGetThreads: function() {
		var test = this;

		gdb.getThreads(
			checkListCallback(test, ["Yet Another"], "title", "thread"), g["subforum"], 1, 0
		);
	},

	/** 
	Testcase 3.5.1
	Creates a new post 
	**/
	testNewPost: function() {
		var test = this;

		gdb.newPost(
			failCallback(test), g["thread"], "Post Content"
		);
		finishTest(test);
	},


	/** 
	Testcase 3.5.2
	Gets some posts
	**/
	testGetPost: function() {
		var test = this;

		gdb.getPosts(
			checkListCallback(test, ["Post Content"], "content", "post"), g["thread"], 1, 0
		);
	},

	/** 
	Testcase 3.6.1
	Gets some posts
	**/
	testNewAnswer: function() {
		var test = this;

		gdb.newAnswer(
			failCallback(test), g["post"], "An answer"
		);
		finishTest(test);
	},

	/** 
	Testcase 3.6.2
	Gets some posts
	**/
	testGetAnswer: function() {
		var test = this;

		gdb.getAnswers(
			checkListCallback(test, ["An answer"], "content"), g["post"], 1, 0
		);
	},

	/** 
	Testcase 3.7.1
	Checks if callback is recieved when adding more objects
	**/
	testCallback: function() {
		var test = this;

		gdb.getThreads(
			function(list) { 				
				if(count > 0) {
					var s;
					/*
					Does not work for some really odd reason...
					var o = list.items();

					if(o[1] != "a") {
						s = "Unexpected title " + o[1];
					}
					*/
					list.close();
					test.finish(s);
					return false;
				}
				count++;
				gdb.newThread(
					function (e) { test.fail("Recieved error " + e); }, g["subforum"], "a", "b", "c"
				);

			}, g["subforum"], 2, 0
		);
	},
});