enyo.depends(
	// Load dependencies required for tests to run
	"/socket.io/socket.io.js",
	"/api.js",
	"/forumdatabase.js",
	"/init.js",

	// Load testsuites
	"DatabaseTests.js",
	"BasicForumTests.js"
);
