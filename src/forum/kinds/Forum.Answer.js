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
        { name: "avatar", classes: "avatar", tag: "img", src: "http://chzscience.files.wordpress.com/2011/11/funny-science-news-experiments-memes-dog-science-fuzzy-logic.jpg"},
        { tag: "div", components: [
            {name: "username", tag: "p", classes: "username" },
            {name: "datetime", tag: "p", classes: "datetime" }
        ] },

        { name: "text", tag: "p", classes: "text"},
    ],

    create: function(){
        this.inherited(arguments);

        this.$.datetime.setContent(this.datetime);
        this.$.username.setContent(this.username);
        this.$.text.setContent(this.text);
    }

});