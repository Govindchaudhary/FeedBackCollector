const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:String,
    profile:String,
    googleId:String,
    credits:{type:Number,default:0}

});

mongoose.model('users',userSchema);