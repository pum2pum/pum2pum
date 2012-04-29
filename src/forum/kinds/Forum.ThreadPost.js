enyo.kind({
    name: "ThreadPost",
    tag: "li",
    kind: enyo.Control,

    components: [
        { tag: "div", classes: "threadPost", components: [
           { name: "avatar", classes: "avatar", tag: "img", src: "http://chzscience.files.wordpress.com/2011/11/funny-science-news-experiments-memes-dog-science-fuzzy-logic.jpg"},
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
        hasClickedpost: false,
        hasClickedPost: false
    },

    success: function (text) {
        enyo.application.db.newPost( null, this.dbparent, text);

        this.hasClickedpost = !this.hasClickedpost;
        this.$.postButton.setContent(Language.l ("post", enyo.application.language).capitalize());
        this.$.postButton.removeClass("onyx-negative");
        this.$.postButton.addClass("onyx-affirmative");

        this.$.postBox.destroyComponents();            
    },

    abort: function () {
        console.log("Error!");
        this.hasClickedpost = !this.hasClickedpost;

        this.$.postButton.setContent(Language.l ("post", enyo.application.language).capitalize());
        this.$.postButton.removeClass("onyx-negative");
        this.$.postButton.addClass("onyx-affirmative");

        this.$.postBox.destroyComponents(); 
    },

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
                cbSuccess: enyo.bind( this, "success" ),
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

    create: function () {
        this.inherited(arguments);
        // enyo.application.tsToString( this.post.timestamp ));

        this.$.text.setContent(this.text);
        this.$.datetime.setContent( enyo.application.tsToString( this.dbparent.timestamp ));
        this.useridChanged();
        this.setByLang();
    },

    setByLang: function () {
        this.$.postButton.setContent(Language.l ("post", enyo.application.language).capitalize());
    },

    useridChanged: function () {
        var t = this;
        enyo.application.db.getUser(function (user){
            t.$.username.setContent(user.item().name);
        }, this.userid);
    }
   
});
