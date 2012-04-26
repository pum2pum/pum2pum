enyo.kind({
	name: "Answer",
	kind: enyo.Control,
	tag: "li",

	published: {
		title: "",
		dbparent: "",
	},

	components: [
		{ name: "message", classes: "answerMessage", tag: "p" },
		{ name: "date", classes: "answerDate", tag: "p" },
		{ name: "user", classes: "answerUser", tag: "p" }
	],

	create: function(){
		this.inherited(arguments);
	
		this.$.message.setContent(this.message);
		this.$.date.setContent(this.date);
		this.$.user.setContent(this.user);
	},

});