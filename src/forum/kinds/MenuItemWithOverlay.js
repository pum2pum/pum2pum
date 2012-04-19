enyo.kind({
    name: "MenuItemWithOverlay",
    kind: "MenuItem",
    published: {
	imageurl: "",
	alttext: "",
	executeaction: function(){}
    }
    // handlers: {
	// mouseup: "tap" // Required for non-touch devices
    // },
    // tag: "li",
    // create: function() {
	// this.inherited(arguments);
	// this.content = "<img src='" + this.imageUrl + "' alt='" + this.altText + "' />";
	// this.getUserCount();
    // },
    // getUserCount: function() {
	// // Set up connection to liveDB so that usercount is
	// // always kept up to date
    // },
    // tap: function(inSender, inEvent) {
	// // Go to the intended view
	// this.executeAction();
	// this.applyStyle("background-color", "black");
    // }
});

