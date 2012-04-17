enyo.kind({
	name: "Category",
	kind: enyo.Control,
	tag: "li",

	components: [
		{ name: "btnNewSub", tag: "button", content: "new Subforum", ontap: "newsub"},
		
		{ name: "categoryContainer", tag: "div", components: [
				{ name: "head", tag: "div", components: [
					{ name: "title", tag: "p", ontap: "gotoThread"},
					{ name: "description", tag: "p"}
				]},
				{ name: "newThreads", tag: "p"},
				{ name: "threads", tag: "p"},
				{ name: "posts", tag: "p"}
				]}
	],

	published: {
		title: "",
	},

	newsub: function(){
		subForumTitle = window.prompt("subforum title");
		subForumDescription = window.prompt("subforum description");
		enyo.application.db.newSubForum(null, this.dbparent, subForumTitle, subForumDescription);
	},

	create: function(){
		this.inherited(arguments);
		this.titleChanged();
	},

	titleChanged: function(){
		this.$.title.setContent(this.title + " - " + this.dbparent.id);
	},

	populate: function(){
		db.getSubForums(enyo.bind(this, "populateCallback"), this.dbparent, 10, 0);
	},

	populateCallback: function(list){
		this.$.children.destroyClientControls();
		enyo.forEach(list.items(), this.addDBChild, this);
		this.$.children.render();
	},

	addDBChild: function(c){
		this.createComponent({
			kind: "subforum",
			container: this.$.children,
			title: c.title,
			dbparent: c
		});
	}
});