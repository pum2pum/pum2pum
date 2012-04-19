enyo.kind({
	name: "ShowMenuItem",
	kind: "MenuItem",
	
	create: function(){
		this.inherited(arguments);
	},
	tap: function(){
		this.bubble("ShowMenu");
	}
})