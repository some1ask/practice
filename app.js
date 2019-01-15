
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Announcement = require('./models/announcement');

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/', function (req, res) {
  //res.render('index');
  Announcement.find({}).then(announcement=>{
    res.render('index',{announcements:announcement});
  })
});

app.get('/post',function(req,res){
  res.render('post');
})
app.post('/post',function(req,res){
  const {title,body} = req.body;

  Announcement.create({
    title:title,
    body:body
  }).then(announcement=>console.log(announcement._id));

  res.redirect('/');
})

module.exports = app;