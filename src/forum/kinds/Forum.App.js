enyo.kind({
	name: "ForumApp",
	kind: enyo.Control,
	tag: "div",
	components: [
		{ kind: "ForumMenu", name: "forumMenu" },
		{ kind: "ForumView", name: "forumView" }
	],

	handlers: {
		onHideMenu: "hideMenu",
		onShowMenu: "showMenu",
		onhashchange: "hashchange"
	},

	showCategoryView: function () {
		console.log( "categoryview" );
		this.$.forumView.createComponent({
			kind: "CategoryView"
		});
		this.render();
	},

	showSubForumView: function ( id ) {
		var that = this;
		id = parseInt( id );
		function gotItem ( item ) {
			that.$.forumView.createComponent({
				kind: "ForumThreadContainer",
				subForum: item.item()
			});
			that.render();
		}

		enyo.application.db.getSubForum( gotItem, id );
	},

	showThreadView: function ( id ) {
		var that = this;
		id = parseInt( id );
		function gotItem ( item ) {
			that.$.forumView.createComponent({
				kind: "ForumPostContainer",
				thread: item.item()
			});
			that.render();
		}

		enyo.application.db.getThread( gotItem, id );
	},

	hashchange: function ( sender, event ) {
		console.log("hashchange");
		var hash = location.hash.substr( 1 );
		var valuePairs = hash.split( "&" );
		var tmpValue;
		var values = { };
		for ( i = 0; i < valuePairs.length; ++i ) {
			var tmp = valuePairs[i].split("=");
			values[tmp[0]] = tmp[1];
		}

		this.$.forumView.destroyClientControls();

		switch ( values["kind"] ) {
			case "subForum":
				this.showSubForumView( values["id"] );
				break;
			case "thread":
				this.showThreadView( values["id"] );
				break;
			default:
				this.showCategoryView();
				break;
		}
	},

	hideMenu: function(){
		this.$.forumMenu.hide();
	},

	showMenu: function(){
		this.$.forumMenu.show();
	},

	create: function () {
		this.inherited( arguments );

		this.hashchange();
	}
});
