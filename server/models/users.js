

const mongoose =require('mongoose');
const  { Schema } = mongoose;

const userSchema= new Schema({
    Email:String,
    Password:String
});

const User=new mongoose.model('AWT',userSchema);

module.exports=User;