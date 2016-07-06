var restify = require( 'restify' );
var db = require( './models' );
var config = require( './config/config.json' );

if( typeof process.env.NODE_ENV === 'undefined' ){
    process.env.NODE_ENV = 'production';
}

console.log( 'Launching in ' + process.env.NODE_ENV + ' mode' );

var server = restify.createServer( {
    name: config.base.name,
    version: config.base.version
} );

server.use( restify.acceptParser( server.acceptable ) );
server.use( restify.queryParser() );
server.use( restify.bodyParser() );
server.use( restify.authorizationParser() );
server.use( restify.CORS() );
server.use( restify.fullResponse() );


server.on( 'uncaughtException', function( req, res, route, error ){


    console.log( '==== uncaughtException' );
    console.log( error );
    console.log( error.stack );
    console.log( '========' );
} );

db.sequelize.sync( { force: false } )
    .complete( function( err ){
        if( err ){
            throw err;
        }
        else{
            server.listen( config.base.port, function(){
                console.log( config.base.name + ' listening on port ' + config.base.port );
            } );
        }
    } );


require( './config/routes' )( server );
