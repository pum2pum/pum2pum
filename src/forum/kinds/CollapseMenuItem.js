enyo.Kind({
	name: "CollapseMenuItem",
	kind: "MenuItem",
	
	ontap: function(){
		this.bubble("HideMenu");
	}
})