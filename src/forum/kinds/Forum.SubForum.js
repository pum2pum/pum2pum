enyo.kind({
	name: "SubForum",
	kind: enyo.Control,
	tag: "tr",

	components: [
		{ name: "subForumContainer", tag: "td", classes: "subForumTitle", ontap: "gotoThread" , components: [
			{ name: "title", tag: "p"},
			{ name: "description", tag: "p" } ]},
		{ tag: "td", classes: "subForumNewThreads", components: [
			{ name: "newThreads", tag: "p", classes: "subForum.newThreads" } ]},
		{ tag: "td", classes: "subForumThreads", components: [
			{ name: "threads", tag: "p", classes: "subForum.threads" } ]},
		{ tag: "td", classes: "subForumPosts", components: [
			{ name: "posts", tag: "p", classes: "subForum.posts" } ]}
	],

    published: {
		subForum: ""
    },
    posts: 0,

	gotoThread: function(){
		console.log( "Goto thread X..." );
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
		if( this.destroyed ) {
			list.close( );
			return;
		}
		var that = this;
		newThreads = 0;
		threads = 0;
		threads = list.size();
		this.posts = 0;
        
        this.$.posts.setContent( 0 );
        this.$.newThreads.setContent( newThreads );
        this.$.threads.setContent( threads );
	
		enyo.forEach( list.items(), function( thread ) {
 			enyo.application.db.getPosts( enyo.bind( that, "gotPosts" ), thread, 999, 0);
        });
        this.render( );
	},

	gotPosts: function( list ) {
		list.close( );
		this.posts += list.size( );
		this.$.posts.setContent( this.posts );
		this.$.posts.render( );
	}
});