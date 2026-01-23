const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  img: { type: String }, // single image file
  categories: [{ type: String, enum: ["men", "women","bags","health", "appliances","electronics", "phones", "office","gaming","computing"] }],
  price: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  size: { type: String },
  color: { type: String },

  // new fields
  reviews: [reviewSchema],
  averageRating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
