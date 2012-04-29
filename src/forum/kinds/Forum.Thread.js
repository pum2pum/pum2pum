enyo.kind({
    name: "ForumThread",
    //kind: enyo.Control,
    tag: "li",
    classes: "floatcontainer thread",

    components: [
    	{ tag: "div", classes: "topic",
    		components: [
    			{ tag: "h2", name: "threadtitle" },
    			{ tag: "p", name: "user" },

                {style: "padding: 10px;", components: [
                    {classes: "tools postButton", defaultKind: "onyx.Button", components: [
                        { name: "postButton", ontap: "postTap", classes: "onyx-affirmative"}
                    ]}
                ]},

                { name: "postBox", tag: "div", classes: "postBox" }
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

    postTap: function () {
        this.hasClicked = !this.hasClicked;

        if (this.hasClicked) {

            this.$.postButton.setContent(Language.l ("close", enyo.application.language).capitalize());
            this.$.postButton.removeClass("onyx-affirmative");
            this.$.postButton.addClass("onyx-negative");

            this.$.postBox.destroyComponents();
            this.$.postBox.createComponent({
                kind: "PostBox",
                text: Language.l ("textHere", enyo.application.language).capitalize(),
                post: this.post,
                container: this.$.postBox
            }).render();
        } else {
            this.$.postButton.setContent(Language.l ("post", enyo.application.language).capitalize());
            this.$.postButton.removeClass("onyx-negative");
            this.$.postButton.addClass("onyx-affirmative");

            this.$.postBox.destroyComponents();
        }
    },

    create: function () {
		this.inherited(arguments);
		this.titleChanged();
		this.useridChanged();

        this.$.postButton.setContent(Language.l ("post", enyo.application.language).capitalize());

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
        enyo.application.changeView( "thread", this.thread.id );
        //this.bubble( "onChangeView", { kind: "ForumPostContainer", thread: this.thread } );
    }

});