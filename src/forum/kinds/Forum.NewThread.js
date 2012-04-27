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
        {classes: "onyx-toolbar-inline maxSize newThreadTitleBox", components: [
            {kind: "onyx.InputDecorator", components: [
                {kind: "onyx.Input", name: "title", placeholder: ""}
            ]}
        ]},
        {classes: "onyx-toolbar-inline maxSize newThreadPostBox", components: [
            {kind: "onyx.InputDecorator", components: [
                {kind: "onyx.RichText", name: "post"}
            ]}
        ]},
        {tag: "div", classes: ["newThreadButtonsHolder"], components: [
            {tag: "button", name: "abortButton", content: "", ontap: "abort"},
            {tag: "button", name: "postButton", content: "", ontap: "postThread"}]}],
    
    create: function () {
        
        this.inherited(arguments);
        
        this.$.abortButton.setContent(Language.l("abort", enyo.application.language).capitalize());
        this.$.postButton.setContent(Language.l("postThread", enyo.application.language).capitalize());
        this.$.title.setPlaceholder(Language.l("topic", enyo.application.language).capitalize());
        
    },
    
    abort: function(){
        
        // Get thread data
        var title = this.$.title.getValue();
        var post = this.$.post.getValue();
        
        var abort = true;
        
        // If anything is filled in...
        if(title.length != 0 || post.length != 0){
            
            // ...confirm the abortion
            var text = Language.l("confirmAbortion", enyo.application.language).capitalize();
            abort = confirm(text);
            
        }
        
        if(abort){
            
            this.cbAbort();
            
        }
        
    },
    
    postThread: function(){
        
        // Get thread data
        var title = this.$.title.getValue();
        var post = this.$.post.getValue();
        
        // Validate
        var errorsExist = false;
        
        if(title.length == 0){
            
            errorsExist = true;
            this.$.title.addClass("errorEmptyInput");
            var that = this;
            window.setTimeout(function(){
                
                that.$.title.removeClass("errorEmptyInput");
                
                }, 1000);
            
            
        }
        
        if(post.length == 0){
            
            errorsExist = true;
            this.$.post.addClass("errorEmptyInput");
            var that = this;
            window.setTimeout(function(){
                
                that.$.post.removeClass("errorEmptyInput");
                
                }, 1000);
            
        }
        
        if(!errorsExist){
            
            this.cbSuccess(title, post);
            
        }
        
    }
    
});