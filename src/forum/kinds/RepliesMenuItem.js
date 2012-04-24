enyo.kind({
    name: "RepliesMenuItem",
    kind: "MenuItem",
    setOverlayText: function(newText) {
	this.$.textArea.setContent(newText);
    },
    setIcon: function(hasNoReplies) {
	if (hasNoReplies) {
	    this.src = "/images/icons/reply.png";
	} else {
	    this.src = "/images/icons/reply_new.png";
	}
	this.srcChanged();
    },
    replyCountCallback: function(replies) {
	var replyCount = replies._list.length;
	if (replyCount === 99) {
	    this.setOverlayText("99+");
	} else {
	    this.setOverlayText(replyCount);
	}
	this.setIcon(replyCount === 0);
    },
    components: [
	{name: "textArea", tag: "p", contents: "", classes: "menuItemFloatText"}
    ],
    create: function() {
	this.inherited(arguments);
	// TODO Get real reply count
	enyo.application.db.getAllUsers(enyo.bind(this, "replyCountCallback"), 99);
    }
});
