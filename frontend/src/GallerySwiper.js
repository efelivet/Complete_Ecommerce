import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import {Link} from "react-router-dom"
import {Box} from "@mui/material"
import "./App.css"

import { BASE_URL } from "./api";

export default function GallerySwiper({ searchTerm, products }) {

  
 const filteredProducts = products.filter((product) => {
  const term = searchTerm.toLowerCase();

  
  const matchesTitle = product.title.toLowerCase().includes(term);

 
  const matchesCategory = product.categories?.some(cat => 
    cat.toLowerCase() === term
  );

 
  return matchesTitle || matchesCategory;
}).slice(0, 15);
  return (
    <Swiper
      
      modules={[Navigation]}
      
      slidesPerView={4}
      
      slidesPerGroup={3}
      
      spaceBetween={4} 
      
      navigation={true} 
      
      pagination={false} 
       speed={1000}  
      loop={false} 
       rewind={true} 
      key={filteredProducts.length} 
    >
      {filteredProducts.map((product) => (
        <SwiperSlide key={product._id}>
          <div className="image-wrapper">
            <Link to ={`singleproduct/${product._id}`}>
        <img src={`${BASE_URL}/Public/img/${product.img}`} alt={product.alt} 
          className="gallery-image" />
            <Box sx={{textAlign:"center",color:"orange",mb:2,
              fontSize:{xs:8,md:14}}}>{product.title}</Box>
            </Link>
           
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}