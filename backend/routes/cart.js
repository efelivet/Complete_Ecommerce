const express = require("express");
const Product =require("../model/productModel");
const Cart = require("../model/cartModel");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/create", verifyToken , async (req, res) => {
  try {
    const userId = req.user.id; 
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array is required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [],
        amount: 0,
      });
    }

    for (const item of products) {
      const { productId, quantity } = item;

      if (!productId || !Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ message: "Invalid product data" });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const existingIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (existingIndex > -1) {
        cart.products[existingIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    // Populate to calculate accurate price
    await cart.populate("products.productId");

    cart.amount = cart.products.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({
      message: "Products added to cart",
      cart,
      amount: cart.amount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================== UPDATE CART ==================
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ message: "Products must be an array" });
    }

    const cart = await Cart.findOne({ userId: req.user.id });

    cart.products = products.map((item) => ({
      productId: item.productId,
      quantity: item.quantity >= 1 ? item.quantity : 1,
    }));

    await cart.save();
     await cart.populate("products.productId");
      cart.amount = cart.products.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );

    await cart.save();

    const updatedCart = await Cart.findOne({
      userId: req.user.id,
    }).populate("products.productId");

    res.status(200).json({
      message: "Cart updated successfully",
      cart: updatedCart,
      amount: cart.amount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update cart" });
  }
});

// ================== DELETE PRODUCT FROM CART ==================
router.delete("/remove/:productId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Remove product
    cart.products = cart.products.filter((p) => !p.productId._id.equals(productId));

    // Recalculate total
    cart.amount = cart.products.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );

    await cart.save();
    const updatedCart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
    res.status(200).json({ cart: updatedCart, amount: cart.amount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Failed to remove product" });
  }
});


// delete entire cart

router.delete("/remove", verifyToken, async (req, res) => {
  try {
    const deletedCart = await Cart.findOneAndDelete({
      userId: req.user.id,
    });

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      message: "Cart deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete cart" });
  }
});


// ================== GET USER CART ==================
router.get("/cart", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Failed to fetch cart" });
  }
});




// ================== GET ALL CARTS (ADMIN) ==================
router.get("/carts", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find().populate("products.productId");
    res.status(200).json(carts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Failed to fetch carts" });
  }
});


module.exports = router;