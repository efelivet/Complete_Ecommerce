  const mongoose = require("mongoose");

 const userSchema = new mongoose.Schema({
    username:{
    type:"String",
    required:true,
    unique:true,
    trim:true,
    minlength:3,
    maxlength:20,
},

email:{
  type:"String",
  required:true,
},

    password:{
        type:
            "String",
            required:true,
            unique:true,
            minlength:4,
    },
      isAdmin: {
      type: Boolean,
      default: false, // normal users are not admins by default
    },
 },
 {
  timestamps:true
 }
)

  module.exports = mongoose.model("User",userSchema);
  
     