
const express = require("express");
const router = express.Router();
const axios = require("axios"); 


const Cart = require("../model/cartModel");
const Order = require("../model/orderModel");


const { verifyToken } = require("./verifyToken");


const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

if (!FLUTTERWAVE_SECRET_KEY) {
  console.error("FLUTTERWAVE_SECRET_KEY is not set in environment variables!");
}


router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress } = req.body;

  
    if (!shippingAddress ) {
      return res.status(400).json({
        message: "Shipping addresses is required",
      });
    }

   
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

   
    const amount = cart.products.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);

    const shippingFee = amount >= 50000 ? 0 : 30; 
    const totalAmount = amount + shippingFee;


    let order = await Order.findOne({
      userId,
      status: "pending",
    });

    if (!order) {
      order = new Order({
        userId,
        products: cart.products.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
        amount,
        shippingFee,
        totalAmount,
        shippingAddress,     
        status: "pending",
        paymentMethod: "flutterwave",
      });
    } else {
      
      order.products = cart.products.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));
      order.amount = amount;
      order.shippingFee = shippingFee;
      order.totalAmount = totalAmount;
      order.shippingAddress = shippingAddress;
    
    }

    await order.save();

   
    const tx_ref = `order-${order._id}-${Date.now()}`;


    const paymentPayload = {
      tx_ref,
      amount: totalAmount,
      currency: "NGN",
      redirect_url: "http://localhost:3000/paymentsuccess", 
      customer: {
        email: req.user.email,
        name: req.user.username || req.user.email.split("@")[0],
        
      },
      meta: {
        orderId: order._id.toString(),
        userId: userId.toString(),
      },
      customizations: {
        title: "TEST MODE: Use Card 4187 4274 1556 4246 | CVV: 828 | Pin: 3310 | Exp:09/32",
     
        // logo: "https://yourstore.com/logo.png", 
      },
    };

  
    order.paymentRef = tx_ref;
    await order.save();

   
    const flutterwaveResponse = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      paymentPayload,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = flutterwaveResponse.data;

    if (responseData.status !== "success") {
      order.status = "failed";
      await order.save();
      return res.status(500).json({
        message: "Failed to initiate payment with Flutterwave",
        details: responseData,
      });
    }

    res.status(200).json({
      message: "Checkout initiated successfully",
      paymentLink: responseData.data.link,
      orderId: order._id,
      totalAmount: totalAmount,
      tx_ref: tx_ref,
    });
  } catch (error) {
   console.error("Checkout Error:", error.response?.data || error.message);

   
    res.status(500).json({
      message: "Checkout failed. Please try again.",

    });
  }
});

module.exports = router;