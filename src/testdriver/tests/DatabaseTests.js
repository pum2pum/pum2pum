// If validate is true, insert-tests waits for error-callbacks before passing the test.
// Timeout is the time to wait for the callback.
var VALIDATE = false, TIMEOUT = 1000;
var count = 0;

var gdb; // Global database variable
var g = [];

/* Finishes a create-test with or without a validation-delay */
function finishTest(test) {
	if(VALIDATE) {
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
* the objects "a" an "b", where result is the items returned from the query.
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
//					list.close();
					return false;
				}

				for(n in items) {
					if(names.indexOf(items[n][property]) == -1) {
//						list.close();
						test.finish("Unexpected object name '" + items[n][property] + "'");
						return false;
					}
				}

				if(setGlobal) {
					g[setGlobal] = items[0];
					console.log(g[setGlobal]);
				}

//				list.close();
				test.finish();
		}
}

enyo.kind({
	name: "DatabaseTests",
	kind: enyo.TestSuite,

	/** 
	Testcase x.x.1
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
	Testcase x.x.2
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
	Testcase x.x.3
	Gets a list of database users 
	**/
/*	testGetUsers: function() {
		var test = this;
		var getall = function() {
			gdb.getAllUsers(checkListCallback(test, ["otherUser", "testUser"], "name"), 2);
		}
		gdb.login(
			getall,
			"otherUser"
		);
	},
*/
	/** 
	Testcase x.x.4
	Gets a list of categories 
	**/
	testGetCategory: function() {
		var test = this;

		gdb.getCategories(checkListCallback(test, ["MyCategory"], "title", "cat"), 1, 0);
	},

	/** 
	Testcase x.x.5
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
	Testcase x.x.6
	Gets a list of subforums
	**/
	testGetSubForum: function() {
		var test = this;

// Bortkommenterat: Grrr för osynkade databaser som dessutom inte skickar callbacks
/*		gdb.newSubForum(
			failCallback(test), g["cat"], "MySubForum 2", "SubForum description 2"
		);
*/
		gdb.getSubForums(
			checkListCallback(test, ["MySubForum"], "title", "subforum"), g["cat"], 1, 0
		);
	},

	/** 
	Testcase x.x.7
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
	Testcase x.x.8
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
	Testcase x.x.9
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
	Testcase x.x.10
	Gets some posts
	**/
	testGetPost: function() {
		var test = this;

		gdb.getPosts(
			checkListCallback(test, ["Post Content"], "content", "post"), g["thread"], 1, 0
		);
	},

	/** 
	Testcase x.x.11
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
	Testcase x.x.12
	Gets some posts
	**/
	testGetAnswer: function() {
		var test = this;

		gdb.getAnswers(
			checkListCallback(test, ["An answer"], "content"), g["post"], 1, 0
		);
	},

	/** 
	Testcase x.x.13
	Checks if callback is recieved when adding more obejcts
	**/
	testCallback: function() {
		var test = this;

		gdb.getThreads(
			function(list) { 
				console.log("mupp " + count);
				
				if(count == 2) {
					test.finish();
					return false;
				}
				count++;

			}, g["subforum"], 1, 0
		);

		setTimeout(function() {
			console.log("new!");
			gdb.newThread(
				function (e) { test.fail("Recieved error " + e); }, g["subforum"], "a", "b", "c"
			);
		}, 1000);
	},
});