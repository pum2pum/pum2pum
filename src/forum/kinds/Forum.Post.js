enyo.kind({
    name: "ForumPost",
    classes: "post",
    tag: "li",
    kind: enyo.Control,
    components: [
	{name: "avatar", classes: "avatar", tag: "img", src: "http://chzscience.files.wordpress.com/2011/11/funny-science-news-experiments-memes-dog-science-fuzzy-logic.jpg"},
	{tag: "div", 
	 components: [
	     {name: "username", tag: "p", classes: "username"},
	     {name: "datetime", tag: "p", classes: "datetime"}
	 ] },
	{name: "text", tag: "p", classes: "text"}
    ],
    published: {
	text: "default text in a post",
	userid: 0,
	datetime: "1970-13-37 00:00:00",
	node: null
    },

    create: function () {
	this.inherited(arguments);
	this.textChanged();
	this.datetimeChanged();
	this.useridChanged();
    },

    textChanged: function () {
	this.$.text.setContent(this.text);
    },
    
    datetimeChanged: function () {
	this.$.datetime.setContent(this.datetime);
    },

    useridChanged: function () {
	var t = this;
	console.log(t);
	enyo.application.db.getUser(function (user){
	    console.log(user.item());
	    t.$.username.setContent(user.item().name);
	}, this.userid);
    },
    
    replyTap: function() {
	this.$.body.destroyComponents();
	this.$.body.createComponent({
	    kind: "ReplyBox",
	    text: "",
	    container: this.$.body
	}).render();
    }
    
});