enyo.kind({
	name: "subforum",
	kind: enyo.Control,
	tag: "li",

	published: {
		title: "",
		dbparent: "",
	},

	components: [
		{ tag: "button", name: "btnNewThread", content: "new Thread", ontap: "newthread"},
		{ tag: "span", name: "title" },
		{ tag: "ul", name: "children" }
	],

	newthread: function(){
		title = window.prompt("tråd titel");
		db.newThread(null, this.dbparent, title, "En tråd");
	},

	create: function(){
		this.inherited(arguments);
		this.titleChanged();
		this.populate();
	},

	titleChanged: function(){
		this.$.title.setContent(this.title + " - " + this.dbparent.id);
	},

	populate: function(){
		db.getThreads(enyo.bind(this, "populateCallback"), this.dbparent, 10, 0);
	},

	populateCallback: function(list){
		//this.$.children.destroyClientControls();
		enyo.forEach(list.items(), this.addDBChild, this);
		this.$.children.render();
	},

	addDBChild: function(c){
		this.createComponent({
			kind: "thread",
			container: this.$.children,
			title: c.title,
			dbparent: c
		});
	}
});