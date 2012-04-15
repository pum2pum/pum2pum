var gdb; // Global database variable

enyo.kind({
	name: "DatabaseTests",
	kind: enyo.TestSuite,

	/** 
	Testcase x.x.1
	Logs in to the database
	**/
	testLogin: function() {
		var that = this;

		gdb = new forumDatabase();
		gdb.login(
			function(m) {
				if(m === "success") {
					that.finish();
				}
			}, 
			"testUser"
		);
	},

	/** 
	Testcase x.x.2
	Gets a list of database users and checks if 
	**/
	testNewCategory: function() {
		var test = this;
		db = new forumDatabase();
		db.newCategory(
			function(e) {
				console.log(e);
				test.finish();
			}, 
			"MyCategory", "Description"
		);
	},

	/** 
	Testcase x.x.3
	Gets a list of database users and checks if 
	**/
	testGetUsers: function() {
		var test = this;
		var getall = function() {
			gdb.getAllUsers(
				function(users) {
					if(users === undefined) {
						test.finish("Did not recieve any users");
						return false;
					} else if (users.length < 2) {
						test.finish("Too few users");
						return false;
					}
					var names = ["otherUser", "testUser"];
					var items = users.items();

					for(n in items) {
						if(names.indexOf(items[n]["name"]) == -1) {
							test.finish("Unexpected username '" + items[n]["name"] + "'");
							return false;
						}
					}
					test.finish();
			}, 2);
		}

		gdb.login(
			getall,
			"otherUser"
		);
	},



});