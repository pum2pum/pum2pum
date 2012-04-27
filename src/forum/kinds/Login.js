enyo.kind({
	name: "Login",
	kind: enyo.Control,

	components: [
		{kind: enyo.Button, content: "Login", className: "myButton", ontap: "buttonClick"},
		{kind: "onyx.Input", name: "nameField", placeholder: "Enter Account Name"}
	],

	loginToForum: function(){
		//enyo.application.liveDB.Login("callback", this.$.nameField.getValue());
	},
	buttonClick: function(){
		this.loginToForum();
	},
	destroyLoginPage: function(){
		//---- pseudo-kod ----
		//App = new ForumApp();
		//App.renderInto(document.body);
		//this.Destroy();
		//--------------------
	}
})