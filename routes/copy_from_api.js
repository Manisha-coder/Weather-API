const Curl = require( 'node-libcurl' ).Curl;
const mongojs = require('mongojs');  
const uuid = require('node-uuid'); 
var curl = new Curl();

curl.setOpt( 'URL', 'http://localhost:3000/books' );
curl.setOpt( 'FOLLOWLOCATION', true );
 
curl.on( 'end', function( statusCode, body, headers ) {
 
    console.info( statusCode );
    console.info( '---' );
    console.info( body );
    console.info( '---' );
    console.info( this.getInfo( 'TOTAL_TIME' ) );

    var newjson={};
    newjson._id=uuid.v1();
    newjson.content=body;
    console.log(newjson);
    db = mongojs('jewel');
    const copybooks = db.collection('copybooks');
    copybooks.save(newjson);

    this.close();
});

curl.on( 'error', curl.close.bind( curl ) );
curl.perform();