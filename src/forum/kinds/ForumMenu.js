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
	{ kind: "RepliesMenuItem", newKind: "RepliesView"},
	{ kind: "MenuItem", src: "/images/icons/settings.png", newKind: "SettingsView"},
	{ kind: "CollapseMenuItem", src: "/images/icons/collapse.png"},
	{ kind: "MenuItem", newKind: "SettingsView" },
	{ kind: "MenuItem", newKind: "en annan view" },
	{ kind: "MenuItem", newKind: "razzz" }
    ]
});
