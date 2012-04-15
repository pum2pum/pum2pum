enyo.kind({
    name: "ReplyBox",
    classes: "onyx",
    kind: enyo.Control,
    components: [
	//	{name: "body", tag: "output"},
	{classes: "onyx-toolbar-inline", components: [
	    {kind: "onyx.InputDecorator", components: [
		{kind: "onyx.Input", name: "replyText", placeholder: "Enter text here"}
	    ]}
	]},
	{style: "padding: 10px;", components: [
	    {classes: "tools", defaultKind: "onyx.Button", components: [
		{name: "send", kind: "onyx.Button", content: "send", ontap: "sendTap", classes: "onyx-blue"},
		{name: "closeReplyButton", content: "Close", ontap: "closeReplyTap", classes: "onyx-negative"}
	    ]}
	]}
    ],
    published: {
	container: ""
    },
    
    create: function () {
	this.inherited(arguments);
	this.containerChanged();
	//this.$.replyText.setValue(this.text);
	//this.textChanged();
	/*	this.$.body.createComponent({
		kind: "RichText", 
		value: "To <b>boldly</b> go..", 
		onchange: "richTextChange",
		//kind: "enyo.RichText",
		//name: "rasdasfe"
		}).render();*/
    },

    /*'  textChanged: function () {
      this.$.text.setContent(this.text);
      },
    */
    
/*    containerChanged: function () {
	this.$.cont = this.cont */
    sendTap: function () {
	//this.container.replyButton.show();
	this.$.replyText.setValue("");
	
    },
    
    closeReplyTap: function () {
	this.hide();
    }
});