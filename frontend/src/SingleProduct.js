import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Box,Typography,Button} from "@mui/material"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CircularProgress from '@mui/material/CircularProgress';

import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";
import {API} from "./api";
import { BASE_URL } from "./api";
export default function SingleProduct(){
   
   const { id } = useParams();
  const [product, setProduct] = useState(null);
   const [quantity, setQuantity] = useState(1);


   const dispatch = useDispatch();

    useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

 
  
  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
  dispatch(
  addToCart({
    productId: product._id,
    quantity,
    price: product.price,
  })
);

  };
 if (!product) return <p style={{display:"flex",justifyContent:"center"}}><CircularProgress/></p>;
  return(
  <>
  <SearchBar/>

   <Box sx={{display:"flex",justifyContent:"space-evenly",mt:4}}>
   
       <Box sx ={{maxWidth:{xs:150,md:250}}}>
        <img src ={`${BASE_URL}/Public/img/${product.img}`} alt =""
         style ={{width:"100%",height:"auto",objectFit:"cover"}} />
       </Box>
       <Box>
        <Typography sx ={{mt:{xs:4,md:6}}}>
        {product.title}
        </Typography>
        <Typography sx ={{mt:{xs:1,md:2}}}>
        {product.desc}
        </Typography>
        <Typography sx ={{mt:{xs:1,md:2}}}>
         {product.price}
        </Typography>
 
        <Box sx={{width:"100%",mt:2}}>
             <Box  variant ="contained" sx ={{display:"flex", backgroundColor:"orange",
              width:{xs:100,md:300}, alignItems:"center", }} >
                <Box >
                   <ShoppingCartOutlinedIcon sx ={{fontSize:"medium",ml:"8px",
                   }}/> 
                </Box>
             
    <Button  onClick={handleAddToCart} 
    sx ={{fontSize:"10px",margin:"auto",
    textTransform:'none'}} >
               Add to Cart
    </Button>
                 
             </Box> 
        
  <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",mt:1}}>
        <button style={{width:20}}
          aria-label="Decrement value"
          onClick={decrease}
        >
          -
        </button>
         <span style={{margin:5}}>{quantity}</span>

              <button style={{width:20}}
          aria-label="Increment value"
          onClick={increase}
        >
          +
        </button>
    </Box>
        </Box>
       
  
        </Box>
        </Box>
       
  </>)
}
        
 