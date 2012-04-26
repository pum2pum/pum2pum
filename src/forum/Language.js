function Language( ) {

}

Language.DEFAULTLANG = "en";

Language.l = function( string, lang ) {

    var getLang;
    if ( lang !== undefined ) {
	getLang = lang;
    } else {
	getLang = Language.DEFAULTLANG;
    }

    var got;
    got = this.languages[getLang][string];

    if ( got === undefined ) {
	if ( getLang === Language.DEFAULTLANG ) {
	    return 'Could not find "' + string + '"';
	}
	got = this.l( string, Language.DEFAULTLANG );
    }
    return got;
}

Language.languages = {
    en: {
	reply: "reply",
	by: "by",
	post: "post",	
	thread: "thread",
	//ThreadContainer
	topic: "topic",
	startedBy: "started by",
	lastPost: "last post",
	posts: "posts",
	//CategoryView
	forum: "forum",
	threads: "threads",
	newThreads: "new threads",
	newCategory: "new category",
	//SubForumView
	newSubForum: "new subforum"
    },

    sv: {
	reply: "svar",
	by: "av",
	post: "inlägg",
	thread: "tråd",
	//ThreadContainer
	topic: "ämne",
	startedBy: "startad av",
	lastPost: "senaste posten",
	posts: "inlägg",
	//CategoryView
	forum: "forum",
	threads:  "trådar",
	newThreads: "nya trådar",
	newCategory: "Ny Kategori",
	//SubForumView
	newSubForum: "Nytt Subforum"
    }
}
