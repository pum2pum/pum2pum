enyo.kind({
	name: "CollapseMenuItem",
	kind: "MenuItem",
	
	create: function(){
		this.inherited(arguments);
	},
	tap: function(){
		this.bubble("HideMenu");
	}
});
