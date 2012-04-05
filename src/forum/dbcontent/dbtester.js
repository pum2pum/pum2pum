enyo.kind({
	name: "dbtestapp",
	kind: enyo.Control,
	tag: "div",

	components: [
		{name: "btnNewCat",tag:"Button", ontap: "newcat", content: "New category"},
		{name: "categories", tag: "ul" }
	],

	newcat: function(){
		title = window.prompt("cat titel");
		db.newCategory(null,title, "autocat");
	},

	populate: function(){
		db.getCategories(enyo.bind(this, "populateCallback"), 10, 0);
	},

	populateCallback: function(list){
		this.$.categories.destroyClientControls();
		enyo.forEach(list.items(), this.addDBChild, this);
		this.$.categories.render();
	},

	addDBChild: function(c){
		console.log(c);
		this.createComponent({
			kind: "category",
			container: this.$.categories,
			title: c.title,
			dbparent: c
		}).populate();
	}
});

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

enyo.kind({
	name: "thread",
	kind: enyo.Control,
	tag: "li",

	published: {
		title: "",
		dbparent: "",
	},

	components: [
		{ tag: "button", name: "btnNewPost", content: "new Post", ontap: "newpost"},
		{ tag: "span", name: "title" },
		{ tag: "ul", name: "children" }
	],

	newpost: function(){
		title = window.prompt("Titel");
		db.newThread(null, this.dbparent, title, "en post");
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
		db.getPosts(enyo.bind(this, "populateCallback"), this.dbparent, 10, 0);
	},

	populateCallback: function(list){
		this.$.children.destroyClientControls();
		enyo.forEach(list.items(), this.addDBChild, this);
		this.$.children.render();
	},

	addDBChild: function(c){
		this.createComponent({
			kind: "post",
			container: this.$.children,
			title: c.title,
			dbparent: c
		});
	}
});

enyo.kind({
	name: "post",
	kind: enyo.Control,
	tag: "li",

	published: {
		title: "",
		dbparent: "",
	},

	components: [
		{ tag: "button", name: "btnNewAns", content: "new answer", ontap: "newans"},
		{ tag: "span", name: "title" },
		{ tag: "ul", name: "children" }
	],

	newans: function(){
		content = window.prompt("content");
		db.newAnswer(null, this.dbparent, content, "ett svar");
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
		db.getAnswers(enyo.bind(this, "populateCallback"), this.dbparent, 10, 0);
	},

	populateCallback: function(list){
		this.$.children.destroyClientControls();
		enyo.forEach(list.items(), this.addDBChild, this);
		this.$.children.render();
	},

	addDBChild: function(c){
		this.createComponent({
			kind: "answer",
			container: this.$.children,
			title: c.content,
			dbparent: c
		});
	}
});

enyo.kind({
	name: "answer",
	kind: enyo.Control,
	tag: "li",

	published: {
		title: "",
		dbparent: "",
	},

	components: [
		{ tag: "span", name: "title" },
	],

	create: function(){
		this.inherited(arguments);
		this.titleChanged();
	},

	titleChanged: function(){
		this.$.title.setContent(this.title + " - " + this.dbparent.id);
	}

});


var db;

function load () {
	root = new dbtestapp();
	root.renderInto(document.body);

	db = new forumDatabase();
	db.login(doit, "Gustav");
}

function doit () {
	root.populate();
}