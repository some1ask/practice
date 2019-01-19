
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routes');
//const Announcement = require('./models/announcement');
//database 
mongoose.Promise = global.Promise;
mongoose.set('debug',true);

mongoose.connection
.on('error',error=>console.log(error))
.on('close',()=>console.log("DB connection closed"))
.once('open',()=>{
  const info = mongoose.connections[0];
  console.log(`connected to ${info.host}:${info.port}/${info.name}`);
});

mongoose.connect(config.MONGO_URL,{useNewUrlParser:true});
//endDb


//sets
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname ,'public')));


//routes
app.listen(config.PORT, function () {
      console.log('Example app listening on port '+ config.PORT+ '!');
    });
app.get('/', function (req, res) {
  res.render('index');
});
app.use('/api/auth', routes.auth)


module.exports = app;