enyo.kind({
    name: "MenuItem",
    kind: "onyx.IconButton",
    published: {
	newKind: ""
    },
    handlers: {
	   mouseup: "tap" // Required for non-touch devices
    },
    create: function() {
	   this.inherited(arguments);
    },
    tap: function(inSender, inEvent) {
	// Go to the intended view
	this.bubble("onChangeView", this.newKind);
    }
});
