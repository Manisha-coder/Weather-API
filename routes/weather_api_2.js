
/*(same as weather_api_1.js)taking the information from a weather site api*/ 
/*(addition 1) convert/parse it the sunrise time into date format and store in DB
(addition 2) store will be done using curl scheduling*/

const Curl = require( 'node-libcurl' ).Curl;
const mongojs = require('mongojs');  
const uuid = require('node-uuid'); 
var schedule = require('node-schedule');

//var j = schedule.scheduleJob('5 * * * * *', function()
var j = schedule.scheduleJob('*/10 * * * * *', function() 
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
        newjson.content= JSON.parse(body);
        console.log(new Date(newjson.content.sys.sunrise * 1000));
        nj=new Date(newjson.content.sys.sunrise * 1000;
        db = mongojs('jewel');
        const copybooks = db.collection('copybooks');
        copybooks.save(nj);

        this.close();
    });

    curl.on( 'error', curl.close.bind( curl ) );
    curl.perform();
});


  
 

