enyo.kind({
    name: "SubForum",
    kind: enyo.Control,
    tag: "li",
    classes: "floatcontainer subForum",
    posts: 0,

    components: [
        { tag: "div", classes: "title", ontap: "goToThread",components: [
            { name: "title", tag: "p"},
            { name: "description", tag: "p" } ]},

        { tag: "div", classes: "newThreads", components: [
            { name: "newThreads", tag: "p" } ]},

        { tag: "div", classes: "threads",	components: [
            { name: "threads", tag: "p" } ]},

        { tag: "div", classes: "posts",	components: [
            { name: "posts", tag: "p" } ]}
    ],

    published: {
        subForum: ""
    },

	goToThread: function(){
        enyo.application.changeView( "subForum", this.subForum.id );
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
        list.close();
        /*if( this.destroyed ) {
        	list.close( );
        	return;
        }*/
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
        var that = this;
        this.posts += list.size( );
        this.$.posts.setContent( this.posts );
        this.$.posts.render( );

        enyo.forEach( list.items(), function ( post ) {
            enyo.application.db.getAnswers( enyo.bind( that, "gotAnswers" ), post, 999, 0);
        });
    },

    gotAnswers: function( list ) {
        list.close();
        this.posts += list.size();
        this.$.posts.setContent( this.posts );
        this.$.posts.render( );
    }
});