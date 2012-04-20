enyo.kind({
	name: "CategoryView",
	kind: enyo.Control,
	tag: "div",

	components: [
		{ name: "btnNewSub", tag: "button", content: "New Category", ontap: "newCategory"},
		
		{ name: "categories", tag: "ul" }
	],

	published: {
		title: "",
	},

	newCategory: function(){
		categoryTitle = window.prompt("Category title");
		categoryDescription = window.prompt("Category description");
		enyo.application.db.newCategory( null, categoryTitle, categoryDescription);
	},

	create: function(){
		this.inherited(arguments);
		this.populate();
	},

	populate: function(){
		enyo.application.db.getCategories( enyo.bind(this, "gotCategories"), 999, 0);
	},

    gotCategories: function( list ) {
    	enyo.forEach( list.items(), function( category ) {
    		this.createComponent({
        		kind: "Category",
                container: this.$.categories,
                title: category.title,
                description: category.description,
                category: category
        	});
        }, this);
        this.$.categories.render();
    }

});