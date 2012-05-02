enyo.kind({
	/*
	The main-view of the forum. Contains all the categories that contain all the subforums that link to all threads...
	Has a button to create new category, but you have to change the admin-variable to true for it to be accessible.
	*/
    name: "CategoryView",
    kind: enyo.Control,
    tag: "div",
    admin: false,
    classes: "categoryView",

    components: [
        //admin:
        { name: "btnNewCategory", tag: "button", content: "New Category", ontap: "newCategory", classes: "newCategory"},
    
        { tag: "div", classes: "categoryContainerListHead floatcontainer", 
            components: [   
                { tag: "div", classes: "title",
                    components: [ { tag: "p", content: "Forum" } ] },
                { tag: "div", classes: "newThreads",
                    components: [ { tag: "p", name: "newThreads" } ] },
                { tag: "div", classes: "threads",
                    components: [ { tag: "p", name: "threads" } ] },
                { tag: "div", classes: "posts",
                  components: [ { tag: "p", name: "posts" } ] }
            ]
         },

        { name: "categories", tag: "ul", classes: "floatcontainer category"}
    ],

    published: {
        title: "",
    },

    /*Upon clicking the newCategory - button it is allowed th create a new category.*/
    newCategory: function(){
        categoryTitle = window.prompt("Category title");
        categoryDescription = window.prompt("Category description");
        if (categoryTitle != "" || categoryDescription != "") {
            enyo.application.db.newCategory( null, categoryTitle, categoryDescription);
        } else {
            console.log( "error creating category!" );
        }
    },

	/*Create the categoryView.*/
    create: function(){
        this.inherited(arguments);
        this.populate();
        this.setByLang();

        this.admin = false; //Make a check if you are admin

        if (!this.admin) {
            this.removeChild(this.$.btnNewCategory);
        }
    },

	/*Sets content of standard-texts.*/
    setByLang: function () {
        this.$.posts.setContent(Language.l( "posts", enyo.application.language).capitalize());
        this.$.threads.setContent(Language.l( "threads", enyo.application.language).capitalize());
        this.$.newThreads.setContent(Language.l( "newThreads", enyo.application.language).capitalize());
        this.$.btnNewCategory.setContent(Language.l( "newCategory", enyo.application.language).capitalize());
    },

	/*Get all categories from the database.*/
    populate: function(){
        enyo.application.db.getCategories( enyo.bind(this, "gotCategories"), 999, 0);
    },

	/*Recieived all categories from the database.*/
    gotCategories: function( list ) {
        if ( this.destroyed ) {
            list.close();
            return;
        }
        this.$.categories.destroyClientControls();
		
		/*Create a category-kind for each list-entry.*/
    	enyo.forEach( list.items(), function( category ) {
    		this.createComponent({
        		kind: "Category",
                container: this.$.categories,
                title: category.title,
                category: category,
            });
        }, this);
        this.$.categories.render();
    }

});