enyo.kind({
	/*The first post of the thread, containing the actual topic at hand.*/
    name: "ThreadPost",
    tag: "li",
    kind: enyo.Control,

	/*Defines the components of the ThreadPost. Note the postButton and postBox where we can reply to the ThreadPost.*/
    components: [
        { tag: "div", classes: "threadPost", components: [
           { name: "avatar", classes: "avatar", tag: "img", src: "/images/icons/avatar.png"},
            { tag: "div", components: [
                 {name: "username", tag: "p", classes: "username" },
                 {name: "datetime", tag: "p", classes: "datetime" }
            ] },

            { name: "text", tag: "p", classes: "text", allowHtml: true },
        
            {style: "padding: 10px;", components: [
                {classes: "tools", defaultKind: "onyx.Button", components: [
                    { name: "postButton", ontap: "postTap", classes: "onyx-affirmative"}
                ]}
            ]},

            { name: "postBox", tag: "div", classes: "postBox" }
        ]},
    ],

    published: {
        text: "default text in a thread post",
        userid: 0,
        datetime: "1970-13-37 00:00:00",
        node: null,
        dbparent: "",
        hasClickedPost: false /*Used to toggle css-class of the button.*/
    },

	/*The ReplyBox have returned with the content of a reply-post to the topic. We know that the reply is non-empty.*/
    success: function (text) {
        enyo.application.db.newPost( null, this.dbparent, text);

        this.hasClickedpost = !this.hasClickedpost;
        this.$.postButton.setContent(Language.l ("post", enyo.application.language).capitalize());
        this.$.postButton.removeClass("onyx-negative");
        this.$.postButton.addClass("onyx-affirmative");

        this.$.postBox.destroyComponents();            
    },

	/*The ReplyBox have encountered some kind of error, so we toggle the post-button.*/
    abort: function () {
        console.log("Error!");
        this.hasClickedpost = !this.hasClickedpost;

        this.$.postButton.setContent(Language.l ("post", enyo.application.language).capitalize());
        this.$.postButton.removeClass("onyx-negative");
        this.$.postButton.addClass("onyx-affirmative");

        this.$.postBox.destroyComponents(); 
    },

	/*
	The post-button have been pressed, so we create a new ReplyBox where we can write the text of the post.
	We also toggle between different content in the button aswell as different css-classes.
	*/
    postTap: function () {
        this.hasClickedpost = !this.hasClickedpost;

        if (this.hasClickedpost) {
            this.$.postButton.setContent(Language.l ("close", enyo.application.language).capitalize());
            this.$.postButton.removeClass("onyx-affirmative");
            this.$.postButton.addClass("onyx-negative");

            this.$.postBox.destroyComponents();
            this.$.postBox.createComponent({
                kind: "ReplyBox",
                text: "Enter text here.",
                cbSuccess: enyo.bind( this, "success" ), /*Callback function with the new text.*/
                cbAbort: enyo.bind( this, "abort" ),
                container: this.$.postBox
            }).render();
        } else {
            this.$.postButton.setContent(Language.l ("post", enyo.application.language).capitalize());
            this.$.postButton.removeClass("onyx-negative");
            this.$.postButton.addClass("onyx-affirmative");

            this.$.postBox.destroyComponents();            
        }
    },

	/*Creates a new ThreadPost.*/
    create: function () {
        this.inherited(arguments);

        this.$.text.setContent(this.text);
        this.$.datetime.setContent( enyo.application.tsToString( this.dbparent.timestamp ));
        this.useridChanged();
        this.setByLang();
    },

	/*Sets content of the button.*/
    setByLang: function () {
        this.$.postButton.setContent(Language.l ("post", enyo.application.language).capitalize());
    },

	/*Changes from user-id to username.*/
    useridChanged: function () {
        var t = this;
        enyo.application.db.getUser(function (user){
            t.$.username.setContent(user.item().name);
        }, this.userid);
    }
   
});
