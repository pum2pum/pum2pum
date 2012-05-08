enyo.kind({
	/*A div containing a send-button and a field where you can write your message.*/
    name: "ReplyBox",
    kind: enyo.Control,

	/*Components using enyo's onyx-classes.*/
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
        cbSuccess: "",
        cbAbort: ""
    },

	/*Automaticly clear the text-field.*/
    clearReplyText: function () {
        this.$.replyText.setContent("");
    },

	/*Create a new ReplyBox.*/
    create: function () {
        this.inherited(arguments);
        this.setByLang();
        this.$.replyText.setContent(this.text);
    },

	/*Set content of the send-button.*/
    setByLang: function () {
        this.$.send.setContent(Language.l ("send", enyo.application.language).capitalize());
    },

	/*Calls callback-function given upon creation.*/
    sendTap: function () {
        if (this.$.replyText.getValue() != "") {
            this.cbSuccess(this.$.replyText.getValue());
            //enyo.application.db.newAnswer( null, this.post, this.$.replyText.getValue());
        } else {
            this.cbAbort();
        }
    }
});