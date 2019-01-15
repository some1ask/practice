const app = require('./app');
const database = require('./db');
const config = require('./config')

database().then(info=>{
console.log(`connected to ${info.host}:${info.port}/${info.name}`);
app.listen(config.PORT, function () {
    console.log('Example app listening on port '+ config.PORT+ '!');
  });
}).catch(()=>{
    console.error("Unable ");
    //process.exit(1);
});

