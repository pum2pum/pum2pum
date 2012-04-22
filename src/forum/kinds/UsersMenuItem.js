enyo.kind({
    name: "UsersMenuItem",
    kind: "MenuItem",
    setOverlayText: function(newText) {
	this.$.textArea.setContent(newText);
    },
    userCountCallback: function(users) {
	if (users._list.length === 99) {
	    this.setOverlayText("99+");
	} else {
	    this.setOverlayText(users._list.length);
	}
    },
    components: [
	{name: "textArea", tag: "p", contents: "", classes: "menuItemFloatText"}
    ],
    create: function() {
	this.inherited(arguments);
	enyo.application.db.getAllUsers(enyo.bind(this, "userCountCallback"), 99);
    }
});
