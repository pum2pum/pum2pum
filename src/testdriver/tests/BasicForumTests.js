enyo.kind({
	name: "BasicForumTests",
	kind: enyo.TestSuite,

	/** 
	Testcase 4.1.1
	Creates a couple of kinds of different types and checks if the getName() method
	works for each of them (just to make sure that the kinds are declared properly)
	**/
	testCreateKinds: function() {
		var kinds = [new Tabs(), new CreateThread(), new Users(), new Threads(), new Thread()];

		for (var i = kinds.length - 1; i >= 0; i--) {
			console.log(kinds[i].getName());
		};
		this.finish();
	},

});