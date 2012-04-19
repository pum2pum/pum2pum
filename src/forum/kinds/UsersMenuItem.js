enyo.kind({
    name: "UsersMenuItem",
    kind: "MenuItem",
    published: {
	overlayText: ""
    },
    changeOverlayText: function(users) {
	//TODO get real usercount
	var usercount = 5;
	
    },
    components: [
	{name: "textArea", tag: "p", contents: "~"}
    ],
    handlers: {
	onOverlayTextChanged: "changeOverlayText" // Required for non-touch devices
    },
    create: function() {
	this.inherited(arguments);
	//TODO replace the static stuff with real calls to database.
	//enyo.application.db.getAllUsers(enyo.bind(this, "changeOverlayText"), 99);
	this.changeOverlayText({bing:"ba", bong:"do", bang:"a"});
    }
});
