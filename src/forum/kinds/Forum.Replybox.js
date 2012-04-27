enyo.kind({
    name: "ReplyBox",
    kind: enyo.Control,

    components: [
        { classes: "onyx-toolbar-inline maxSize", components: [
            { kind: "onyx.InputDecorator", components: [
                { kind: "onyx.RichText", name: "replyText", ontap: "clearReplyText" }
            ]}
        ]},
        { style: "padding: 10px;", components: [
            { classes: "tools", defaultKind: "onyx.Button", components: [
                { name: "send", kind: "onyx.Button", ontap: "sendTap", classes: "onyx-blue"}
            ]}
        ]},
    ],

    published: {
        post: ""
    },

    clearReplyText: function () {
        this.$.replyText.setContent("");
    },

    create: function () {
        this.inherited(arguments);
        this.setByLang();
        this.$.replyText.setContent(this.text);
    },

    setByLang: function () {
        this.$.send.setContent(Language.l ("send", enyo.application.language).capitalize());
    },

    sendTap: function () {
        if (this.$.replyText.getValue() != "") {
            enyo.application.db.newAnswer( null, this.post, this.$.replyText.getValue());
        }
    }
});