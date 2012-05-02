function getCookie(c_name) {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++) {
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name) {
                return unescape(y);
            }
        }
    }

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
//enyo.Scroller.touchScrolling = true; 
enyo.application = {
	db: new forumDatabase(),

	tsToString: function( uts ) {

		function pad (n) {
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