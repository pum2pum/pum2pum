String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

enyo.application = {
	db: new forumDatabase(),

	tsToString: function( uts ) {
		function pad(n) {
			return n < 10 ? ("0" + n) : n;
		}
		var date = new Date( uts * 1000 );
		return date.getFullYear() + "-" + 
		pad(date.getMonth( ) + 1) + "-" + 
		pad(date.getDate( )) + " " + 
		pad(date.getHours( )) + ":" + 
		pad(date.getMinutes( )) + ":" + 
		pad(date.getSeconds( ));
	},

	language: "sv"
}