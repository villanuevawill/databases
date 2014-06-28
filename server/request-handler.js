var url = require('url');
var fs = require('fs');
var helpers = require('./helpers.js');
var db = require('../SQL/db.js').dbConnection;

module.exports.handler = function(request, response) {


  console.log("Serving request type " + request.method + " for url " + request.url);

  var parsedUrl = url.parse(request.url);

  var statusCodes = {
    GET: 200,
    POST: 201,
    OPTIONS: 200
  };

  var statusCode = statusCodes[request.method];

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  if (routes[parsedUrl.pathname]) {
    response.writeHead(statusCode, headers);

    if (request.method === 'OPTIONS') {
      response.end();
    }

    if (request.method === 'POST') {
      var data = '';
      request.on('data', function(chunk){
        data += chunk;
      });

      request.on('end', function() {
        data = JSON.parse(data);

        var isResolved = {user: false, room: false};
        addIfNotInDB(data.username, 'Users', 'username', function(){
          helpers.checkIfFinished(isResolved, 'user', function(){
            helpers.insertMessage(data,function(idValue){
              response.end(JSON.stringify({objectId: idValue}));
            });
          });
        });
        addIfNotInDB(data.roomname, 'Rooms', 'roomname', function(){
          helpers.checkIfFinished(isResolved, 'room', function(){
            helpers.insertMessage(data, function(idValue){
              response.end(JSON.stringify({objectId: idValue}));
            });
          });
        });
      });
    }


    if (request.method === 'GET') {
      fs.readFile('./server/messages.json', function(err, data){
        if (err){console.log(err , data);}
        response.end(data);
      });
    }
  } else {
    response.writeHead(404, headers);
    response.end();
  }

};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var routes = {
  "/": true,
  "/classes/messages/": true,
  "/classes/messages": true,
  "/classes/room1": true,
  "/classes/room": true
};

// var count = 0;


























