enyo.kind({
	/*
	General information about the kind. It has a hidden button that allowes to create new subforums, if you modify the javascriptfile.
	Besides this it lists all subforums under a given category. 
	*/
    name: "SubForumView",
    kind: enyo.Control,
    tag: "li",
    admin: false,

    components: [
        //admin:
        { name: "btnNewSub", tag: "button", ontap: "newSubForum", classes: "newSubForum"},

        { name: "subForum", tag: "ul", classes: "floatcontainer subForum"}
    ],

    published: {
        category: ""
    },

    /*Upon clicking the newSubForum - button it is allowed th create a new subforum.*/
    newSubForum: function(){
        subForumTitle = window.prompt("SubForum title");
        subForumDescription = window.prompt("SubForum description");

        if (subForumTitle != "" || subForumDescription != "") {
            enyo.application.db.newSubForum( null, this.category, subForumTitle, subForumDescription);
        } else {
            console.log( "error creating subForum!" );
        }
    },

	/*Create a new SubForumView.*/
    create: function () {
        this.inherited(arguments);
        this.populate();

        this.admin = false; /*Make a check if you are admin*/

        if (!this.admin) {
            this.removeChild(this.$.btnNewSub); /*We weren't admin, so we can't create new SubForums.*/
        } else {
			this.setByLang();
		}
    },

	/*Set content on the button depending on language-setting.*/
    setByLang: function () {
        this.$.btnNewSub.setContent( Language.l("newSubForum", enyo.application.languge).capitalize());
    },

	/*Fill the list with subforums from the database.*/
   	populate: function( ) {
        enyo.application.db.getSubForums( enyo.bind( this, "gotSubForums" ), this.category, 999, 0 );
    },

	/*The return-function for the database that creates subforums.*/
    gotSubForums: function( list ) {
        list.close();
        this.$.subForum.destroyClientControls( );

		/*Loop the list and create a new kind for each entry.*/
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