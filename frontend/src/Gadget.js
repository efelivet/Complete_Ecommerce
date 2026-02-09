 import React from "react";
 import {Box, Typography} from "@mui/material";
 import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
 import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
 import MedicationLiquidOutlinedIcon from '@mui/icons-material/MedicationLiquidOutlined';
 import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
 import SpeakerOutlinedIcon from '@mui/icons-material/SpeakerOutlined';
 import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
 import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';

 
const categories = [
  { name: "Appliances", icon: <KitchenOutlinedIcon fontSize="small" /> },
  { name: "Phones", icon: <PhoneAndroidOutlinedIcon fontSize="small" /> },
  { name: "Health", icon: <MedicationLiquidOutlinedIcon fontSize="small" /> },
  { name: "Office", icon: <HomeOutlinedIcon fontSize="small" /> },
  { name: "Electronics", icon: <SpeakerOutlinedIcon fontSize="small" /> },
  { name: "Computing", icon: <DvrOutlinedIcon fontSize="small" /> },
  { name: "Gaming", icon: <SportsEsportsOutlinedIcon fontSize="small" /> },
];


 export default function Gadget({onCategoryClick}){

   
    return(
      <Box >
      {categories.map((cat) => (
        <Box
          key={cat.name}
          onClick={() => onCategoryClick(cat.name.toLowerCase())} 
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 0.5,
            cursor: "pointer",
            "&:hover": { color: "green" },
            py: 0.5,
            
          }}
        >
          <Box>{cat.icon}</Box>
          <Typography sx={{ fontSize: "1.2rem", ml: 1 }}>{cat.name}</Typography>
        </Box>
      ))}

      
    </Box>
    )
 }