// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


//timestamp API endpoint
app.get("/api/timestamp/", function (req, res) {
  var timestamp = new Date();
  res.json({unix:timestamp.getTime(), utc:timestamp.toUTCString()});
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  var timestamp = '';
  if (req.params.date_string == '')
    timestamp = new Date();
  else
    timestamp = new Date(req.params.date_string);
  
  if (timestamp.getTime() == null)
    timestamp = new Date(parseInt(req.params.date_string));
  
  res.json({unix:timestamp.getTime(), utc:timestamp.toUTCString()});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});