
/*(same as weather_api_2.js)*/
/*(addition 1) convert the sunset time also and store in any user required form
(addition 2) obtain and store the difference time (daytime) between sunrise and sunset*/


const Curl = require( 'node-libcurl' ).Curl;
const mongojs = require('mongojs');  
const uuid = require('node-uuid'); 
const schedule = require('node-schedule');

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

        var d1=new Date(newjson.content.sys.sunrise * 1000);
        var d2=new Date(newjson.content.sys.sunset * 1000);
        console.log(d1);
        console.log(d2);
        var hour1=d1.getHours();
        var minute1= d1.getMinutes();
        var seconds1=d1.getSeconds();
        var day1=d1.getUTCDate();
        var year1=d1.getUTCFullYear();
        var month1=d1.getUTCMonth();
        var hour2=d2.getHours();
        var minute2= d2.getMinutes();
        var seconds2=d2.getSeconds();
        var day2=d2.getUTCDate();
        var year2=d2.getUTCFullYear();
        var month2=d2.getUTCMonth();
        var mnames = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
        var dname1=(hour1+':'+minute1+':'+seconds1+' '+day1+' '+mnames[month1]+' '+year1);
        var dname2=(hour2+':'+minute2+':'+seconds2+' '+day2+' '+mnames[month2]+' '+year2);
        console.log(dname1);
        console.log(dname2);

        if (minute2 < minute1)
        {
             hdif=hour2-hour1-1;
             mdif=minute1-minute2;
        } 
        else 
        {
            hdif=hour2-hour1;
            mdif=minute2-minute1;
        }
        if (seconds2 < seconds1)
        {
             mdif=mdif-1;
             sdif=seconds1-seconds2;
        } 
        else 
        {
           sdif=seconds2-seconds1;
        }
        

        dif=(hdif+':'+mdif+':'+sdif);

        db = mongojs('jewel');    //database name
        const copybooks = db.collection('copybooks');     //collection neme
        newjson.content.sys.sunrise=dname1;
        newjson.content.sys.sunset=dname2;
        newjson.content.sys.daytime=dif;
        copybooks.save(newjson);
        console.log(newjson);
        console.log(dif);
        
        this.close();
        
    });

    curl.on( 'error', curl.close.bind( curl ) );
    curl.perform();
});
 

