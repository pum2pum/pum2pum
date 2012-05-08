enyo.kind({
    name: "ForumMenu",
    kind: enyo.Control,
    tag: 'ul',
    classes: "forumMenu",
    
    components: [
    { kind: "UsersMenuItem", name: "UsersMenuItem", src: "/images/icons/online.png", newKind: "UsersView", classes: "visibleItem normal-icon"},
    { kind: "RepliesMenuItem", name: "RepliesMenuItem", src: "/images/icons/reply.png", newKind: "RepliesView", classes: "visibleItem normal-icon"},
    { kind: "MenuItem", name: "MenuItem", src: "/images/icons/settings.png", newKind: "SettingsView", classes: "visibleItem normal-icon"},
    { kind: "CollapseMenuItem", name:"CollapseMenuItem", src: "/images/icons/collapse.png", classes: "visibleItem normal-icon"},
    { kind: "ShowMenuItem", name:"ShowMenuItem", src: "/images/icons/show.png", classes: "hiddenItem small-icon"}
    ],
    create: function() {
	   this.inherited(arguments);
    },
    show: function(){

        //changes the class in the css properties
        this.$.UsersMenuItem.removeClass("hiddenItem");
        this.$.UsersMenuItem.addClass("visibleItem");

        this.$.RepliesMenuItem.removeClass("hiddenItem");
        this.$.RepliesMenuItem.addClass("visibleItem");

        this.$.MenuItem.removeClass("hiddenItem");
        this.$.MenuItem.addClass("visibleItem");

        this.$.CollapseMenuItem.removeClass("hiddenItem");
        this.$.CollapseMenuItem.addClass("visibleItem");

        this.$.ShowMenuItem.removeClass("visibleItem");
        this.$.ShowMenuItem.addClass("hiddenItem");
    },
    
    hide: function(){
        this.$.UsersMenuItem.removeClass("visibleItem");
		this.$.UsersMenuItem.addClass("hiddenItem");

        this.$.RepliesMenuItem.removeClass("visibleItem");
        this.$.RepliesMenuItem.addClass("hiddenItem");
        
        this.$.MenuItem.removeClass("visibleItem");
        this.$.MenuItem.addClass("hiddenItem");
        
        this.$.CollapseMenuItem.removeClass("visibleItem");
        this.$.CollapseMenuItem.addClass("hiddenItem");
        
        this.$.ShowMenuItem.removeClass("hiddenItem");
        this.$.ShowMenuItem.addClass("visibleItem");
    }
});


