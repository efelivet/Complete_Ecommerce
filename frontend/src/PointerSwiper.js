import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {Link} from "react-router-dom"
import { BASE_URL } from "./api";
import "swiper/css";
import "swiper/css/navigation";
import "./PointerSwiper.css";
import { Navigation, FreeMode } from "swiper/modules";



export default function PointerSwiper({ products, searchTerm }) {

  


 const filteredProducts = products.filter((product) => {
  const term = searchTerm.toLowerCase();

  
  const matchesTitle = product.title.toLowerCase().includes(term);

  const matchesCategory = product.categories?.some(cat => 
    cat.toLowerCase() === term
  );

 
  return matchesTitle || matchesCategory;
}).slice(16, 28);
  return (
    <Swiper
      modules={[Navigation, FreeMode]}
      navigation={true}
      freeMode={true}
      grabCursor={true}
      slidesPerView="auto"
      spaceBetween={4}
      freeModeMomentum={true}
    >
      {filteredProducts.map((product, index) => (
        <SwiperSlide
          key={index}
          style={{
            width: "180px", 
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
          
          }}
       
        >
          <div className="image-wrapper">
          <Link to ={`singleproduct/${product._id}`}>
     
             
            <img
              src={`${BASE_URL}/Public/img/${product.img}`} alt={product.alt} 
         
             className="gallery-image"
            />
          
           <div style={{color:"orange",fontSize:14,textAlign:"center"}}>{product.title}</div>
       
         </Link>
         </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
