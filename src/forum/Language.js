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
    textHere: "enter text here",
    post: "post",
	reply: "reply",
    close: "close",
    placeholder: "enter text here.",
    send: "send",
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
	newSubForum: "new subforum",
    //NewThread
    newThread: "create new thread",
    abort: "abort",
    postThread: "post",
    confirmAbortion: "really abort? Filled in text is not saved!"
    },

    sv: {
    textHere: "skriv text här",
    post: "posta",
	reply: "svara",
    close: "stäng",
    placeholder: "skriv in text här.",
    send: "sänd",
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
	newSubForum: "Nytt Subforum",
    //NewThread
    newThread: "skapa ny tråd",
    abort: "avbryt",
    postThread: "posta",
    confirmAbortion: "verkligen avbryta? Ifylld text sparas ej!"
    }
}
