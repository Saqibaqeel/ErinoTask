const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
       
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    company:{
        type:String,
        required:true,

    },
    jobTitle: {
        type: String,
        required:true,
    },
    
});
 const User=mongoose.model('User',userSchema);
 module.exports=User;