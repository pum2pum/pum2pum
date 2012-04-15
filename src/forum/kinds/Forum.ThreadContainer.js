enyo.kind({
    name: "ForumThreadContainer",
    kind: enyo.Control,
    components: [
		{ name: "threadContainerHead", tag: "h1", classes: "threadContainerHead" },
		{ tag: "div", classes: "threadContainerListHead floatcontainer", 
			components: [
				{ tag: "div", classes: "topic",
					components: [ { tag: "p", content: "Topic / Started by" } ] },
				{ tag: "div", classes: "lastPost",
					components: [ { tag: "p", content: "Last Post" } ] },
				{ tag: "div", classes: "posts",
					components: [ { tag: "p", content: "Posts" } ] }
			]
		 },
		{ name: "threads", tag: "ul", classes: "floatcontainer threads" }
    ],
    published: {
    	subforum: null
		//subforumid: "Default id"
    },

    populate: function( ) {
    	enyo.application.db.getThreads( enyo.bind( this, "gotThreads" ), this.subforum, 100, 0 );
    },

    gotThreads: function( list ) {
    	enyo.forEach( list.items(), function( thread ) {
    		this.createComponent({
    			kind: "ForumThread",
    			container: this.$.threads,
    			title: thread.title,
    			thread: thread
    		});

    	}, this );
		this.$.threads.render();
    },

    create: function () {
		this.inherited(arguments);
		this.populate();
		this.subforumChanged();
    },
    
    subforumChanged: function () {
    	console.log(this);
		this.$.threadContainerHead.setContent( this.subforum.title );
    }
});
	
    