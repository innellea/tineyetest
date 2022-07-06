var express = require('express');
var cors = require('cors');
const fs = require('fs');
var app = express();
const port = 1314;

require('dotenv').config();
// console.log( process.env );

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.post('/tineye', (req, res) => {
  console.log(req.body.url);

  var TinEye = require('tineye-api');
  var params = {
    offset: 0,
    limit: 10,
    sort: 'score'
  };
  var api = new TinEye(
    'https://api.tineye.com/rest/',
    '6mm60lsCNIB,FwOWjJqA80QZHh9BMwc-ber4u=t^'
  );

  api
    .searchUrl(req.body.url, params)
    .then((response) => response)
    .then((data) => {
      console.log(req.body);
      res.send(data);
    })
    .catch(function (error) {
      output = error;
      console.log(error);
    });
  // res.end();
});

app.get('/', function (req, res) {
  res.send({
    title: 'Welcome to TinEye',
    test: 'Success, the server is running'
  });
});

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log('Server listening on port ', port);
});
