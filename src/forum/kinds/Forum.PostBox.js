enyo.kind({
    name: "PostBox",
    kind: enyo.Control,

    components: [
        { classes: "onyx-toolbar-inline maxSize", components: [
            { kind: "onyx.InputDecorator", components: [
                { kind: "onyx.RichText", name: "postText", ontap: "clearPostText" }
            ]}
        ]},
        { style: "padding: 10px;", components: [
            { classes: "tools", defaultKind: "onyx.Button", components: [
                { name: "send", kind: "onyx.Button", ontap: "sendTap", classes: "onyx-blue"}
            ]}
        ]},
    ],

    published: {
        thread: ""
    },

    clearPostText: function () {
        this.$.postText.setContent("");
    },

    create: function () {
        this.inherited(arguments);
        this.setByLang();
        this.$.postText.setContent(this.text);
    },

    setByLang: function () {
        this.$.send.setContent(Language.l ("send", enyo.application.language).capitalize());
    },

    sendTap: function () {
        console.log(this.thread);
        if (this.$.postText.getValue() != "") {
            enyo.application.db.newPost( null, this.thread, this.$.postText.getValue());
        }
    }
});