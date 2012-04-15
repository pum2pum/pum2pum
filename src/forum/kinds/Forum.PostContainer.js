enyo.kind({
    name: "ForumPostContainer",
    kind: enyo.Control,
    components: [
	{name: "threadid", tag: "p"},
	{name: "body", tag: "output"}
    ],
    published: {
	threadid: "Default id"
    },

    create: function () {
	this.inherited(arguments);
	this.threadidChanged();
	//creating couple of Posts, it should fetch from database though
	this.$.body.createComponent({
	    kind: "ForumPost",
	    text: "Post1"
	}).render();
	this.$.body.createComponent({
	    kind: "ForumPost",
	    text: "Post2"
	}).render();
	this.$.body.createComponent({
	    kind: "ForumPost",
	    text: "Post3"
	}).render();
	this.$.body.createComponent({
	    kind: "ForumPost",
	    text: "Post4"
	}).render();
    },
    
    threadidChanged: function () {
	this.$.threadid.setContent(this.threadid);
    }
});
	
    