/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const model = require('../models');
//post get
router.get('/add', (req,res)=>{
   const userId = req.session.userId;
   const userLogin = req.session.userLogin;

    if(!userId || !userLogin){
        res.redirect('/')
    }else{
        res.render('post/add',{
            user:{
                id:userId,
                login:userLogin
            }
           })
    }

  
})
//post add
router.post('/add', (req,res)=>{

    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    const title = req.body.title.trim().replace(/ + (?= )/g, '');
   const body = req.body.body;
   if(!userId || !userLogin){
    res.redirect('/')
}else{
    if(!title || !body){
        res.json({
            ok:false,
            error: "Все поля должны быть заполнены",
            fields:['title','body']
        })
       }else if(title.length <3 || title.length >64){
            res.json({
                ok:false,
                error: "Длина заголовка от 3 до 64 символов!",
                fields:['title']
        }) 
        }else if(body.length < 3){
            res.json({
                ok:false,
                error: "Текст не менее 3х символов",
                fields:['body']
            }) 
        }else{
            model.Post.create({
                title,
                body,
                owner:userId,
            }).then(post=>{
                console.log(post);
                res.json({
                ok:true
                })
            }).catch(err =>{
                console.log(err);
                res.json({
                    ok:false
                })
            })
       }
}
   
})

module.exports = router;
