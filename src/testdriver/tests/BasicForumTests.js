enyo.kind({
	/**
	 * This test suite tests basic functionality, such as utility functions
	 **/
	name: "BasicForumTests",
	kind: enyo.TestSuite,

	testTsToString: function() {
		/**
		 * Creates a new test-case object
		 * @param date object representing the date to test
		 * @param the expected output-value as string
		 **/
		function tc(date, str) {
			return {date : date/1000, truth: str};
		}
		var test = this;
		var ts = enyo.application.tsToString; // the method to be tested

		// Syntax for the Date-constructor
		// new Date(year, month, day, hours, minutes, seconds, milliseconds)

		// Create a bunch of test cases
		var testcases = [
			tc(new Date(2011, 04-1, 01, 01, 02, 30, 0), "2011-04-01 01:02:30"),
			tc(new Date(1990, 10-1, 11, 12, 10, 06, 0), "1990-10-11 12:10:06"),
			tc(new Date(2189, 12-1, 31, 20, 01, 59, 250), "2189-12-31 20:01:59")
		];

		/* For each test case, check that the value returned from the function is the
		   same as the correct (truth) -value defined above for each test case */
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