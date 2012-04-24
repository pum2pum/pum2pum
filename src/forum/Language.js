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
		by: "by",
		lastPost: "last post",
		thread: "thread",
		topic: "topic",
		post: "post",
		posts: "posts",
		startedBy: "started by"
	},

	sv: {
		by: "av",
		lastPost: "senaste posten",
		thread: "tråd",
		topic: "ämne",
		post: "inlägg",
		posts: "inlägg",
		startedBy: "startad av"
	}
}
