enyo.kind({
	name: "BasicForumTests",
	kind: enyo.TestSuite,

	/** 
	Testcase 4.1.1
	Creates a couple of kinds of different types and checks if the getName() method
	works for each of them (just to make sure that the kinds are declared properly)
	**/
/*	testCreateKinds: function() {
		var kinds = [new Tabs(), new CreateThread(), new Users(), new Threads(), new Thread()];

		for (var i = kinds.length - 1; i >= 0; i--) {
			console.log(kinds[i].getName());
		};
		this.finish();
	},
*/

	testTsToString: function() {
		function tc(date, str) {
			return {date : date/1000, truth: str};
		}
		var test = this;
		var ts = enyo.application.tsToString;

		// new Date(year, month, day, hours, minutes, seconds, milliseconds)
		var testcases = [
			tc(new Date(2011, 04-1, 01, 01, 02, 30, 0), "2011-04-01 01:02:30"),
			tc(new Date(1990, 10-1, 11, 12, 10, 06, 0), "1990-10-11 12:10:06"),
			tc(new Date(2189, 12-1, 31, 20, 01, 59, 250), "2189-12-31 20:01:59")
		];

		for (i in testcases) {
			var tc = testcases[i];

			if( ts(tc.date) != tc.truth ) {
				test.finish("Wrong value, expected " + tc.truth + " but got " + ts(tc.date));
				return false;
			}
		}
		test.finish();
		
	},

});