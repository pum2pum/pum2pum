enyo.kind({
	name: "CategoryView",
	kind: enyo.Control,
	tag: "div",

	components: [
		//admin:
		//{ name: "btnNewSub", tag: "button", content: "New Category", ontap: "newCategory"},
		
	    { name: "info-table", tag: "table", components: [
            { tag: "tr", components: [
                { tag: "td", style: "width: 55%",
                    components: [ { tag: "p", content: "Forum" } ]},
                { tag: "td", classes: "subForumNewThreads",
                    components: [ { tag: "p", content: "New threads" } ]},
                { tag: "td", classes: "subForumThreads",
                    components: [ { tag: "p", content: "Threads" } ]},
                { tag: "td", classes: "subForumPosts",
                    components: [ { tag: "p", content: "Posts" } ]}
            ]},
        ]},

		{ name: "categories", tag: "ul" }
	],

	published: {
		title: "",
	},

	//admin:
	newCategory: function(){
		categoryTitle = window.prompt("Category title");
		categoryDescription = window.prompt("Category description");
        if (categoryTitle != "" || categoryDescription != "") {
			enyo.application.db.newCategory( null, categoryTitle, categoryDescription);
        } else {
            console.log( "error creating category!" );
        }
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