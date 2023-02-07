// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { Timestamp } = require('mongodb');
const res = require('express/lib/response');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get('/api/hello', function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api/:timestamp?', (req, res) => {
  const tstp = req.params.timestamp

  
  if (!tstp) {
    return res.json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString()
    })
  }

  if(isNaN(tstp)) {
    var timestamp = new Date(tstp)
  } else {
    var timestamp = new Date(parseInt(tstp))
  }

  
  if(timestamp.toUTCString() === 'Invalid Date') {
    res.json( {error: 'Invalid Date'} )
  } else {
    return res.json({ 
      unix: timestamp.getTime(),
      utc: timestamp.toUTCString()  
    })
  }
})


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});
