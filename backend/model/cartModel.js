 const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
   
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      
    },
   products:[
    {
    productId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Product',
      required:true
     },
     quantity:{
      type:Number,
      default:1
      },
      
   },
  ],
   amount:{type:Number,default : 0}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);