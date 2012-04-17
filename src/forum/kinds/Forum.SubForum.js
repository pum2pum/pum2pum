enyo.kind({
	name: "SubForum",
	kind: enyo.Control,
	tag: "li",

	components: [
		{ name: "btnNewThread", tag: "button", content: "New Thread", ontap: "newThread"},

		{ name: "subForumContainer", tag: "div", components: [
			{ name: "head", tag: "div", classes: "subForumHead", components: [
				{ name: "title", tag: "p", ontap: "gotoThread"},
				{ name: "description", tag: "p"}
			]},
			{ name: "newThreads", tag: "p", classes: "subForum.newThreads"},
			{ name: "threads", tag: "p", classes: "subForum.threads"},
			{ name: "posts", tag: "p", classes: "subForum.posts"}
		]}
	],

    published: {
		subForum: ""
    },

	gotoThread: function(){
		console.log( "Goto thread X..." );
	},

	newThread: function(){
		threadTitle = window.prompt("Thread title");
		threadContent = window.prompt("Thread content");
		enyo.application.db.newThread(null, this.subForum, threadTitle, threadContent);
	},

	create: function(){
		this.inherited(arguments);
		this.populate();
		this.$.title.setContent( this.title );
		this.$.description.setContent( this.description );
	},

	populate: function(){
		enyo.application.db.getThreads( enyo.bind(this, "gotThreads"), this.subForum, 999, 0);
	},

	gotThreads: function( list ) {
		newThreads = 0;
		threads = 0;

		enyo.forEach( list.items(), function( thread ) {
			//enyo.application.db.getPosts( enyo.bind(this, "gotPosts"), thread, 999, 0);

   			threads++;
        });

        this.$.newThreads.setContent( newThreads );
        this.$.threads.setContent( threads );
        this.$.posts.setContent( "0" );
	}

	/*gotPosts: function( list ) {
		posts = 0;

		enyo.forEach( list.items(), function( ) {
   			posts++;
        });

        this.posts = posts;
	}*/
});