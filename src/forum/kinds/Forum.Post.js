enyo.kind({
    name: "ForumPost",
    tag: "li",
    kind: enyo.Control,

    components: [
        { tag: "div",classes: "post", components: [
           { name: "avatar", classes: "avatar", tag: "img", src: "http://chzscience.files.wordpress.com/2011/11/funny-science-news-experiments-memes-dog-science-fuzzy-logic.jpg"},
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
        hasClicked: false
    },

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
                cbSuccess: enyo.bind(this, "success"),
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

    success: function (text) {
        enyo.application.db.newAnswer( null, this.post, text);
    },

    abort: function () {
        console.log("Error!");
        this.hasClicked = !this.hasClicked;
        this.$.replyButton.setContent(Language.l ("reply", enyo.application.language).capitalize());
        this.$.replyButton.removeClass("onyx-negative");
        this.$.replyButton.addClass("onyx-affirmative");

        this.$.replyBox.destroyComponents();
    },

    create: function () {
        this.inherited(arguments);
        this.$.text.setContent(this.post.content);
        this.$.datetime.setContent( enyo.application.tsToString( this.post.timestamp ));
        this.useridChanged();
        this.setByLang();
        enyo.application.db.getAnswers( enyo.bind(this, "gotAnswers"), this.post, 999, 0);
    },

    setByLang: function () {
        this.$.replyButton.setContent(Language.l ("reply", enyo.application.language).capitalize());
    },

    useridChanged: function () {
        var t = this;
        enyo.application.db.getUser(function (user){
            t.$.username.setContent(user.item().name);
        }, this.userid);
    },

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
