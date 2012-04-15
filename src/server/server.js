var http = require('http');
var url = require('url');
var fs = require('fs');
var sys    = require('util');
var path = require('path');

var PORT = 8124;
var FILE_REGEX = /.*\/([^\/]+)$/;

/****/

String.prototype.endsWith = function(str) 
{
    return (this.match(str+"$")==str)
}


function error(msg) 
{
    if(typeof UNITTEST === "undefined") 
    {
        console.log(msg);
        process.exit(-1);
    } 
    else {
        return msg;
    }
}

/****/


/* Place everything in a wrapper to make it possible to export */
var startServer = function(readyCallback) {

    /******* STARTUP *********/
    var depFiles = [];

    // arguments
    if (process.argv.length < 3)
    {
        return error("usage: node server.js <appname>");
    }

    // Path to app
    appName = process.argv[2];
    appRoot = path.resolve( path.join( '..', appName ) );

    serverRoot = path.resolve();

    if (!path.existsSync(appRoot))
    {
        return error('no such app: "' + appName + '"');
    }

    configFilename = path.join( appRoot, 'app.json' );
    config = JSON.parse(fs.readFileSync(configFilename));

    /*** load dependencies ***/
    if(config.dependencies){
        dependenciesRoot = path.join(serverRoot, "dependencies");
        config.dependencies.forEach(function(elem){
            tmpPath = path.join(dependenciesRoot, elem);

            if(!path.existsSync(tmpPath)){
    /* As a secondary option, try to load dependencies from the folder with apps.
    Needed since the testdriver-app has to access the other apps. */
                tmpPath = path.join('..', elem);
                
                if(!path.existsSync(tmpPath)){
                    return error("Couldn't find " + elem);
                }
                elem = elem.match( FILE_REGEX )[1];
            }

            depFiles[elem] = fs.readFileSync(tmpPath,"utf8");
            console.log("added " + elem);
        });
    }
    /******* /STARTUP *******/
    /* Now the server starts, no more sync! */


    /******* SERVER ****/
    var server = http.createServer(function (req, res) {    
        var uriPath = url.parse(req.url).pathname;
        
        if(uriPath.endsWith("/")){
            uriPath += config.settings.index;
            res.writeHead( 200, {'Content-Type': "text/html"});
        }else if(uriPath.endsWith(".js")){
            res.writeHead( 200, {'Content-Type': "text/javascript"});
        }
        else if(uriPath.endsWith(".css")){
            res.writeHead( 200, {'Content-Type': "text/css"});
        } else if( uriPath.endsWith( ".png" ) ) {
            res.writeHead( 200, { 'Content-Type': "image/png" } );
        }
        else{
            res.writeHead( 200, {'Content-Type': "text/html"});
        }

        file = uriPath.match( FILE_REGEX );
        if( file ) {
            file = file[1];
        }

        if(depFiles[file])
        {
            res.end(depFiles[file]);
        }else{
            fs.readFile(path.join(appRoot, uriPath), "utf8", function(err, data){
                if(err){
                    res.writeHead(404);
                    res.end("404");
                }else{
                    res.end(data);
                }
            }); 
        }
    });

    /* Begin listen on the port, callback is fired when ready */
    server.listen(PORT, null, function() {
        console.log("server online at port " + PORT);

        if(readyCallback !== undefined) {
            readyCallback(PORT);
        }
    });


    /******* DATABASE ***********/
    dbFile = appName;

    db = require("./database/database");
    dbMgr = new db.DatabaseManager(server, dbFile, function (error)
        {
            if (error)
                return;
            if (config.db)
            {
                for (var i in config.db)
                {
                    dbMgr.mkdirp( config.db[i] );
                }
            }
        });
    /****** /DATABASE **********/
}


/* Export the server-function and run it if not inside a unit test */
exports.startServer = startServer;

if(typeof UNITTEST === "undefined") {
    startServer();
}