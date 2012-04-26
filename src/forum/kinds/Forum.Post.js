enyo.kind({
    name: "ForumPost",
    classes: "post",
    tag: "li",
    kind: enyo.Control,

    components: [
		{ name: "avatar", classes: "avatar", tag: "img", src: "http://chzscience.files.wordpress.com/2011/11/funny-science-news-experiments-memes-dog-science-fuzzy-logic.jpg"},
		{ tag: "div", 
		 components: [
		     {name: "username", tag: "p", classes: "username" },
		     {name: "datetime", tag: "p", classes: "datetime" }
		] },

		{ name: "text", tag: "p", classes: "text"},
	
		{ name: "replyButton", tag: "div", classes: "postReply", ontap: "replyTap", content: "Reply" },

		{ name: "answers", tag: "ul", classes: "floatcontainer answers"}
    ],

    published: {
		text: "default text in a post",
		userid: 0,
		datetime: "1970-13-37 00:00:00",
		node: null,
		dbparent: ""
    },

    reply: function () {
    	message = window.prompt("Message");
    	user = "Default user";
    	date = new Date();
		
    	enyo.application.db.newAnswer( null, this, message);
    },

    create: function () {
		this.inherited(arguments);
		this.$.text.setContent(this.text);
		this.$.datetime.setContent(this.datetime);
		this.useridChanged();

		enyo.application.db.getAnswers( enyo.bind(this, "gotAnswers"), this.dbparent, 999, 0);
    },

    useridChanged: function () {
		var t = this;
		console.log(t);
		enyo.application.db.getUser(function (user){
		 //   console.log(user.item());
		    t.$.username.setContent(user.item().name);
		}, this.userid);
    },

    timeConverter: function( timestamp ) {
    	var a = new Date( timestamp * 1000 );
    	var year = a.getFullYear();
    	var month = a.getMonth()+1;
    	var date = a.getDate();
    	var hour = a.getHours();
    	var min = a.getMinutes();
    	var sec = a.getSeconds();
    	var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;
    	return time;
    },

    gotAnswers: function ( list ) {
    	console.log("kommer hit! :)");
    //	console.log(list);
    	enyo.forEach( list.items(), function( answer ) {
    	console.log("kommer hit! :)");
    		console.log(answer);

    		var time = timeConverter( answer.timestamp );
    		console.log(time);

    		this.createComponent({
        		kind: "Answer",
                container: this.$.answers,
                message: answer.content,
                date: time,
                user: answer.user
        	});
        }, this);
        this.$.answers.render();

    }
    
/*    replyTap: function() {
		this.$.body.destroyComponents();
		this.$.body.createComponent({
		    kind: "ReplyBox",
		    text: "",
		    container: this.$.body
		}).render();
    }*/
    
});
