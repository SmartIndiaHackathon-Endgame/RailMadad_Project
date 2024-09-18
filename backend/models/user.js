const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requires:true
    },
    numbers:{
        type:Array,
        default:[],
        required:true
    }
})

const User=mongoose.model('User',userSchema)