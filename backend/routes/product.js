const express = require("express");
const Product = require("../model/productModel");
const multer = require('multer')
const path = require('path')

const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("./verifyToken");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'Public/img')
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})
const upload =multer({
  storage
})
  
 
router.post("/create" ,verifyTokenAndAdmin,upload.single('img'),async(req,res)=>{

  const{title,desc,categories,size,color,price,inStock,img} = req.body;

 if(!req.file)return res.status(400).json({message:"please upload an image "})

  const productData = {
    title,
    desc,
    categories,
    size,
    color,
    price,
    inStock,
    img: req.file.filename
  }
 const product = new Product(productData)
 try{
    const savedProduct = await product.save()
    res.status(201).json(savedProduct)
}catch(err){res.status(500).json(err)
}
});


//GET ALL PRODUCTS

router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const qSearch = req.query.search;
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await Product.find({
          category: {
            $in: [qCategory],
          },
        });
      }else if (qSearch) {
     
      products = await Product.find({
        title: { $regex: qSearch, $options: "i" }
      });
    }
       else {
        products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post("/:id/review", verifyToken, async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Add review
    product.reviews.push({
      userId: req.user.id,
      rating,
      comment
    });

    // Recalculate average rating
    const total = product.reviews.reduce((acc, r) => acc + r.rating, 0);
    product.averageRating = total / product.reviews.length;

    await product.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err); 
    
  }
});

module.exports = router;