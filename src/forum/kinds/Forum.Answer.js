enyo.kind({
	/*This defines the answer to a post.*/
    name: "Answer",
    kind: enyo.Control,
    classes: "post",
    tag: "li",

    published: {
        title: "",
        dbparent: "",
    },

	/*The components include an avatar, a username, date and the actual text.*/
    components: [
        { name: "avatar", classes: "avatar", tag: "img", src: "/images/icons/avatar.png"},
        { tag: "div", components: [
            {name: "username", tag: "p", classes: "username" },
            {name: "datetime", tag: "p", classes: "datetime" }
        ] },

        { name: "text", tag: "p", classes: "text", allowHtml: true },
    ],

	/*Creates the answer.*/
    create: function(){
        this.inherited(arguments);

        this.$.datetime.setContent(this.datetime);
        this.$.text.setContent(this.text);

        this.useridChanged();
    },

	/*Changes from a user-id to a username.*/
    useridChanged: function () {
        var t = this;
        enyo.application.db.getUser(function (user){
            t.$.username.setContent(user.item().name);
        }, this.username);
    }

});