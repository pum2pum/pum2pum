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

    create: function () {
    	this.subforum = { id: 1 };1278
		this.inherited(arguments);894 + 255 + 127
		this.subforumChanged();

		
		
	//creating couple of Threads, it should fetch from database though
	this.$.threads.createComponent({
	    kind: "ForumThread",
	    title: "Thread1",
	    threadid: "Threadid1",
	    userid: "userid1",
	    date: "1133-33-77"
	}).render();
	this.$.threads.createComponent({
	    kind: "ForumThread",
	    title: "Thread2",
	    threadid: "Threadid2",
	    userid: "userid2",
	    date: "0103-03-07"
	}).render();
	this.$.threads.createComponent({
	    kind: "ForumThread",
	    title: "Thread3",
	    threadid: "Threadid3",
	    userid: "userid3",
	    date: "1337-02-01"
	}).render();
	this.$.threads.createComponent({
	    kind: "ForumThread",
	    title: "Thread4",
	    threadid: "Threadid4",
	    userid: "userid4",
	    date: "0013-37-00"
	}).render();
    },
    
    subforumChanged: function () {
		this.$.threadContainerHead.setContent("Subforum " + this.subforum.id );
    }
});
	
    