enyo.kind({
    name: "ForumThread",
    //kind: enyo.Control,
    tag: "li",
    classes: "floatcontainer thread",

    components: [
    	{ tag: "div", classes: "topic",
    		components: [
    			{ tag: "h2", name: "threadtitle" },
    			{ tag: "p", name: "user" }
    	] },
    	{ tag: "div", classes: "lastPost",
    		components: [
    			{ tag: "p", name: "lastpostDate" },
    			{ tag: "p", name: "lastpostBy" }
    	] },
    	{ tag: "div", classes: "posts",
    		components: [
    			{ tag: "p", name: "numPosts" }
    	] }
    
    ],
    published: {
		userid: "Default User",
		title: "Default title",
        thread: null,
	},

    create: function () {
		this.inherited(arguments);
		this.titleChanged();
		this.useridChanged();

        enyo.application.db.getPosts( enyo.bind( this, "lastPost" ), this.thread, 100, 0 );
    },

    lastPost: function( postslist ) {
        if( this.destroyed ) {
            postslist.close();
            return;
        }
        var t = this;
        posts = postslist.items();

        if( postslist.size() > 0 ) {
            post = postslist.items()[0];
            
            enyo.application.db.getUser( function( u ) {
                u.close();
                t.$.lastpostBy.setContent( Language.l( "by", enyo.application.language ) + " " + u.item().name );
            }, post.user );
            
            t.$.lastpostDate.setContent( enyo.application.tsToString( post.timestamp ) );
        } else {
            enyo.application.db.getUser( function( u ) {
                u.close();
                t.$.lastpostBy.setContent( Language.l( "by", enyo.application.language ) + " " + u.item().name );
            }, this.thread.user );

            t.$.lastpostDate.setContent( enyo.application.tsToString( this.thread.timestamp ) );
        }
        t.$.numPosts.setContent( postslist.size() );
    },



    titleChanged: function() {
    	this.$.threadtitle.setContent( this.title );
    },

    useridChanged: function () {
        var t = this;
        enyo.application.db.getUser( function( u ) {
            u.close();
            t.$.user.setContent( u.item().name );    
        }, this.userid );
		
    },

    postView: function(e) {
	//changes the current view to the show the posts in this thread 
    	thread = this.threadid;
    	this.$.body.createComponent ({
    	   kind: "ForumPostContainer",
    	   threadid: thread
    	}).renderInto(document.body);
    },

    tap: function( sender, event ) {
        this.bubble( "onChangeView", { kind: "ForumPostContainer", thread: this.thread } );
    }

});