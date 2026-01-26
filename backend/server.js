  const express = require('express');
 const mongoose = require('mongoose');
 const dotenv = require("dotenv");
 dotenv.config();
 const cookieParser = require("cookie-parser");
 const cors = require("cors");
 const path =require("path");
 const authRoute = require('./routes/auth.js');
const productRoute = require('./routes/product.js');
const cartRoute = require("./routes/cart.js") ;
const checkOutRoute = require("./routes/checkOut.js") ;
const orderRoute = require("./routes/paymentVerify.js") ;
 
 const app =express();

app.use(
  cors({
    origin:"https://ecommax-site.onrender.com",
    credentials: true,
  })
);

app.use(cookieParser());
 app.use(express.json());


 mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("mongoDB Connected Sucessfully"))
  .catch((err) => console.error("Mongodb connection error", err.message));


app.use("/api",authRoute)
app.use("/api/products",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/checkout",checkOutRoute);
app.use("/api/payments",orderRoute);
app.use("/Public", express.static(path.join(__dirname, "Public")))

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))