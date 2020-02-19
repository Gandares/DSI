const express = require('express')
const app = express();
var path = require('path');

app.set('view engine', 'ejs');

app.get('/hello/:name?', function(req, res) {
  var hello = 'Hello ' + (req.params.name) + '!' ;
  res.render('index', {hello: hello});
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
