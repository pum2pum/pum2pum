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
	changeView: function(sender, kind){
		this.$.forumView.destroyClientControls();
		this.createComponent({
			//kind: kind,
			container: this.$.forumView,
			content: kind

		});
		this.$.forumView.render();
	}



})