enyo.kind({
	name: "SubForumView",
	kind: enyo.Control,
    tag: "li",

	components: [
        { name: "btnNewThread", tag: "button", content: "New SubForum", ontap: "newSubForum"},

        { tag: "table", classes: "subForumTable", components: [
            { tag: "tr", components: [
                { tag: "td", classes: "subForumTitle",
                    components: [ { tag: "p", content: "Title / Description" } ]},
                { tag: "td", classes: "subForumNewThreads",
                    components: [ { tag: "p", content: "New threads" } ]},
                { tag: "td", classes: "subForumThreads",
                    components: [ { tag: "p", content: "Threads" } ]},
                { tag: "td", classes: "subForumPosts",
                    components: [ { tag: "p", content: "Posts" } ]}
            ]},
        ]},

        { name: "subForum", tag: "table", classes: "subForumTable" }
	],

    published: {
		category: ""
    },

    newSubForum: function(){
        subForumTitle = window.prompt("SubForum title");
        subForumDescrition = window.prompt("SubForum description");
        if (subForumTitle != "" || subForumDescrition != "") {
            enyo.application.db.newSubForum( null, this.category, subForumTitle, subForumDescrition);
        } else {
            console.log( "error creating subForum!" );
        }
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