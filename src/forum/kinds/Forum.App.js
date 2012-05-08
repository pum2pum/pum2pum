enyo.kind({
	name: "ForumApp",
	kind: enyo.Control,
	tag: "div",

	components: [
		{ kind: "ForumMenu", name: "forumMenu" },
		{ kind: "ForumView", name: "forumView", classes: "menuMargin" }
	],

	handlers: {
		onHideMenu: "hideMenu",
		onShowMenu: "showMenu",
		onhashchange: "hashchange"
	},

	showLoginView: function () {
		this.$.forumView.createComponent({
			kind: "Login"
		});
		this.render();
	},

	showCategoryView: function () {
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
				var username = getCookie("username");
				console.log(username);
				if ( username === null || username === "" || username === undefined  ) {
					this.showLoginView();
				} else {
					if ( !enyo.application.db.isLoggedIn() ) {
						console.log("inte inloggad");
						enyo.application.db.login( enyo.bind(this, "showCategoryView") , username);
					} else {
						console.log("inloggad");
						this.showCategoryView();
					}
				}
				break;
		}
	},

	hideMenu: function(){
		this.$.forumMenu.hide();
		this.$.forumView.removeClass("menuMargin");
		this.$.forumView.addClass("menuNoMargin");
	},

	showMenu: function(){
		this.$.forumMenu.show();
		this.$.forumView.removeClass("menuNoMargin");
		this.$.forumView.addClass("menuMargin");
	},

	create: function () {
		this.inherited( arguments );

		this.hashchange();
	}
});
