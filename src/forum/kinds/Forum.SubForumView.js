enyo.kind({
	name: "SubForumView",
	kind: enyo.Control,
    tag: "li",

	components: [
        //admin:
        //{ name: "btnNewThread", tag: "button", content: "New SubForum", ontap: "newSubForum"},

        { name: "subForum", tag: "table", classes: "subForumTable" }
	],

    published: {
		category: ""
    },

    //admin:
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
        this.$.subForum.destroyClientControls( );
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