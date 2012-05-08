enyo.kind({
	name: "Login",
	kind: enyo.Control,
	classes: "login",

	components: [
		{kind: enyo.Button, content: "Login", className: "myButton", ontap: "buttonClick"},
		{kind: "onyx.Input", name: "nameField", placeholder: "Enter Login Name"}
	],

	/*Creates a cookie containing the username so we can skip the login-screen if refreshing the page.*/
	setCookie: function (c_name,value,exdays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie = c_name + "=" + c_value;
	}, 
	/*Logins to the database, given that a non-empty username was given.*/
	loginToForum: function(){
		console.log("loggar in....");
		var name = this.$.nameField.getValue();
		if (name != "") {
			enyo.application.db.login(enyo.bind(this, "destroyLoginPage"), name); //shouldnt need to run any function in callback
			this.setCookie("username", name, 1);
		} else {
			console.log("Enter username!");
		}
	},
	buttonClick: function(){
		console.log("clicked!");
		this.loginToForum();
	},
	destroyLoginPage: function(){
		location.hash = "#loggin=1";
		location.hash = "#";
		//App = new ForumApp();
		//App.renderInto(document.body);
		//this.destroy();
	}
})