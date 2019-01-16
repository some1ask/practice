const mongose = require('mongoose');
const Schema = mongose.Schema;

const schema = new Schema({
    login:{
        type:String,
        required:[true, 'Login required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Password required'],
    }
})

module.exports = mongose.model('User',schema);