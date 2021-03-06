const express = require('express');
const router = express.Router();
const model = require('../models')
const bcrypt = require('bcrypt-nodejs');
/*eslint-disable  */

/*eslint-unable */
function regPerson(req,res){
    const login = req.body.login;
    const password = req.body.password;
    const reqPassword = req.body.reqPassword;

    if(!login || !password || !reqPassword){
        res.json({
            ok:false,
            error:"Все поля должны быть заполнены",
            fields:['login','passsword','reqPassword']
        });
    }else if(password !== reqPassword){
        res.json({
            ok:false,
            error:"Пароли не совпадают",
            fields:['passsword','reqPassword']
        });
    }else{
        bcrypt.hash(password,null,null,function(err,hash){
            model.User.create({
                login,
                password:hash
            }).then(user=>{
                req.session.userId = user._id;
                req.session.userLogin = user.login;
                res.json({
                    ok:true
                })
            }).catch(err=>{
                res.json({
                    ok:false,
                    error:"Пользователь с таким именем<br> уже существует"
                })
            })
        })
    }
}
function authPerson(req,res){
    const login = req.body.login;
    const password = req.body.password;
    if(!login || !password){
        res.json({
            ok:false,
            error:"Все поля должны быть заполнены",
            fields:['login','passsword']
        })
    }else if(!/^[a-zA-Z0-9]+$/.test(login)){
        res.json({
            ok:false,
            error: "Только латинские буквы и цифры",
            fields:['login']
        }) 
    }else{
        model.User.findOne({
            login
        }).then(user=>{
            if(!user){
              res.json({
                  ok:false,
                  error: "Логин и пароль неверны!",
                  fields:['login','password']
              })  
            }else{
                bcrypt.compare(password,user.password,function(err,result){
                    if(!result){
                        res.json({
                            ok:false,
                            error: "Логин и пароль неверны!",
                            fields:['login','password']
                        })
                    }else{
                        req.session.userId = user._id;
                        req.session.userLogin = user.login;
                        console.log(req.session);
                        res.json({
                            ok:true
                        })
                    }
                })
            }
        }).catch(err=>{
            console.log(err);
        })
    }
}
//post register
router.post('/register',(req,res) => regPerson(req,res));
//post login
router.post('/login',(req,res) =>  authPerson(req,res));
router.post('/archive/:page',(req,res)=>regPerson(req,res));


router.get('/logout', (req,res)=>{
    if(req.session){
        req.session.destroy(()=>{
            res.redirect('/');
        })
    }else{
        res.redirect('/');
    }
})
module.exports = router;