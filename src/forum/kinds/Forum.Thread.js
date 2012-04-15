enyo.kind({
    name: "ForumThread",
    kind: enyo.Control,
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
		//threadid: "Default threadid",
		//text: "Default text",
		userid: "Default User",
		title: "Default title"
		//parent: 0
	},

    create: function () {
    	console.log(this);
		this.inherited(arguments);
		this.titleChanged();
		this.useridChanged();

		this.$.numPosts.setContent("7");
		this.$.lastpostDate.setContent("2012-04-07 13:37");
		this.$.lastpostBy.setContent("By Macke");

    },

    titleChanged: function() {
    	console.log(this);
    	this.$.threadtitle.setContent( this.title );


    },

    useridChanged: function () {
		this.$.user.setContent(this.userid);
    },

   // containerChanged: function () {
//	this.$.cont.setContent(this.cont);
  //  },
    
    postView: function(e) {
	//changes the current view to the show the posts in this thread 
	thread = this.threadid;
	console.log(thread);
	this.$.body.createComponent ({
	    kind: "ForumPostContainer",
	    threadid: thread
	}).renderInto(document.body);
    }

});