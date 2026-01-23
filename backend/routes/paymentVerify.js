 const express = require('express');
 const router = express.Router();
 const axios = require("axios");
 const Order = require("../model/orderModel");
 const {
   verifyToken
 } = require("./verifyToken.js");

router.post("/flutterwave/verify", verifyToken, async (req, res) => {
  const { transaction_id, tx_ref } = req.body;

  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    if (
      response.data.status === "success" &&
      response.data.data.tx_ref === tx_ref &&
      response.data.data.status === "successful"
    ) {
    
      await Order.findOneAndUpdate(
        { paymentRef: tx_ref },
        {status: "paid" }
      );

      return res.status(200).json({ message:response.data.data });
    }

    res.status(400).json({ message:response.data.data });
    console.log(response)
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
});


module.exports = router;