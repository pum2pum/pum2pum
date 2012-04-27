enyo.kind({
	name: "ForumApp",
	kind: enyo.Control,
	tag: "div",
	components: [
		{kind: "ForumMenu", name: "forumMenu"},
		{kind: "ForumView", name: "forumView"}
	],

	handlers: {
		onChangeView: "changeView",
		onHideMenu: "hideMenu",
		onShowMenu: "showMenu"
	},

	changeView: function( sender, props ){
		newComponent = {
			container: this.$.forumView
		};

		for( prop in props ) {
			newComponent[prop] = props[prop];
		}

		this.$.forumView.destroyClientControls();
		this.createComponent( newComponent );
		this.$.forumView.render();
	},

	hideMenu: function(){
		this.$.forumMenu.hide();
	},

	showMenu: function(){
		this.$.forumMenu.show();
	},

	create: function () {
		this.inherited( arguments );

		this.$.forumView.createComponent({
			kind: "CategoryView"
		});
	}
});
