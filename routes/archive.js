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

    model.Post.find({})
    .skip(perPage*page - perPage)
    .limit(perPage)
    .populate('owner')
    .sort({
        createdAt:-1
    })
    .then(posts=>{
        model.Post.count().then(count => {
            res.render('archive/index',{
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
    const login = req.params.login;
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

//users posts
router.get('/users/:login/:page*?',(req,res)=>{
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;

    const perPage = config.PER_PAGE;
    const page = req.params.page || 1;
    const login = req.params.login;

    model.User.findOne({
        login
    }).then(user=>{
        console.log(user);
        model.Post.find({
            owner: user.id
        })
        .skip(perPage*page - perPage)
        .limit(perPage)
        .sort({
            createdAt:-1
        })
        .then(posts=>{
        model.Post.count({
            owner: user.id
        }).then(count => {
            res.render('archive/user',{
                posts,
                _user: user,
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
    })

  
});


module.exports = router;