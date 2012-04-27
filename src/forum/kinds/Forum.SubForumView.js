enyo.kind({
    name: "SubForumView",
    kind: enyo.Control,
    tag: "li",
    admin: true,

    components: [
        //admin:
        { name: "btnNewSub", tag: "button", ontap: "newSubForum", classes: "newSubForum"},

        { name: "subForum", tag: "ul", classes: "floatcontainer subForum"}
    ],

    published: {
        category: ""
    },

    //admin:
    newSubForum: function(){
        subForumTitle = window.prompt("SubForum title");
        subForumDescription = window.prompt("SubForum description");

        if (subForumTitle != "" || subForumDescription != "") {
            enyo.application.db.newSubForum( null, this.category, subForumTitle, subForumDescription);
        } else {
            console.log( "error creating subForum!" );
        }
    },

    create: function () {
        this.inherited(arguments);
        this.populate();
        this.setByLang();

        this.admin = false; //Make a check if you are admin

        if (!this.admin) {
            this.removeChild(this.$.btnNewSub);
        }
    },
    
    setByLang: function () {
        this.$.btnNewSub.setContent( Language.l("newSubForum", enyo.application.languge).capitalize());
    },

   	populate: function( ) {
        enyo.application.db.getSubForums( enyo.bind( this, "gotSubForums" ), this.category, 999, 0 );
    },

    gotSubForums: function( list ) {
        list.close();
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