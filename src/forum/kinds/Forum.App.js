enyo.kind({
	name: "ForumApp",
	kind: enyo.Control,
	tag: "div",
	components: [
		{kind: "ForumMenu", name: "forumMenu"},
		{kind: "ForumView", name: "forumView"}
	],

	handlers: {
		onChangeView: "changeView"
	},

	//the new function to be used instead of old goTo-functions in forumMenu
	changeView: function( sender, props ){
		newComponent = {
			container: this.$.forumView,
		};

		for( prop in props ) {
			newComponent[prop] = props[prop];
		}

		this.$.forumView.destroyClientControls();
		this.createComponent( newComponent );
		this.$.forumView.render();
	}



})