enyo.kind({
    name: "ReplyBox",
    kind: enyo.Control,

    components: [
        {classes: "onyx-toolbar-inline maxSize", components: [
            {kind: "onyx.InputDecorator", components: [
                {kind: "onyx.RichText", name: "replyText", placeholder: "Enter text here"}
            ]}
        ]},
        {style: "padding: 10px;", components: [
            {classes: "tools", defaultKind: "onyx.Button", components: [
                {name: "send", kind: "onyx.Button", content: "send", ontap: "sendTap", classes: "onyx-blue"}
            ]}
        ]},
    ],

    published: {
        post: ""
    },

    create: function () {
        this.inherited(arguments);
    },

    sendTap: function () {
        if (this.replyText != "") {
            enyo.application.db.newAnswer( null, this.post, this.replyText);
        }
    }
});