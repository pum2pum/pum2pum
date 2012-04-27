enyo.kind({
    name: "ForumNewThread",
    kind: enyo.Control,
    tag: "div",
    published: {
        cbSuccess: null,
        cbAbort: null
    },
    
    classes: ["newThread"],
    
    components: [
        {classes: "onyx-toolbar-inline maxSize titleBox", components: [
            {kind: "onyx.InputDecorator", components: [
                {kind: "onyx.RichText", name: "title", placeholder: "Enter text here"}
            ]}
        ]},
        {tag: "input", name: "post", classes: ["newThreadPost"]},
        {tag: "div", classes: ["newThreadButtonsHolder"], components: [
            {tag: "button", content: "Avbryt", ontap: "abort"},
            {tag: "button", content: "Posta", ontap: "postThread"}]}],
    
    published: {
        title: "",
        post: ""
    },
    
    create: function(){
        
        this.inherited(arguments);
        
        this.titleChanged();
        this.postChanged();
        
    },
    
    titleChanged: function(){
        this.$.title.setContent(this.title);
    },
    
    postChanged: function(){
        this.$.post.setContent(this.post);
    },
    
    sendTap: function () {
        if (this.replyText != "") {
            enyo.application.db.newAnswer( null, this.post, this.replyText);
        }
    },
    
    abort: function(){
        
        // Get thread data
        var title = this.$.title.hasNode().value;
        var post = this.$.post.hasNode().value;
        
        var abort = true;
        
        // If anything is filled in...
        if(title.length != 0 || post.length != 0){
            
            // ...confirm the abortation
            abort = confirm("Kasta tråden? Ifylld text sparas ej.");
            
        }
        
        if(abort){
            
            this.cbAbort();
            
        }
        
    },
    
    postThread: function(){
        
        // Get thread data
        var title = this.$.title.hasNode().value;
        var post = this.$.post.hasNode().value;
        
        // Validate
        var errors = new Array();
        
        if(title.length == 0){
            
            errors.push("ThreadErrorEmptyTitle");
            
        }
        
        if(post.length == 0){
            
            errors.push("ThreadErrorEmptyPost");
            
        }
        
        if(errors.length == 0){
            
            // Everything ok
            this.cbSuccess(title, post);
            
        }else{
            
            // Everything not ok!
            // TODO, show errors
            
        }
        
    }
    
});