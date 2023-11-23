const mongoose = require('mongoose')
const validator = require('validator')

const Myschema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    statut:{type:String}
})

const User = mongoose.model("User",Myschema)
module.exports= User