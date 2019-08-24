//1. Import
var express = require('express');
var path = require('path');
var routes = require('./routes/route.js');

//2. Initiate
var app = express();

//3. Configure
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",routes.home);

//4. Listen
var port = process.env.PORT || 8080;
var server = app.listen(port,
    function(request,response)
    {
        console.log("Catch the action at http://localhost:" + port);
    }
);


