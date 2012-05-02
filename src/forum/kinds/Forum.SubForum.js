enyo.kind({
	/*
	General information about the kind. It is supposed to look like:
	Title                      number of new threads | number of threads | number of posts (including replies)
	*/
    name: "SubForum",
    kind: enyo.Control,
    tag: "li",
    classes: "floatcontainer subForum",
    posts: 0,

	/*Create all components.*/
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

	/*Upon clicking on a thread, shange view.*/
	goToThread: function(){
        enyo.application.changeView( "subForum", this.subForum.id );
	},

	/*Creating a new SubForum*/
    create: function(){
        this.inherited(arguments);
        this.populate();
        this.$.title.setContent( this.title );
        this.$.description.setContent( this.description );
    },

	/*Call the database and check for threads.*/
    populate: function(){
        enyo.application.db.getThreads( enyo.bind(this, "gotThreads"), this.subForum, 999, 0);
    },

	/*The database calls this function with the result from collecting threads.*/
    gotThreads: function( list ) {
        list.close();
        var that = this;
        newThreads = 0; /*This feature is not supported by the database.*/
        threads = 0;
        threads = list.size();
        this.posts = 0;

        this.$.newThreads.setContent( newThreads );
        this.$.threads.setContent( threads );

		/*We need to loop the list to get all the posts from the database.*/
        enyo.forEach( list.items(), function( thread ) {
            enyo.application.db.getPosts( enyo.bind( that, "gotPosts" ), thread, 999, 0);
        });
        this.render( );
    },

	/*The database calls this function with the result from collecting posts.*/
    gotPosts: function( list ) {
        list.close( );
        var that = this;
        this.posts += list.size( );
        this.$.posts.setContent( this.posts );
        this.$.posts.render( );

		/*We also need to include the answers to the posts.*/
        enyo.forEach( list.items(), function ( post ) {
            enyo.application.db.getAnswers( enyo.bind( that, "gotAnswers" ), post, 999, 0);
        });
    },

	/*The database calls this function with the result from collecting answers.*/
    gotAnswers: function( list ) {
        list.close();
        this.posts += list.size(); /*Add to number of posts.*/
        this.$.posts.setContent( this.posts );
        this.$.posts.render( );
    }
});