var express = require("express");
var app = express();
const api = require('./api')

//create a server object:
app.set('view engine', 'ejs')

app.get("/", function(req, res) {
  res.render("index");
});

app.get('/results', function(req, res){
    var convert = req.query.convert;

    api.query(`${convert}`, "FahrenheitToCelsiusResult")
    .then(xmlResult => 
        res.render('results', {data: xmlResult}));
});


app.listen(process.env.PORT || 8080, process.env.IP, function() {
  console.log("Server is listening on http://localhost:8080");
});