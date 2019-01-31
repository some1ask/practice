
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routes');
const session = require('express-session');
const staticAsset = require('static-asset');
const MongoStore = require('connect-mongo')(session);
//const mocks = require('./mocks');

//database 
mongoose.Promise = global.Promise;
mongoose.set('debug',true);

mongoose.connection
.on('error',error=>console.log(error))
.on('close',()=>console.log("DB connection closed"))
.once('open',()=>{
  const info = mongoose.connections[0];
  console.log(`connected to ${info.host}:${info.port}/${info.name}`);
 //mocks()
});

mongoose.connect(config.MONGO_URL,{useNewUrlParser:true});
//endDb


//sets
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.use(staticAsset(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname ,'public')));
app.use(session({
  secret: config.SESSION_SECRET,
  resave:true,
  saveInitialized:false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}))

//routes



app.use('/api/auth', routes.auth);
app.use('/post', routes.post);
app.use('/', routes.archive);


//errors
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.listen(config.PORT, function () {
  console.log('Example app listening on port '+ config.PORT+ '!');
});