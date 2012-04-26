enyo.kind({
    name: "CategoryView",
    kind: enyo.Control,
    tag: "div",
    admin: true,

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
        this.setByLang();

        this.admin = false; //Make a check if you are admin

        if (!this.admin) {
            this.removeChild(this.$.btnNewCategory);
        }
    },

    setByLang: function () {
        this.$.posts.setContent(Language.l( "Posts", enyo.application.language).capitalize());
        this.$.threads.setContent(Language.l( "Threads", enyo.application.language).capitalize());
        this.$.newThreads.setContent(Language.l( "New Threads", enyo.application.language).capitalize());
        this.$.btnNewCategory.setContent(Language.l( "New Category", enyo.application.language).capitalize());
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
                category: category,
            });
        }, this);
        this.$.categories.render();
    }

});