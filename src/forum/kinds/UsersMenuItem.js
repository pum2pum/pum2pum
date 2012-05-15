enyo.kind({
    name: "UsersMenuItem",
    kind: "MenuItem",
    setOverlayText: function(newText) {
	this.$.textArea.setContent(newText);
    },
    countUsers: function(users) {
	var onlineUsers = 0;
	for (var i = 0; i < users.length; i++) {
		if (users[i]._online === 1) {
		    onlineUsers += 1;
		}
	}
	return onlineUsers;
    },
    userCountCallback: function(users) {
	var userCount = this.countUsers(users);
	if (userCount === 99) {
	    this.setOverlayText("99+");
	} else {
	    this.setOverlayText(userCount);
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
