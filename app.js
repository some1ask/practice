
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
//const Announcement = require('./models/announcement');

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname ,'public')));



app.get('/', function (req, res) {
  res.render('index');
});


module.exports = app;