enyo.kind({
	name: "Category",
	kind: enyo.Control,
	tag: "li",

	components: [
		{ name: "category", tag: "li", components: [
			{ name: "definition", tag: "div", components: [
				{ name: "title", tag: "p", classes: "categoryTitle" },
				{ name: "description", tag: "p" },
				{ name: "subForumView", tag: "ul" }
			]}
		]}
	],

	published: {
		category: "",
	},

	create: function(){
		this.inherited(arguments);
		this.createSubForumView();
		this.$.title.setContent( this.title );
		this.$.description.setContent( this.description );
	},

    createSubForumView: function( ) {
   		this.createComponent({
       		kind: "SubForumView",
            container: this.$.subForumView,
            category: this.category
        });
//        this.$.category.render();
    }
});