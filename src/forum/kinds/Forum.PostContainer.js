enyo.kind({
    name: "ForumPostContainer",
    kind: enyo.Control,
    classes: "postContainer",
    tag: "div",
    
    components: [
	{name: "threadid", tag: "p"},
	{name: "threadPost", tag: "ul"},
	{name: "posts", tag: "ul"}
    ],
    published: {
	threadid: "Default id"
    },
    
    newPost: function (){
		enyo.application.db.getPosts(enyo.bind(this, "gotPosts"), 999, 0);
    },

    create: function () {
	this.inherited(arguments);
	this.createComponent({
	    kind: "ThreadPost",
	    container: this.$.threadPost,
	    text: this.thread.content,
	    userid: this.thread.user,
	    dbparent: this.thread,
	    post: this.thread.content
	});
	this.populate();
    },

    populate: function () {
		enyo.application.db.getPosts(enyo.bind(this, "gotPosts"), this.thread, 999, 0);
    },
    
    gotNewPost: function (list) {
		console.log(list);
    },
    
    gotPosts: function(list) {
	if ( this.destroyed ) {
	    list.close();
	    return;
	}
	this.$.posts.destroyClientControls();
	enyo.forEach(list.items(), function(post) {
	    // console.log(post);
	    this.createComponent({
		kind: "ForumPost",
		container: this.$.posts,
		text: post.text,
		userid: post.user,
		dbparent: this.thread,
		post: post
	    });
	}, this);
	this.$.posts.render();
    }

});
	
    