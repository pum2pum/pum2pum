enyo.kind({
    name: "Forum",
    kind: enyo.Control,
    tag: "div",
    
    components: [
        {name: "title", tag: "div", content: "Forumet!"},
        {name: "categories", tag: "div", content: "Innehåll..."}
    ],
    
    create: function(){
        
        console.log('create');
        this.inherited(arguments);
        
        enyo.application.db.getCategories(enyo.bind(this, "gotCategories"), 999, 0);
        
    },
    
    gotCategories: function(listOfCategories){
        
        enyo.forEach(listOfCategories.items(), function(category){
            this.createComponent({
                tag: "p",
                container: this.$.categories,
                content: category.title
            });
        }, this);
        
        this.$.categories.render();
        
    }
    
});