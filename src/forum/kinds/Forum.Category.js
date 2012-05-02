enyo.kind({
	/*
	General information about the kind. 
	It contains a title and a list of subforums.
	*/
    name: "Category",
    kind: enyo.Control,
    tag: "li",
    classes: "floatcontainer category",

	/*Defines the components of the category.*/
    components: [
        { name: "category", tag: "div", classes: "categoryContainerHead", components: [
            { name: "title", tag: "p" }
        ]},

        { name: "subForumView", tag: "ul", classes: "subForumView" }
    ],

    published: {
        category: "",
    },

	/*Create a new category.*/
    create: function(){
        this.inherited(arguments);
        this.createSubForumView();
        this.$.title.setContent( this.title );
    },

	/*Each category have a SubForumView that lists all subForums of the category.*/
    createSubForumView: function( ) {
        this.createComponent({
            kind: "SubForumView",
            container: this.$.subForumView,
            category: this.category
        });
    }
});