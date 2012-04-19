enyo.kind({
    name: "ForumPost",
    classes: "onyx",
    kind: enyo.Control,

    components: [
		{name: "text", tag: "p"},
		{name: "username", tag: "span"},
		{name: "date", tag: "span"},
		{style: "padding: 10px;", 
		components: [
		    {classes: "tools", defaultKind: "onyx.Button", 
		    components: [
				{name: "replyButton", content: "Reply", ontap: "replyTap", classes: "onyx-affirmative"}
	    	]}
		]},

		{name: "id", tag: "span"},
		{tag: "hr"},
		{name: "body", tag: "output"}
		//{name: "replybox", kind: "Forum.Replybox"}
    ],

    published: {
	text: "default text in a post",
	userid: "",
	date: "",
	parent: ""
    },

    create: function () {
		this.inherited(arguments);
		this.textChanged();
		this.dateChanged();
		this.useridChanged();
    },

    textChanged: function () {
		this.$.text.setContent(this.text);
    },
    
    dateChanged: function () {
		this.$.date.setContent(this.date);
    },

    useridChanged: function () {
		this.$.id.setContent(this.userid);
    },
    
    replyTap: function() {
		this.$.body.destroyComponents();
		this.$.body.createComponent({
		    kind: "ReplyBox",
		    text: "",
		    container: this.$.body
		}).render();
    }
    
});