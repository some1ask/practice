const mongose = require('mongoose');
const Schema = mongose.Schema;

const schema = new Schema({
    login:{
        type:String,
        required:[true, 'Login required'],
        unique:true,
        validate:function(v){
            return /\w{5,8}/.test(v);
        },
        message: props=>`From 5 to 8 symbols!`
    },
    password:{
        type:String,
        required:[true,'Password required'],
        validate: function(v){
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/.test(v);
        },
        message: props=>`At least 8 characters`
    }
})

module.exports = mongose.model('User',schema);