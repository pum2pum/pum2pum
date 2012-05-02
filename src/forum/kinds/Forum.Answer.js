enyo.kind({
    name: "Answer",
    kind: enyo.Control,
    classes: "post",
    tag: "li",

    published: {
        title: "",
        dbparent: "",
    },

    components: [
        { name: "avatar", classes: "avatar", tag: "img", src: "/images/icons/avatar.png"},
        { tag: "div", components: [
            {name: "username", tag: "p", classes: "username" },
            {name: "datetime", tag: "p", classes: "datetime" }
        ] },

        { name: "text", tag: "p", classes: "text", allowHtml: true },
    ],

    create: function(){
        this.inherited(arguments);

        this.$.datetime.setContent(this.datetime);
        this.$.text.setContent(this.text);

        this.useridChanged();
    },

    useridChanged: function () {
        var t = this;
        enyo.application.db.getUser(function (user){
            t.$.username.setContent(user.item().name);
        }, this.username);
    }

});