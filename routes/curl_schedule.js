const Curl = require( 'node-libcurl' ).Curl;
const mongojs = require('mongojs');  
const uuid = require('node-uuid'); 
var schedule = require('node-schedule');

//var j = schedule.scheduleJob('5 * * * * *', function()
var j = schedule.scheduleJob("/10 * * * * *", function()
{
    console.info( 'Good morning' );
});


  
 

