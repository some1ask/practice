/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();
const config = require('../config');

const model = require('../models');

function posts(req,res){
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    const perPage = config.PER_PAGE;
    const page = req.params.page || 1;

    model.Post.find({}).skip(perPage*page - perPage)
    .limit(perPage)
    .then(posts=>{
        model.Post.count().then(count => {
            res.render('index',{
                posts,
                current:page,
                pages: Math.ceil(count / perPage),
                user:{
                    id: userId,
                    login :userLogin
                }
            })
        }).catch(()=>{
            throw new Error("Server Not Found");
        })
    }).catch(()=>{
        throw new Error("Server Not Found");
    })
}

router.get('/', (req,res) => posts(req,res));

router.get('/archive/:page',(req,res)=>posts(req,res));

router.get('/posts/:post',(req,res,next)=>{
    const url = req.params.post.trim().replace(/ + (?= )/g, '');
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    if(!url){
        console.log(err);
    }else{
        model.Post.findOne({
            url
        }).then(post=>{
            if(!post){
                const err = new Error('Not Found');
                err.status = 404;
                next(err);
            }else{
                res.render('post/post',{
                    post,
                    user:{
                        id:userId,
                        login:userLogin
                    }
                })
            }
        })
    }
    
})

module.exports = router;