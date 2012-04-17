enyo.application = {
	db: new forumDatabase(),

	tsToString: function( uts ) {
		var date = new Date( uts * 1000 );
		return date.getFullYear() + "-" + 
		(date.getMonth( ) + 1) + "-" + 
		date.getDate( ) + " " + 
		date.getHours( ) + ":" + 
		date.getMinutes( ) + ":" + 
		date.getSeconds( );
	}
}