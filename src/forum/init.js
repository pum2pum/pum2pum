enyo.dispatcher.listen( window, "hashchange" );
enyo.master._bubbleDefault = enyo.master.bubble;
enyo.master.bubble = function(inEventName, inEvent, inSender) {
    if (inEventName == "onhashchange") {
        enyo.master.waterfallDown("onhashchange");
    } else {
        enyo.master._bubbleDefault(inEventName, inEvent, inSender);
    }
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

enyo.application = {
	db: new forumDatabase(),

	tsToString: function( uts ) {
		function (n) {
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

	language: "en"
}

enyo.application.changeView = function( kind, id ) {
    var hash = "kind=" + kind + "&id=" + id;
    location.hash = hash;    
}