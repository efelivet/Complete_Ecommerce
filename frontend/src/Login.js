  import React from 'react'

 import {Box, TextField, Typography,Container,Paper,Button, CircularProgress} from '@mui/material'

 import {useState} from 'react';
import { Link, useNavigate} from "react-router-dom";
import { loginUser, clearAuthState } from "./redux/authSlice";
import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"

 export default function Login(){

    const { loading, error, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
     const dispatch = useDispatch();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
  
  
  
 
  useEffect(() => {
    return () => {
      dispatch(clearAuthState());
    };
  }, [dispatch]);

  //  Redirect after successful login
  useEffect(() => {
    if (user) {
      navigate("/"); // "/homepage"
    }
  }, [user,navigate]);

   const handleSubmit = async (e) => {
    e.preventDefault();
  
    dispatch(loginUser({ username, password}));
  };

    return(

  <Container maxWidth ="sm" sx={{mt:10,display:"flex",
   justifyContent:"center",alignItems:"center",
  
  }}>
   <Paper elevation ={3} sx ={{p:2,borderRadius:3,
      backgroundColor:"rgba(255,255,255,0.95)",}}>
   <Typography sx={{textAlign:"center",m:2}}>
      Login to your Account
   </Typography>

   <Box   component="form"  onSubmit={handleSubmit} sx={{display:"flex",flexDirection:"column",alignItems:"center",
      justifyContent:"center",}}>
      <TextField sx={{maxWidth:300, mb:1}} type ="username" placeholder ="username" 
       value={username}
       onChange={(e) => setUsername(e.target.value)}
      />
      <TextField  sx={{maxWidth:300,mb:1}} type ="Password" placeholder ="password" 
       value={password}
       onChange={(e) => setPassword(e.target.value)}
      />
   

       {error && (
            <Typography
              variant="body2"
              sx={{ color: "red", mt: 1, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}

        
     <Button
  type="submit"
  variant="contained"
  fullWidth
  sx={{
    mt: 3,
    backgroundColor: "#1976d2",
    "&:hover": { backgroundColor: "#539ce6ff" },
    borderRadius: 2,
    py: 1.2,
    height: 42,
    position: "relative",
    textTransform: "none",
    fontWeight: 500,
  }}
  disabled={loading}
>
  {loading ? (
    <>
    
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#1976d2",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          size={22}
          thickness={5}
          sx={{
            color: "#fff",
          }}
        />
      </Box>
    </>
  ) : (
    "Login"
  )}
</Button>

   </Box>
   <Typography variant='body2' align='center' sx={{mt:2}}>
    Don't have an account?{" "}
    <Link to="/register">Register</Link>
   </Typography>
  
   </Paper>

  </Container>
    )
 }