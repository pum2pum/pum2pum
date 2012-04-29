enyo.kind({
    name: "ThreadPost",
    tag: "li",
    kind: enyo.Control,

    components: [
        { tag: "div", classes: "threadPost", components: [
           { name: "avatar", classes: "avatar", tag: "img", src: "/images/icons/avatar.png"},
            { tag: "div", components: [
                 {name: "username", tag: "p", classes: "username" },
                 {name: "datetime", tag: "p", classes: "datetime" }
            ] },

            { name: "text", tag: "p", classes: "text"},
        
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
        text: "default text in a thread post",
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
                text: "",
                post: this,
                container: this.$.replyBox
            }).render();
        } else {
            this.$.replyButton.setContent(Language.l ("reply", enyo.application.language).capitalize());
            this.$.replyButton.removeClass("onyx-negative");
            this.$.replyButton.addClass("onyx-affirmative");

            this.$.replyBox.destroyComponents();            
        }
    },

    create: function () {
        this.inherited(arguments);
        this.$.text.setContent(this.text);
        this.$.datetime.setContent(this.datetime);
        this.useridChanged();
        this.setByLang();
    },

    setByLang: function () {
        this.$.replyButton.setContent(Language.l ("reply", enyo.application.language).capitalize());
    },

    useridChanged: function () {
        var t = this;
        console.log(t);
        enyo.application.db.getUser(function (user){
         //   console.log(user.item());
            t.$.username.setContent(user.item().name);
        }, this.userid);
    }
   
});
