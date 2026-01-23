 import React from 'react'
 import {useEffect} from "react"
  import {Box, TextField, Typography,Container,Paper,Button,CircularProgress} from '@mui/material'
  import {useState} from "react"
  import {Link, useNavigate} from "react-router-dom"
 import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthState } from "./redux/authSlice";
  export default function Register(){

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

   useEffect(() => {
    return () => {
      dispatch(clearAuthState());
    };
  }, [dispatch]);

    //  Redirect to login on successful registration
  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  const handleSubmit = async(e)=>{
   e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    dispatch(registerUser({ username, password, email }));
  }

     return(
   <Container maxWidth ="sm" sx={{mt:6,display:"flex",
    justifyContent:"center",alignItems:"center",
   
   }}>
    <Paper elevation ={3} sx ={{p:2,borderRadius:3,
       backgroundColor:"rgba(255,255,255,0.95)",}}>
    <Typography sx={{textAlign:"center",mt:1}}>
      Signup
    </Typography>
 
    <Box component ="form" onSubmit ={handleSubmit} sx={{display:"flex",flexDirection:"column",alignItems:"center",
       justifyContent:"center",}}>
       <TextField sx={{maxWidth:300,mb:1}} type ="username"
       label="username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}/>

      
       <TextField  sx={{maxWidth:300,mb:1}} type ="Email"
       value={email}
       label ="email"
       onChange={(e)=>setEmail(e.target.value)} />

        <TextField  sx={{maxWidth:300,mb:1}} type ="Password"
       value={password}
       label ="password"
       onChange={(e)=>setPassword(e.target.value)} />

       <TextField  sx={{maxWidth:300}} type ="Password"
       value={confirmPassword}
       label ="confirm password"
       onChange={(e)=>setConfirmPassword(e.target.value)} />
       {error && (<Typography variant ="body2"
       sx={{color:"red",mt:1,textAlign:"center"}}>
         {error}
         </Typography>)}
         {success && (<Typography variant ="body2"
         sx={{color:"green",mt:1,textAlign:"center"}}>
         {success}
         </Typography>)}
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
    "SignUp"
  )}
</Button>


       <Typography variant ="body2">
         Already have an account?{" "}
         <Link to="/login" style={{color:"#2e7d32",textDecoration:"none"}}>
         Login
         </Link>
       </Typography>
     
    </Box>
    </Paper>
 
   </Container>
     )
  }