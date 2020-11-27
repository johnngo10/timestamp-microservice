// server.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
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

app.get("/api/timestamp", function(req, res) {
  let utc = new Date().toUTCString();

  res.json({unix: Date.now(), utc: utc});
})

app.get("/api/timestamp/:date_string", function(req, res) {
  const date = req.params.date_string;
  const regUnix = /^[0-9]*$/;
  let utc;
  let dateObject = new Date(date);

  if (date.match(regUnix)) {
    const parseDate = parseInt(date);
    utc = new Date(parseDate).toUTCString();
    res.json({unix: parseDate, utc: utc});
  } else if (dateObject.toString() === "Invalid Date") {
    res.json({error: "Invalid Date"});
  } else {
    res.json({unix: dateObject.valueOf(), utc: dateObject.toUTCString()});
  }
})



// listen for requests
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
