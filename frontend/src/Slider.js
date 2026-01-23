import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Pagination, Autoplay, EffectFade} from 'swiper/modules';
import './App.css';
import {API} from './api'
import { BASE_URL } from "./api";
export default function Slider(){

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
    return(
      <div className="instant-carousel-container">
      <Swiper
     
        modules={[Pagination, Autoplay, EffectFade]}
        
     
        slidesPerView={1} 
        loop={true} 
      
        effect={'fade'}
        fadeEffect={{
          crossFade: true,
        }}
        
    
        autoplay={{
          delay: 3000,
          disableOnInteraction: false, 
        }}
        
       
        speed={500}
       
         pagination={{
          clickable: true,
          type: "bullets",
        }}
        
        className="myFadeSwiper" 
      >
         {products.slice(23,26).map((product) => (
          <SwiperSlide key={product._id}>        
            <img
              src={`${BASE_URL}/Public/img/${product.img}`}  
              alt={product.title}
              style={{
                width:"100%",
                height: "250px",
                objectFit: "contain",
              }}
            />         
          </SwiperSlide>
        ))}
    
      </Swiper>
    </div>
    )
}