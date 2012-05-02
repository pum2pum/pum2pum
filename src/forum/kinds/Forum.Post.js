enyo.kind({
	/*
	Defines the post of the forum. A post contains username, date, the text of the post and a button to reply.
	It also contains a list with all the answers to the post.
	*/
    name: "ForumPost",
    tag: "li",
    kind: enyo.Control,

    components: [
        { tag: "div",classes: "post", components: [
           { name: "avatar", classes: "avatar", tag: "img", src: "/images/icons/avatar.png"},
            { tag: "div", components: [
                 {name: "username", tag: "p", classes: "username" },
                 {name: "datetime", tag: "p", classes: "datetime" }
            ] },

            { name: "text", tag: "p", classes: "text", allowHtml: true },
        
            {style: "padding: 10px;", components: [
                {classes: "tools", defaultKind: "onyx.Button", components: [
                    { name: "replyButton", ontap: "replyTap", classes: "onyx-affirmative"}
                ]}
            ]},

            { name: "replyBox", tag: "div", classes: "replyBox" }
        ]},

        { name: "answers", tag: "ul", classes: "answer"}
    ],

    published: {
        text: "default text in a post",
        userid: 0,
        datetime: "1970-13-37 00:00:00",
        node: null,
        dbparent: "",
        hasClicked: false /*Used to toggle the ReplyBox on and off.*/
    },

	/*Toggles css classes for replyButton and creates/destroys the replyBox.*/
    replyTap: function () {
        this.hasClicked = !this.hasClicked;

        if (this.hasClicked) {

            this.$.replyButton.setContent(Language.l ("close", enyo.application.language).capitalize());
            this.$.replyButton.removeClass("onyx-affirmative");
            this.$.replyButton.addClass("onyx-negative");

            this.$.replyBox.destroyComponents();
            this.$.replyBox.createComponent({
                kind: "ReplyBox",
                text: Language.l ("textHere", enyo.application.language).capitalize(),
                cbSuccess: enyo.bind(this, "success"), /*Sets callback-funktion.*/
                cbAbort: enyo.bind(this, "abort"),
                container: this.$.replyBox
            }).render();
        } else {
            this.$.replyButton.setContent(Language.l ("reply", enyo.application.language).capitalize());
            this.$.replyButton.removeClass("onyx-negative");
            this.$.replyButton.addClass("onyx-affirmative");

            this.$.replyBox.destroyComponents();
        }
    },
 
	/*
	The replybox have called this function and we now know that an non-empty text have been entered.
	We can safely create the new answer.
	*/
    success: function (text) {
        enyo.application.db.newAnswer( null, this.post, text);
    },

	/*The replybox have encountered something illegal so we toggle the replybox off.*/
    abort: function () {
        console.log("Error!");
        this.hasClicked = !this.hasClicked;
        this.$.replyButton.setContent(Language.l ("reply", enyo.application.language).capitalize());
        this.$.replyButton.removeClass("onyx-negative");
        this.$.replyButton.addClass("onyx-affirmative");

        this.$.replyBox.destroyComponents();
    },

	/*Create a new post.*/
    create: function () {
        this.inherited(arguments);
        this.$.text.setContent(this.post.content);
        this.$.datetime.setContent( enyo.application.tsToString( this.post.timestamp ));
        this.useridChanged();
        this.setByLang();
		
		/*Request all the answers from the database.*/
        enyo.application.db.getAnswers( enyo.bind(this, "gotAnswers"), this.post, 999, 0);
    },

	/*Set the text in the button.*/
    setByLang: function () {
        this.$.replyButton.setContent(Language.l ("reply", enyo.application.language).capitalize());
    },

	/*Change to the actual username.*/
    useridChanged: function () {
        var t = this;
        enyo.application.db.getUser(function (user){
            t.$.username.setContent(user.item().name);
        }, this.userid);
    },

	/*Got a list of all the answers.*/
    gotAnswers: function ( list ) {
        enyo.forEach( list.items(), function( answer ) {
            var time = enyo.application.tsToString( answer.timestamp );

            this.createComponent({
                kind: "Answer",
                container: this.$.answers,
                text: answer.content,
                datetime: time,
                username: answer.user
            });
        }, this);
        this.render();

    }   
});
