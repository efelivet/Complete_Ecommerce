 const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    amount: {
      type: Number,
      required: true, // calculated on backend
    },

     totalAmount: { 
      type: Number, required: true 
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["flutterwave"],
      default: "flutterwave",
    },

    paymentRef: {
      type: String, // Flutterwave tx_ref or transaction_id
    },
       // 🏠 DELIVERY ADDRESS (SNAPSHOT)
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String },
      state: { type: String },
      country: { type: String, default: "Nigeria" },
    },

  
    shippingFee: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
