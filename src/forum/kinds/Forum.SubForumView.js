enyo.kind({
	name: "SubForumView",
	kind: enyo.Control,
    tag: "li",

	components: [      
        { tag: "div", classes: "subForumContainerListHead", 
            components: [
                { tag: "div", classes: "title",
                    components: [ { tag: "p", content: "Title / Description" } ] },
                { tag: "div", classes: "newThreads",
                    components: [ { tag: "p", content: "New threads" } ] },
                { tag: "div", classes: "threads",
                    components: [ { tag: "p", content: "Threads" } ] },
                { tag: "div", classes: "posts",
                    components: [ { tag: "p", content: "Posts" } ] }
            ]
        },
        { name: "subForum", tag: "ul", classes: "subForums" }
	],

    published: {
		category: ""
    },

    create: function () {
		this.inherited(arguments);
		this.populate();
    },

   	populate: function( ) {
    	enyo.application.db.getSubForums( enyo.bind( this, "gotSubForums" ), this.category, 999, 0 );
    },

    gotSubForums: function( list ) {
    	enyo.forEach( list.items(), function( subForum ) {
    		this.createComponent({
        		kind: "SubForum",
                container: this.$.subForum,
        		title: subForum.title,
        		description: subForum.description,
                subForum: subForum
        	});
        }, this);
        this.$.subForum.render();
    }
});