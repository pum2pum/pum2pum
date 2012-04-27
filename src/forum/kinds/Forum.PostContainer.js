enyo.kind({
    name: "ForumPostContainer",
    kind: enyo.Control,
    classes: "postContainer",
    tag: "div",
    
    components: [
		{name: "threadid", tag: "p"},
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
		this.populate();
    },

    populate: function () {
		enyo.application.db.getPosts(enyo.bind(this, "gotPosts"), this.thread, 999, 0);
    },
    
    gotNewPost: function (list) {
		console.log(list);
    },
    
    gotPosts: function(list) {
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
	
    