enyo.kind({
	name: "SmallForumTests",
	kind: enyo.TestSuite,

	/** 
	Testcase 4.x.x
	Creates a couple of kinds of different types and checks if the getName() method
	works for each of them (just to make sure that the kinds are declared properly)
	**/
	testCreate: function() {
		var app = new SmallForumApp();

		if(console.log(app.getName())) {
			this.finish();
		}
	},

	testNewThread: function() {
		var app = new SmallForumApp();
		app.init();
		var db = app.getDB();
		db.newThread(null, "hudidum", "123");//function(obj) { console.log("yay") }
		//var ct = new CreateThread();
		//ct.doPost();
	},

/*
	testGetThread: function() {
		var app = new SmallForumApp();
		app.init();
		var db = app.getDB();
		db.getThreads(function(obj) { console.log("yay"); console.log(obj); });
		//var ct = new CreateThread();
		//ct.doPost();
	}
*/

});