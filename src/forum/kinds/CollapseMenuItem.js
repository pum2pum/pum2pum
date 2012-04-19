enyo.kind({
	name: "CollapseMenuItem",
	kind: "MenuItem",
	
	ontap: function(){
		this.bubble("HideMenu");
	}
});
