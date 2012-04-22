enyo.kind({
    name: "ForumMenu",
    kind: enyo.Control,
    tag: 'ul',
    classes: "forumMenu",
    create: function() {
	this.inherited(arguments);
    },
    components: [
	{ kind: "UsersMenuItem", src: "/images/icons/online.png", newKind: "UsersView"},
	{ kind: "RepliesMenuItem", src: "/images/icons/reply.png", newKind: "RepliesView"},
	{ kind: "MenuItem", src: "/images/icons/settings.png", newKind: "SettingsView"},
	{ kind: "CollapseMenuItem", src: "/images/icons/collapse.png"},
	{ kind: "ShowMenuItem", src: "/images/icons/settings.png"}
	],
    show: function(){
    	this.$.UsersMenuItem.addStyles("show: visible;");
    	this.$.RepliesMenuItem.addStyles("show: visible;");
    	this.$.MenuItem.addStyles("show: visible;");
    	this.$.CollapseMenuItem.addStyles("show: visible;");
    	this.$.ShowMenuItem.addStyles("show: hidden;");
    },
    hide: function(){
		this.$.UsersMenuItem.addStyles("show: hidden;");
    	this.$.RepliesMenuItem.addStyles("show: hidden;");
    	this.$.MenuItem.addStyles("show: hidden;");
    	this.$.CollapseMenuItem.addStyles("show: hidden;");
    	this.$.ShowMenuItem.addStyles("show: visible;");
    }
});


