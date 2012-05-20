/**
* This is the "main" kind in the Forum. This is the first thing that is being rendered.
**/

enyo.kind({
	name: "ForumApp",
	kind: enyo.Control,
	tag: "div",

	/**
	* It holds the menu and the view where the different parts of the forum is being shown.
	**/
	components: [
		{ kind: "ForumMenu", name: "forumMenu" },
		{ kind: "ForumView", name: "forumView", classes: "menuMargin" }
	],

	handlers: {
		onHideMenu: "hideMenu",
		onShowMenu: "showMenu",
		onhashchange: "hashchange" // When the hash changes the function "hashchange" is being called
	},

	showLoginView: function () { // Show the loginview
		this.$.forumView.createComponent({
			kind: "Login"
		});
		this.render();
	},

	showCategoryView: function () { // Show the categoryview
		this.$.forumView.createComponent({
			kind: "CategoryView"
		});
		this.render();
	},

	showSubForumView: function ( id ) { // Show the subforumview
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

	showThreadView: function ( id ) { // Show the threadview
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
	/**
	* This function is begin called when the hash changes.
	* It decides which view that should be displayed.
	**/
	hashchange: function ( sender, event ) {
		var hash = location.hash.substr( 1 ); // Get the hash without #
		var valuePairs = hash.split( "&" );
		var tmpValue;
		var values = { };
		for ( i = 0; i < valuePairs.length; ++i ) {
			var tmp = valuePairs[i].split("=");
			values[tmp[0]] = tmp[1];
		}

		this.$.forumView.destroyClientControls();

		switch ( values["kind"] ) { // Decide which view
			case "subForum":
				this.showSubForumView( values["id"] );
				break;
			case "thread":
				this.showThreadView( values["id"] );
				break;
			default: // no special view
				// See if the user is logged in
				var username = getCookie("username");
				if ( username === null || username === "" || username === undefined  ) { // Not logged in, show login view
					this.showLoginView();
				} else { // Login to the database
					if ( !enyo.application.db.isLoggedIn() ) { 
						enyo.application.db.login( enyo.bind(this, "showCategoryView") , username);
					} else {
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

		this.hashchange(); // Show the first view
	}
});
