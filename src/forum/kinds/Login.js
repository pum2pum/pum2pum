enyo.kind({
	name: "Login",
	kind: enyo.Control,
	classes: "login",

	components: [
		{kind: enyo.Button, content: "Login", className: "myButton", ontap: "buttonClick"},
		{kind: "onyx.Input", name: "nameField", placeholder: "Enter Login Name"}
	],

	loginToForum: function(){
		enyo.application.db.login(enyo.bind(this, "destroyLoginPage"), this.$.nameField.getValue()); //shouldnt need to run any function in callback
	},
	buttonClick: function(){
		this.loginToForum();
	},
	destroyLoginPage: function(){
		//---- pseudo-kod ----
		App = new ForumApp();
		App.renderInto(document.body);
		this.destroy();
		//--------------------
	}
})