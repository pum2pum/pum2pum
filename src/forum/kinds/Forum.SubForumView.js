enyo.kind({
	name: "SubForumView",
	kind: enyo.Control,

	components: [
		{name: "subForum", tag: "ul"}
	],

    published: {
		category: ""
    },

    create: function () {
    	console.log(this.category);
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
    		title: subForum.title;
    		description: subForum.description;
    	});
    }
});