enyo.kind({
	name: "Login",
	kind: enyo.Control,
	classes: "login",

	components: [
		{kind: enyo.Button, content: "Login", className: "myButton", ontap: "buttonClick"},
		{kind: "onyx.Input", name: "nameField", placeholder: "Enter Login Name"}
	],

	setCookie: function (c_name,value,exdays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
//		var c_isSet=escape("isSet") + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie = c_name + "=" + c_value;
//		document.cookie = "isSet" + "=" + c_isSet;
	}, 
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