enyo.kind({
	name: "category",
	kind: enyo.Control,
	tag: "li",

	published: {
		title: "",
		dbparent: "",
	},

	components: [
		{ tag: "button", name: "btnNewSub", content: "new Subforum", ontap: "newsub"},
		{ tag: "span", name: "title" },
		{ tag: "ul", name: "children" }
	],

	newsub: function(){
		title = window.prompt("sub titel");
		db.newSubForum(null, this.dbparent, title, "Ett subforum");
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