const express = require('express');
const router = express.Router();
const model = require('../models')
const bcrypt = require('bcrypt-nodejs');
/*eslint-disable  */

/*eslint-unable */


router.post('/register',(req,res) => {
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
                res.json({
                    ok:true
                })
            }).catch(err=>{
                res.json({
                    ok:false,
                    error:"Попробуйте позже"
                })
            })
        })
    }
});

module.exports = router;