// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date", function(req, res) {
  let date = req.params.date;
  let regDate = /^\d{4}-\d{2}-\d{2}$/;
  let regUnix = /^[0-9]*$/;
  let unix;
  let utc;

  if (date.match(regUnix)) {
    const parseDate = parseInt(date);
    utc = new Date(parseDate).toUTCString();
    res.send({unix: date, utc: utc})
  } else if (!date.match(regDate)) {
    res.send({error: "Invalid Date"});
  } else {
    unix = new Date(date).getTime();
    utc = new Date(unix).toUTCString();
    res.send({unix: unix, utc: utc});
  }
})



// listen for requests
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
