/** Object that controls the database for the forum **/
function forumDatabase( ){
	this.liveDB = new LiveDB( );
	this.loggedIn = false;
};

forumDatabase.prototype = {

	/** Login to the database
	* Logs username in to the database
	* -----------
	* cb 		- Callback function to be called when the user has been logged in
	* username 	- Username of the user
	**/
	login: function ( cb, username ) {
		var that = this;
		
		this.liveDB.login( function( arg ) {
			that.loggedIn = true;
			that.callbackTunnel( cb, arg );
		}, username );
		
	},

	/* Tunnel the callback to see if it had the same object as before */
	callbackTunnel: function( cb, arg ){
		if( cb !== null ) {
			cb( arg );
		}
	},

	/** Creates a new category
	* A category contains a title and a description of the category
	* -------
	* cb(error) - Callback function gets called if something goes wrong
	* title 	- Title of the category
	* desc 		- Description of the category
	**/
	newCategory: function ( cb, title, desc ) {
		trans = this.liveDB.transaction( );
		trans.create( '/categories', { title: title, description: desc, } );
		var that = this;
		trans.go( function( arg ) { that.callbackTunnel( cb, arg ) } );
	},

	/** Get all Categories
	* The callback receives a List of all the categories
	* ------
	* cb(list) 	- Callback function to be called after the categories has been received. list contains the returned object from the database
	* num 		- Numbers of enteries to get
	* start 	- get entry number start first
	**/
	getCategories: function ( cb, num, start ) {
		var that = this;
		this.liveDB.list( function( arg ) { that.callbackTunnel( cb, arg ); },
			'/categories', '->', null, { 'title': 1, 'description': 1 },
			num, start, null, [ { name:'title', dir: "desc", nocase: 1 } ] );
	},

	/** Creates a new SubForum 
	* A subforum is connected to a category and has a title and a description
	* ---------
	* cb(error)	- Callback function gets called if something goes wrong
	* cat 		- The parent category node
	* title 	- Title of the SubForum
	* desc 		- Description of the SubForum
	**/
	newSubForum: function( cb, cat, title, desc ) {
		trans = this.liveDB.transaction( );
		trans.create( cat, { title: title, description: desc } );
		var that = this;
		trans.go( function( arg ) { that.callbackTunnel( cb, arg ) } );
	},

	/** Gets all the SubForums from parent Category
	* The callback receives a List of all the SubForums
	* ----------
	* cb(list) 	- Callback function to be called after the categories has been received. list contains the returned object from the database
	* cat 		- The parent category node
	* num 		- Numbers of enteries to get
	* start 	- get entry number start first
	**/
	getSubForums: function( cb, cat, num, start ) {
		var that = this;
		this.liveDB.list( function( arg ) { that.callbackTunnel( cb, arg ); },
			cat, '->', null, {'title': 1, 'description': 1 },
			num, start, null, [{name:'title', dir: "desc", nocase: 1 }]);
	},

	/** Creates a new Thread 
	* A Thread is connected to a SubForum and has a title, description and content
	* ---------
	* cb(error)	- Callback function gets called if something goes wrong
	* subForum 	- The parent SubForum node
	* title 	- Title of the Thread
	* desc 		- Description of the Thread
	* content 	- The content of the first "post"
	**/
	newThread: function( cb, subForum, title, content ) {
		trans = this.liveDB.transaction( );
		trans.create( subForum, { title: title, content: content, lastUpdated: this._now( ) } );
		var that = this;
		trans.go( function( arg ) { that.callbackTunnel( cb, arg ) } );
	},

	/** Gets all the Threads from parent SubForum
	* The callback receives a List of all the Threads
	* ----------
	* cb(list) 	- Callback function to be called after the categories has been received. list contains the returned object from the database
	* subForum	- The parent SubForum node
	* num 		- Numbers of enteries to get
	* start 	- get entry number start first
	**/
	getThreads: function( cb, subForum, num, start ) {
		var that = this;
		this.liveDB.list( function( arg ) { that.callbackTunnel( cb, arg ); },
			subForum, '->', null, { 'title': 1, 'content': 1, 'lastUpdated': 1 },
			num, start, null, [ { name:'lastUpdated', dir: "desc" } ] );
			//num, start, null, [ { name:'title', dir: "desc", nocase: 1 } ] );
	},

	/** Creates a new Post 
	* A subforum is connected to a category and has a title and a description
	* ---------
	* cb(error)	- Callback function gets called if something goes wrong
	* thread 	- The parent Thread node
	* content 	- Content of the Post
	**/
	newPost: function( cb, thread, content ) {
		/*var that = this;

		this.get( function( updateThis ) {
			updateTrans = that.liveDB.transaction( ); // kommer inte förbi här :S
			updateTrans.update( updateThis.item( ), { "lastUpdated": that._now() }, { "lastUpdated": that._now() } );
			updateTrans.go( function( error ) { console.log(error); });

		}, thread, { 'title': 1, 'content': 1, 'lastUpdated': 1 } );
		*/

		trans = this.liveDB.transaction( );
		trans.create( thread, { content: content } );
		
		trans.go( function( arg ) { that.callbackTunnel( cb, arg ) } );
	},

	/** Gets all the Posts from parent Thread
	* The callback receives a List of all the Posts
	* ----------
	* cb(list) 	- Callback function to be called after the categories has been received. list contains the returned object from the database
	* thread	- The parent Thread node
	* num 		- Numbers of enteries to get
	* start 	- get entry number start first
	**/
	getPosts: function( cb, thread, num, start ) {
		var that = this;
		this.liveDB.list( function( arg ) { that.callbackTunnel( cb, arg ); },
			thread, '->', null, { 'content':1 },
			num, start, null, [ { name:'title', dir: "desc", nocase: 1 } ] );
	},

	/** Creates a new Answer
	* A answer is an post that is answering to another post
	* ---------
	* cb(error)	- Callback function gets called if something goes wrong
	* post  	- The parent Post node, the post we are answering to
	* content 	- Content of the Answer
	**/
	newAnswer: function( cb, post, content ) {
		trans = this.liveDB.transaction( );
		trans.create( post, { content: content } );
		var that = this;
		trans.go( function( arg ) { that.callbackTunnel( cb, arg ) } );
	},

	/** Gets all the Answers from parent Post
	* The callback receives a List of all the Answers
	* ----------
	* cb(list) 	- Callback function to be called after the answers has been received. list contains the returned object from the database
	* post		- The parent Post node
	* num 		- Numbers of enteries to get
	* start 	- get entry number start first
	**/
	getAnswers: function( cb, post, num, start ) {
		var that = this;
		this.liveDB.list( function( arg ) { that.callbackTunnel( cb, arg ); },
			post, '->', null, { 'content': 1 },
			num, start, null, [ { name:'title', dir: "desc", nocase: 1 } ] );
	},

	/** Gets the username of a user with a specific id
	* The callback function contains the returned user in an database object
	* ----------
	* cb(user) 	- Callback function to be called after the user has been received. user contains the returned user from the database
	* userId 	- The userid of the user to be fetched
	**/
	getUser: function( cb, userId ) {
		this.liveDB.get(userId, { 'name': 1, '_online': 1 }, cb );
	},

	/** Gets all the users
	* The callback function contains the users in an database object
	* ------------
	* cb(users) - Callback function to be called after the users has been received. users contains the returned users
	* num 		- Numbers of users to get
	**/
	getAllUsers: function( cb, num ) {
		this.liveDB.list( cb, '/users', '->', null, { '_online':1, 'name':1 },
			    num, null, null, [ { name:'_online', dir:'desc' },
				{ name:'name', dir:'asc', nocase:1 } ] );
	},

	/** Gets a node
	* The callback contains the node
	* -----------------------
	* cb( node )	- Callback function called with the returned node
	* what 			- What node to get
	* attributes 	- What attributes to get from the node
	**/
	get: function( cb, what, attributes ) {
		this.liveDB.get( what, attributes, cb );
	},

	/** deletes a database entry
	**/
	delete: function( node ) {
		this.liveDB.delete( node );
	},

	/* "private" helpfunctions */

	_now: function( ) {
		return ( new Date().getTime() / 1000 ).toFixed();
	}


}
