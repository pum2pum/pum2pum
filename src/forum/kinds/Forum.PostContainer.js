enyo.kind({
    name: "ForumPostContainer",
    kind: enyo.Control,
    tag: "div",
    components: [
	{name: "threadid", tag: "p"},
//	{name: "body", tag: "output"}
	{name: "posts", tag: "ul"}
    ],
    published: {
	threadid: "Default id"
    },
    
    newPost: function (){
	enyo.application.db.getPosts(enyo.bind(this, "gotPosts"), 999, 0);
    },

    create: function () {
console.log("herp");
	this.inherited(arguments);
//	this.threadidChanged();
	this.populate();
	//creating couple of Posts, it should fetch from database though
	/*this.$.body.createComponent({
	    kind: "ForumPost",
	    text: "Post1",
	    userid: 1,
	    username: "HerpUser"
	}).render();
	this.$.body.createComponent({
	    kind: "ForumPost",
	    text: "Post2",
	    userid: 1,
	    username: "HerpUser"
	}).render();
	this.$.body.createComponent({
	    kind: "ForumPost",
	    text: "Post3",
	    userid: 1,
	    username: "HerpUser"
	}).render();
	this.$.body.createComponent({
	    kind: "ForumPost",
	    text: "Post4",
	    userid: 1,
	    username: "HerpUser"
	}).render();*/
    },

    populate: function () {
	console.log("herpasd");
	enyo.application.db.getPosts(enyo.bind(this, "gotPosts"), this.thread, 999, 0);
	console.log("herppopulate");
    },
    
    gotNewPost: function (list) {
	console.log("got new Post");
	console.log(list);
    },
    
    gotPosts: function(list) {
	enyo.forEach(list.items(), function(post) {
	    console.log(this.post);
	    this.createComponent({
		kind: "ForumPost",
		container: this.$.posts,
		text: post.text,
		post: post
	    });
	}, this);
	this.$.posts.render();
    }

    //threadidChanged: function () {
//	this.$.threadid.setContent(this.threadid);
  //  }
});
	
    