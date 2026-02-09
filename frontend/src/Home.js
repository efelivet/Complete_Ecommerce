 import React from "react"
 import {Box} from "@mui/material"
 import {useState, useEffect} from "react";
 import {API} from "./api";
 import NavBar from "./NavBar";
 import Gadget from "./Gadget";
import Slider from "./Slider"
 import GallerySwiper from "./GallerySwiper";
 import PointerSwiper from "./PointerSwiper";

 export default function Home(){
      
const [searchQuery, setSearchQuery] = useState("");

  const [products, setProducts] = useState([]);

     useEffect(() => {
    const fetchProducts = async () => {
      try {
       const res = await API.get("/products/");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

 
  
    const handleCategorySelect = (categoryName) => {
    setSearchQuery(categoryName);
  };
    return(
        <Box>
        <NavBar onSearchChange={setSearchQuery}/>
         <Box sx ={{backgroundColor:"#fff"}}>
            
              <Box sx ={{backgroundColor:"green",p:"2px 8px"}}>
      <Box sx ={{display:"flex",width:"100%",mb:1}}>
        <Box sx ={{width:"20%",display:{xs:"none",md:"flex",
           backgroundColor:"white", height:"260px"}}}>
          <Gadget
           onCategoryClick={handleCategorySelect} 
            />
          </Box>    
   
       <Box sx ={{width:{xs:"100%",md:"70%"}}}>
       <Slider/>
      
        </Box>
    
      </Box>
     
     
      </Box>
            
         <GallerySwiper searchTerm={searchQuery} products={products}/>
         <PointerSwiper  searchTerm={searchQuery} products ={products}/>
         </Box>
        </Box>
    )
 }