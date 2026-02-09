import * as React from "react";
import {Box,Typography,Button,Paper, TextField} from "@mui/material"
import { useState } from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import NavBar from "./NavBar";
import {useSelector} from "react-redux"
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartQty } from "./redux/cartSlice";
import { useNavigate } from "react-router-dom";
import {API} from './api'
import { BASE_URL } from "./api";
import CircularProgress from '@mui/material/CircularProgress';
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
 const  user  = useSelector((state) => state.auth.user);

 const navigate = useNavigate();
 
   const dispatch = useDispatch();


const handleCheckout = async () => {

if (!user) {
    navigate("/login");
    return;
  }

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
  <NavBar/>
  <Box sx ={{display:"flex",justifyContent:"space-between",gap:2,mt:2,m:1,flexDirection:{xs:"column",md:"row"}}}>
    
<Box sx ={{display:"flex",flex:2,justifyContent:"space-between",gap:1,flexDirection:"column" }}>
  {cart.map((product)=>(
    <Paper key={product.productId._id} elevation={2} >
    <Box sx={{display:"flex",justifyContent:"space-between"}}>
    <Box sx ={{display:"flex",flexDirection:{xs:"colum",md:"row"}}}>  
      <Box >
    <Box> 
      {product.productId?.img ? (
            <img 
              src={`${BASE_URL}/Public/img/${product.productId.img}`} 
              alt={product.productId.title || "product"} 
              style={{ width: 100, height: "100px", objectFit: "contain" }} 
            />
          ) : (
            <Box sx={{ width: 100, height: "100px", bgcolor: "#eee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>
              < CircularProgress/>
            </Box>
          )}
     </Box> 
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
      <Box sx={{color:"orange",fontSize:"1rem"}}>remove</Box>
      </Button>
    </Box> 
    </Box>
    <Box sx={{fontSize:"1rem"}}>{product.productId.desc} </Box> 
    </Box>  
  <Box sx ={{display:"flex",flexDirection:"column",alignItems:"center"}}>
    <Typography >${product.productId?.price ? product.productId.price.toLocaleString() : "0.00"}</Typography>
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
     <Typography sx={{fontSize:"1rem"}}>
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
  </Box> 
  </Paper>
  ))}

 
 </Box> 

 <Box sx ={{flex:1}}>
 <Box sx={{display:"flex",justifyContent:"center"}}>
  <Paper elevation={2} >
     <Typography variant="h6" sx={{textAlign:"center",fontSize:{xs:"1rem",md:"2"},color:"orange"}} >Shipping Address</Typography>
<form style ={{display:"flex",flexDirection:"column",padding:4,}}>
  <TextField  label="Full Name" sx={{marginBottom:0.5, }}
    size="small"
    fullWidth
    value={shipping.fullName}
    onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
  />

  <TextField  label="Phone"  sx={{marginBottom:0.5}}
    size="small"
    fullWidth
    value={shipping.phone}
    onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
  />

  <TextField  label="Address"  sx={{marginBottom:0.5}}
    size="small"
    fullWidth
    value={shipping.address}
    onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
  />

  <TextField  label="City"  sx={{marginBottom:0.5}}
    size="small"
    fullWidth
    value={shipping.city}
    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
  />

  <TextField  label="State" sx={{marginBottom:0.5}}
    size="small"
    fullWidth
    value={shipping.state}
    onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
  />
  </form>
  <Box sx={{display:"flex",justifyContent:"center",flexDirection:"column",mt:{xs:2,md:1}}}>
  <Typography sx={{textAlign:"center",fontSize:"1.2rem"}}>CART SUMMARY</Typography>
  <Typography  sx={{textAlign:"center",fontSize:"1rem"}}>subtotal ${amount}</Typography>
  <Button
  variant="contained"
  sx={{ margin: 2,bgcolor:"orange"}}
  onClick={handleCheckout}
  disabled={loading || cart.length === 0}
>
 {loading ? "Processing..." : "Checkout"}
</Button>
{!user && (
   <Typography sx={{ color: "red", fontSize: 10, textAlign: "center" }}>
                  * Login required to checkout
   </Typography>
              )}
</Box>
  </Paper>
 </Box>
 </Box>
  </Box>
       
  </>)
}
        
 

export default Checkout;
