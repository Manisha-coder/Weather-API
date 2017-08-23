'use strict';

const Hapi = require('hapi');  
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({  
  port: 3000
});

//Connect to db
server.app.db = mongojs('punit');

var listOfRoutes = [require('./routes/weather_api_3')];

function mainHandler(err1) {

  if (err1) {
    throw err1;
  }

  // Start the server
  server.start((err1) => {
    console.log('Server running at:', server.info.uri);
  });
}

server.register(listOfRoutes, mainHandler);

