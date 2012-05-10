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
    	] },    
    ],
    published: {
		userid: "Default User",
		title: "Default title",
        thread: null,
        hasClicked: false
	},

    create: function () {
		this.inherited(arguments);
		this.titleChanged();
		this.useridChanged();

        enyo.application.db.getPosts( enyo.bind( this, "lastPost" ), this.thread, 999, 0 );
    },

    lastPost: function( postslist ) {
        if( this.destroyed ) {
            postslist.close();
            return;
        }
        var t = this;
        posts = postslist.items();


        enyo.forEach( posts, function( post ) {
            enyo.application.db.getAnswers( enyo.bind( t, "gotAnswers" ), post, 999, 0 );
        });

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

    gotAnswers: function( list ) {
        list.close();
        var posts = this.$.numPosts.getContent();
        posts += list.size();
        this.$.numPosts.setContent( posts );
        this.$.numPosts.render( );
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

    tap: function( sender, event ) {
        enyo.application.changeView( "thread", this.thread.id );
    }

});