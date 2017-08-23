
/*taking the information from a weather site api and store it 
into database within one minute interval using setInterval()*/ 

const Curl = require( 'node-libcurl' ).Curl;
const mongojs = require('mongojs');  
const uuid = require('node-uuid'); 


var myVar = setInterval(function(){ myTimer() }, 600000);


function myTimer()
{
var curl = new Curl();
curl.setOpt( 'URL', 'http://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=503e9c64ebe3ca1bedcfa01df741f772' );
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
}

  
 
