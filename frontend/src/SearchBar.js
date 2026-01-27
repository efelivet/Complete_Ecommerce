 import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  InputBase,
  Button,
  
  MenuItem,
  Menu,
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { useState } from "react";
import {Link} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from "react-redux";


const drawerWidth = 240;


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function SearchBar({ onSearchChange }) {


const drawerLinks = [
  { text: "Login", path: "/login" },
  { text: "Sign Up", path: "/register" },
];

  const handleInputChange = (event) => {
    onSearchChange(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

   const totalQty = useSelector((state) =>
      state.cart.products.reduce((sum, p) => sum + p.quantity, 0)
    );
 
  const [arrowOpen, setArrowOpen] =useState(false);
  const menuId = 'primary-search-account-menu';
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

     const [active, setActive] = useState(false);
   const handleMenuClose = () => {
    setAnchorEl(null);
    setArrowOpen(false);
  };
  
  const isMenuOpen = Boolean(anchorEl);


  

   const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    
      <MenuItem onClick={handleMenuClose}>
      <Link to ="/register" style={{textDecoration:"none",color:"orange",cursor:"pointer"}}> Sign In</Link>
     
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  
    const handleProfileMenuOpen = (event) => {
      setArrowOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const drawerContent = (
    <Box sx={{ width: drawerWidth }} role="presentation">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Menu</Typography>

        {/* X Close Button */}
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </Toolbar>

      <Divider />

      <List>
        {drawerLinks.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton  component={Link}  to={item.path}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

    </Box>
  );

  
  return (
    <>
      {/* AppBar */}
      <AppBar position="static" sx ={{backgroundColor:"green"}}>
        <Toolbar sx={{display:"flex",width:"100%",flexDirection:{xs:"column",md:"row"}}}>
          <Box sx ={{ display: "flex",
              width: "100%",
              justifyContent:"space-evenly",
              alignItems: "center",
              flexWrap:{xs:"wrap",md:"nowrap"} ,   // 🔥 allows items to move to next line on mobile
              gap: 1,   }}>
          {/* Menu Button */}
          <IconButton
          sx ={{ml:{xs:1,md:"auto"},display:{xs:"flex",md:"none"}}}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
          >
            
             <MenuIcon sx ={{fontSize:"40px"}} />
           
           
          </IconButton>

          <Typography variant="h6" sx={{ ml:{xs:0,md:0},fontSize:{xs:"1rem",md:"2.5rem"} }}>
            LIVESTORE
          </Typography>

     <Box sx ={{display:"flex",height:30}}>
            <Search   sx={{backgroundColor:"orange",display:{xs:"none",md:"flex"}}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
              <StyledInputBase
              placeholder="Search…"
              onChange={handleInputChange}
              inputProps={{ 'aria-label': 'search' }}
            />
             
          </Search>
               
      </Box>
                    <Button
                  
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
             
            >
              <AccountCircle sx={{fontSize:{xs:"1.5rem",md:"2rem"}}} />
            {arrowOpen? <KeyboardArrowUpIcon/>: <KeyboardArrowDownIcon/>}
             
            
            </Button>

            <Box sx ={{position:"relative"}}>
              <Link to ="/checkout" style ={{textDecoration:"none"}}>
            <Button  onClick={() => setActive(!active)}
      sx={{
        display:"flex",
        padding:"0.4rem",
         backgroundColor: active ? "orange" : "white",
        color: active ? "white" : "black",
       
        "&:hover": {
          backgroundColor: active ? "orange" : "#fff3e0", 
        },
      }}>

              <ShoppingCartOutlinedIcon sx ={{fontSize:"large"}}/>
              <Typography sx ={{fontSize:{xs:"0.8rem",md:"1.5rem"}}}>Cart</Typography>
            </Button>
          

           <Box sx ={{position:"absolute", top:-4, right:-1, color:"orange" }}>          
             {totalQty}    
           </Box>
           </Link>
           </Box> 
        </Box>

          <Box>
             <Search sx={{backgroundColor:"orange",width:"100%",mt:{xs:1,md:"auto"},
              display:{xs:"flex",md:"none"}}}>
            <SearchIconWrapper>
              <SearchIcon />    
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
    
          </Search> 
          </Box>
        
        </Toolbar>
          

      </AppBar>

      {renderMenu}

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        {drawerContent}
      </Drawer>

    
    </>
  );
}
