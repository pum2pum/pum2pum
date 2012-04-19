enyo.Kind({
	name: "ShowMenuItem",
	kind: "MenuItem",
	
	ontap: function(){
		this.bubble("ShowMenu");
	}
})