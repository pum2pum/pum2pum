enyo.kind({
    name: "Category",
    kind: enyo.Control,
    tag: "li",
    classes: "floatcontainer category",

    components: [
        { name: "category", tag: "div", classes: "categoryContainerHead", components: [
            { name: "title", tag: "p" }
        ]},

        { name: "subForumView", tag: "ul", classes: "subForumView" }
    ],

    published: {
        category: "",
    },

    create: function(){
        this.inherited(arguments);
        this.createSubForumView();
        this.$.title.setContent( this.title );
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