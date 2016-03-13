/*  User Story: 
      I can get the IP address, language and operating system for my browser.
    
    Example output:  
      {"ipaddress":"143.177.24.100","language":"nl","software":"Windows NT 6.1; WOW64; rv:44.0"}
*/

var http = require('http');
var path = require('path');
var express = require("express");

var app = express();
var server = http.createServer(app);

// Get some user info from the request header.
app.get("/", function(req, res) {
  console.log(req.headers);
  // Get the user's IP address
  var ipaddress = req.headers["x-forwarded-for"];
  
  // Get the user's main language
  var language = req.headers["accept-language"].split(",")[0];
  
  // Get information about the user's operating system.
  var software = req.headers["user-agent"].match(/\((.*)\)/)[1];

  res.send({ipaddress: ipaddress, language: language, software: software});
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
