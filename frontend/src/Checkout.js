import * as React from "react";
import {Box,Typography,Button,Paper} from "@mui/material"
import { useState } from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchBar from "./SearchBar";
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartQty } from "./redux/cartSlice";
import {API} from './api'
import { BASE_URL } from "./api";
const Checkout =() =>{
   
const [loading, setLoading] = useState(false);
const [shipping, setShipping] = useState({
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
});


  const cart = useSelector((state) => state.cart.products);
 const amount = useSelector((state) => state.cart.amount);
 
   const dispatch = useDispatch();


const handleCheckout = async () => {
     if (!shipping.fullName || !shipping.address || !shipping.phone) {
  alert("Please fill in all shipping details");
  setLoading(false);
  return;
}
 
  setLoading(true);
  try {
    const res = await API.post(
      "/checkout/create",
      {
        shippingAddress: shipping,
        
      },
      { withCredentials: true }
    );

    // Redirect user to Flutterwave
    window.location.href = res.data.paymentLink;

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Checkout failed");
  }
};

  
  return(
  <>
  <SearchBar/>
  <Box sx ={{display:"flex",justifyContent:"space-between",gap:2,mt:2,flexWrap:{xs:"wrap",md:"nowrap"},}}>
    
<Box sx ={{display:"flex", flex:{xs:1,md:2},justifyContent:"space-between",gap:2,flexDirection:"column" }}>
  {cart.map((product)=>(
    <Paper key={product.productId._id} elevation={2} sx ={{display:"flex",flexDirection:{xs:"column",md:"row"},gap:{xs:1,md:10}}}>
    <Box sx ={{display:"flex",flexDirection:{xs:"colum",md:"row"}}}>  
      <Box >
    <Box>  <img src ={`${BASE_URL}/Public/img/${product.productId.img}`} alt =""
         sx ={{width:{xs:"100px",md:"100%"},height:"100px",objectFit:"contain"}} /></Box> 
    <Box sx ={{display:"flex"}}>
      <Button  onClick={() =>
    dispatch(
      removeFromCart({
        productId: product.productId._id,
        price: product.productId.price,
      })
    )
  }>
      <Box><DeleteOutlineOutlinedIcon sx={{color:"orange"}}/></Box>
      <Box sx={{color:"orange",fontSize:10}}>remove</Box>
      </Button>
    </Box> 
    </Box>
    <Box>{product.productId.desc} </Box> 
    </Box>  
  <Box sx ={{display:"flex",flexDirection:"column",alignItems:"center"}}>
    <Typography >${product.productId.price}</Typography>
  <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
   <Button  onClick={() =>
      dispatch(
        updateCartQty({
          productId: product.productId._id,
          quantity:
            product.quantity - 1 < 1 ? 1 : product.quantity - 1,
        })
      )
    }>
    -
   </Button>
     <Typography >
    {product.quantity}
     </Typography>
   <Button  onClick={() =>
      dispatch(
        updateCartQty({
          productId: product.productId._id,
          quantity: product.quantity + 1,
        })
      )
    }>
    +
   </Button>
  </Box>
  </Box>
  </Paper>
  ))}

 
 </Box> 

 <Box sx ={{flex:{xs:1,md:2}}}>
 <Box sx={{display:"flex",justifyContent:"center"}}>
  <Paper elevation={2} >
     <Typography variant="h6" sx={{textAlign:"center",fontSize:{xs:15,md:20},color:"orange"}} >Shipping Address</Typography>
<form style ={{display:"flex",flexDirection:"column"}}>
  <input placeholder="Full Name" 
    value={shipping.fullName}
    onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
  />

  <input placeholder="Phone"
    value={shipping.phone}
    onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
  />

  <input placeholder="Address"
    value={shipping.address}
    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
  />

  <input placeholder="City"
    value={shipping.city}
    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
  />

  <input placeholder="State"
    value={shipping.state}
    onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
  />
  </form>
  <Box sx={{display:"flex",justifyContent:"center",flexDirection:"column",mt:{xs:2,md:1}}}>
  <Typography sx={{textAlign:"center"}}>CART SUMMARY</Typography>
  <Typography  sx={{textAlign:"center"}}>subtotal ${amount}</Typography>
  <Button
  variant="contained"
  sx={{ margin: 2,bgcolor:"orange"}}
  onClick={handleCheckout}
  disabled={loading || cart.length === 0}
>
 {loading ? "Processing..." : "Checkout"}
</Button>
</Box>
  </Paper>
 </Box>
 </Box>
  </Box>
       
  </>)
}
        
 

export default Checkout;
