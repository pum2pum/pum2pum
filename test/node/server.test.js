var assert = require('assert'),
    http = require('http');

var PATH = '../../src/server/server',
    total = 0, 
    passed = 0,
    reqs = [];

/* Some ASCII color constants just to make things a bit prettier... =) */
var red = '\033[31m', green = '\033[32m', reset = '\033[0m';

/* 
A network test is just a HTTP-request with a name and info about whether its 
callback has been run or not. Adds a network test to the list of tests to be run.
*/
function addNetworkTest(name, options, callback) {
    reqs.push({ 
        req : http.request(options, callback),
        name: name,
        callbackFired : false 
    });
}

/* Exit "after a while" since it's very hard to know when to exit... */
setTimeout(function(){ process.exit(-1); }, 2500);

/* Set a callback to be run just before exiting */
process.addListener('exit', function() {
    /* Check that the callback of each network-test did run.
       Otherwise, the assertions has not been run an the test may be worthless */
    for(var i in reqs) {
        assert.ok(reqs[i].callbackFired, "Test " + reqs[i].name +" was never run");
    }
    
    /* Print a pretty result =) */
    var color = (passed == total)? green : red;

    console.log(reset + "\n== Result ==");
    console.log(color + passed + " out of " + total + " test suites passed." + reset);
});


exports['ArgumentHandling'] = function() {
    UNITTEST = true;
    test_process = process; 
    // contents of argv to a correct program is: ['node', 'path-to-script', 'app name']

    test_process.argv = ['', '']; // first two arguments is normally supplied by the shell
    var s = require(PATH);
    msg = s.startServer();

    /**
    Testcase 2.1.1
    Fails if the server doesn't give a proper error-message when an argument is missing
    **/
    assert.equal(msg, 'usage: node server.js <appname>', "2.1.1 Wrong or missing error-message");

    test_process.argv = ['', '', 'doesnotexist']; 
    var s = require(PATH);
    msg = s.startServer();

    /**
    Testcase 2.1.2
    Fails if the server doesn't give a proper error-message when an app doesn't exist
    **/
    assert.equal(msg, 'no such app: "doesnotexist"', "2.1.2 Wrong or missing error-message");
    return true;
}


exports["ServerNetworking"] = function() {
    test_process.argv = ['', '', 'unittest-hello']; 
    var s = require(PATH);

    // Start the server and give it a callback to fire when ready
    msg = s.startServer(
        function(port) { // called when server has started
            console.log("Server was started at port " + port);

            addNetworkTest("2.3.1, 2.3.2", {port: port}, 
            function(res) {
                /**
                Testcase 2.3.1
                Fails if server sends wrong HTTP status code
                **/
                assert.equal(res.statusCode, 200, "2.3.1 Incorrect HTTP status code");

                res.on('data', function (chunk) {
                    /**
                    Testcase 2.3.2
                    Fails if the responded data is not correct
                    **/
                    assert.equal('' + chunk, "Hello world!", "2.3.2 Unexpected HTTP-response test");

                    /* Indicate that the test has been run (a bit ugly, though...) */
                    reqs[0].callbackFired = true;
                });
            });

            addNetworkTest("2.3.3", {path: '/doesnotexist', port: port}, 
            function(res) {
                /**
                Testcase 2.3.3
                Fails if server sends incorrect HTTP status code
                **/
                assert.equal(res.statusCode, 404, "2.3.3 Incorrect HTTP status code");
                reqs[1].callbackFired = true;
            });

            /* Loop through all network tests and run them */
            for(var i in reqs) {
                reqs[i].req.end();
            }
        });

    if(typeof msg != "undefined") {
        console.log(msg);   
    }
    
    /**
    Basic handling of Testsuite 2.1
    Fails if server gives an error message
    **/
    assert.ok(typeof msg == "undefined", "2.1 Server returned an unexpected error-message");
}

/* Loop through all test suites and run them */
for (var name in exports) {
    console.log("\n== Running test suite " + name + " ==");
    total++;

    try {
        exports[name]();
        console.log(green + "Test " + name + " passed!\n" + reset);
        passed++;

    } catch(e) {
        console.log(red + e.stack + "\n");
        console.log("Test " + name + " failed!" + reset);
    }
};