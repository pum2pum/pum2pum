// Enyo kinds for the top menu of the forum app

enyo.kind({
    name: "ForumMenu",
    kind: enyo.Control,
    tag: 'ul',
    classes: "forumMenu",
    components: [
	{kind: "MenuItemWithOverlay", imageUrl: "/images/icons/online.png", altText: "Online users", executeAction: goToUsersView},
	{kind: "MenuItem", imageUrl: "/images/icons/online.png", altText: "Online users"},
	{kind: "MenuItem", imageUrl: "/images/icons/settings.png", altText: "Settings", executeAction: goToSettingsView},
	{kind: "MenuItem", imageUrl: "/images/icons/collapse.png", altText: "Collapse", executeAction: clearBody},// TODO What is this supposed to do on click anyway?
    { kind: "MenuItem",  newKind: "SettingsView" },
    { kind: "MenuItem", newKind: "en annan view" },
    { kind: "MenuItem", newKind: "razzz" }
    ]
});

enyo.kind({
    name: "MenuItem",
    kind: "Control",
    published: {
		imageUrl: "",
		altText: "",
		newKind: ""
    },
    handlers: {
	mouseup: "tap" // Required for non-touch devices
    },



    tag: "li",
    create: function() {
	this.inherited(arguments);
	this.content = "<img src='" + this.imageUrl + "' alt='" + this.altText + "' />";
	this.getUserCount();
    },
    getUserCount: function() {
	// Set up connection to liveDB so that usercount is
	// always kept up to date
    },
    tap: function(inSender, inEvent) {
	// Go to the intended view
	//this.executeAction();
	
	//instead of executeAction use bubble which uses Forum.Apps function changeView
	this.bubble("onChangeView", this.newKind)
	
    }
});

enyo.kind({
    name: "MenuItemWithOverlay",
    kind: "MenuItem",
    published: {
	imageurl: "",
	alttext: "",
	executeaction: function(){}
    }
    // handlers: {
	// mouseup: "tap" // Required for non-touch devices
    // },
    // tag: "li",
    // create: function() {
	// this.inherited(arguments);
	// this.content = "<img src='" + this.imageUrl + "' alt='" + this.altText + "' />";
	// this.getUserCount();
    // },
    // getUserCount: function() {
	// // Set up connection to liveDB so that usercount is
	// // always kept up to date
    // },
    // tap: function(inSender, inEvent) {
	// // Go to the intended view
	// this.executeAction();
	// this.applyStyle("background-color", "black");
    // }
});

//use enyos enyo.destroyClientComponents() instead
function removeChildNodes(domNode) {
    var children = domNode.childNodes;
    for (var i = 0; i < children.length; i++) {
    	domNode.removeChild(children[i]);
    }
}

function goToUsersView () {
	var bodyNode = document.getElementById("forumBody");
	removeChildNodes(bodyNode);
	new UsersView().renderInto(bodyNode);
}

function goToRepliesView () {
	var bodyNode = document.getElementById("forumBody");
	removeChildNodes(bodyNode);
	new RepliesView().renderInto(bodyNode);
}

function goToSettingsView () {
	var bodyNode = document.getElementById("forumBody");
	removeChildNodes(bodyNode);
	new SettingsView().renderInto(bodyNode);
}

function clearBody () {
	var bodyNode = document.getElementById("forumBody");
	removeChildNodes(bodyNode);
}
