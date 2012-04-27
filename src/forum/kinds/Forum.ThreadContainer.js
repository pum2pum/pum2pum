enyo.kind({
    name: "ForumThreadContainer",
    kind: enyo.Control,
    components: [
		{ name: "threadContainerHead", tag: "h1", classes: "threadContainerHead"},
        { name: "newThreadLink", tag: "a", ontap: "createThread"},
		{ tag: "div", classes: "threadContainerListHead floatcontainer", 
			components: [
				{ tag: "div", classes: "topic",
					components: [ { tag: "p", name: "topic" } ] },
				{ tag: "div", classes: "lastPost",
					components: [ { tag: "p", name: "lastPost" } ] },
				{ tag: "div", classes: "posts",
					components: [ { tag: "p", name: "posts" } ] }
			]
		 },
		{ name: "threads", tag: "ul", classes: "floatcontainer threads" },
        { name: "newThreadHolder", tag: "div"}
    ],
    published: {
    	subForum: null
    },
    
    populate: function( ) {
    	enyo.application.db.getThreads( enyo.bind( this, "gotThreads" ), this.subForum, 100, 0 );
    },

    gotThreads: function( list ) {
        this.$.threads.destroyClientControls();
    	enyo.forEach( list.items(), function( thread ) {
    		this.createComponent({
    			kind: "ForumThread",
    			container: this.$.threads,
    			title: thread.title,
    			thread: thread,
                userid: thread.user,
                node: thread
    		});

    	}, this );
		this.$.threads.render();
    },

    create: function () {
		this.inherited(arguments);
        this.setByLang();
		this.populate();
		this.subForumChanged();
    },
    
    setByLang: function () {
        
        this.$.topic.setContent( Language.l( "topic", enyo.application.language ).capitalize() + " / " + Language.l( "startedBy", enyo.application.language ).capitalize() );
        this.$.lastPost.setContent( Language.l( "lastPost", enyo.application.language ).capitalize() );
        this.$.posts.setContent( Language.l( "posts", enyo.application.language ).capitalize() );
        this.$.newThreadLink.setContent( Language.l( "newThread", enyo.application.language ).capitalize() );
        
    },

    subForumChanged: function () {
		this.$.threadContainerHead.setContent( this.subForum.title );
    },
    
    createThread: function(){
        
        this.$.newThreadHolder.destroyClientControls();
        
        this.createComponent({
            kind: "ForumNewThread",
            container: this.$.newThreadHolder,
            cbSuccess: enyo.bind(this, "success"),
            cbAbort: enyo.bind(this, "abort")
        });
        
        this.$.newThreadHolder.render();
        
    },
    
    success: function(title, post){
        
        enyo.application.db.newThread(function(){ console.log("Kunde inte lägga tillt råd i databasen."); }, this.subForum, title, post);
        
        this.$.newThreadHolder.destroyClientControls();
        
    },
    
    abort: function(){
        
        console.log(this.$);
        
        this.$.newThreadHolder.destroyClientControls();
        
    }
    
});