import React, { useEffect, useState } from 'react'

import { Box, Button, CardMedia, Dialog, DialogTitle, List, ListItem, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AccountCircle, Visibility } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
const Home = () => {
  const navigate = useNavigate()
  const[openDialog,setOpenDialog]=useState(false)
 const[isloaged,setIsLoged]=useState(false)
const[registerEmail,setRegisterEmail]=useState("")

const[registerPassword,setRegisterPassword]=useState("")
const[loginEmail,setLogInEmail]=useState('')
const[loginPass,setLoginPass]=useState('')
const[user,setUser]=useState({})
console.log(user)

useEffect(() => {
  // Set up the listener once when the component mounts
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // Clean up the listener when the component unmounts
  return () => {
    unsubscribe();
  };
}, []); 

  const registerUser=async()=>{
try {
  const res=await createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
  console.log(res)
  navigate(`/moviePage`)
} catch (error) {
  
  console.log(error.message)
}
  }

  const logInUser=async()=>{
    try {
      const res=await signInWithEmailAndPassword(auth,loginEmail,loginPass)
      console.log(res)
      navigate(`/moviePage`)
      
    } catch (error) {
      
      console.log(error.message)
    }
  }





const handleLog=()=>{
console.log('heloo')
  if(!user?.email){
    setOpenDialog(true)
  

  }else{
    Swal.fire({
    
      icon: 'success',
       title: `Hello  Welcome To the MOVIEFLIX`,
       showConfirmButton: true,
       
      })
      navigate(`/moviePage`)
  }
 

}


const loginPage=()=>{
  setIsLoged(true)
}
const handleClose=()=>{
  setOpenDialog(false)
}

const logOut=async()=>{
await signOut(auth)
}
  return (
    <Box sx={{ background: "rgba(0,0,0,.6)", width: "100%", height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography sx={{ color: 'red', fontSize: '4rem', fontWeight: '600',background: "rgba(0,0,0,.6)",fontFamily:'Bebas Neue',borderRadius:'10px' }}>  MOVIEFLIX</Typography>

      <Typography sx={{ color: 'white', fontSize: '3rem', fontWeight: '600' }}>Unlimited movies & TV shows </Typography>
      <Typography sx={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Watch and Enjoy with  MOVIEFLIX </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,.6)', mt: 4 }}>
        <Button variant="contained" color='secondary' sx={{ height: '100%',fontSize:'600' }} onClick={handleLog}>Connect to Us</Button>
      </Box>

      {
        isloaged ?
        <Dialog onClose={handleClose} open={openDialog}>
         <DialogTitle sx={{ textAlign:'center',backgroundColor:'DodgerBlue' ,color:'white',fontWeight:600 }}>Sign in</DialogTitle>
        <List sx={{ pl:2 ,pr:2 ,textAlign:'center'}}>
        
          
       
          <ListItem disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Email" variant="standard" value={loginEmail} onChange={(e)=>setLogInEmail(e.target.value)}  />
        </Box>
          </ListItem>
          <ListItem disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Password" variant="standard" value={loginPass} onChange={(e)=>setLoginPass(e.target.value)} />
          {/* <Visibility sx={{ color: 'action.active', mr: 1 }} /> */}
        </Box>
          </ListItem>
  
  <Button variant='outlined' color='secondary' onClick={logInUser}sx={{marginTop:'1rem'}}>Log in</Button>
        </List>
        </Dialog>
        :
        <Dialog onClose={handleClose} open={openDialog}>
        <DialogTitle sx={{ textAlign:'center',backgroundColor:'DodgerBlue' ,color:'white',fontWeight:600 }}>Register User</DialogTitle>
        <List sx={{ pl:2 ,pr:2 ,textAlign:'center',  }}>
        
          
       
          <ListItem disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Email" variant="standard" value={registerEmail} onChange={(e)=>setRegisterEmail(e.target.value)}  />
        </Box>
          </ListItem>
          <ListItem disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Password" variant="standard" value={registerPassword} onChange={(e)=>setRegisterPassword(e.target.value)} />
          {/* <Visibility sx={{ color: 'action.active', mr: 1 }} /> */}
        </Box>
          </ListItem>
  
  <Button variant='outlined' color='secondary' onClick={registerUser}sx={{marginTop:'1rem'}}>Create Account</Button>
  <Typography onClick={loginPage} sx={{fontSize:".8rem",color:"blue",textAlign:'center',cursor:'pointer',marginTop:'1rem'}}>Already have an account</Typography>
        </List>
        </Dialog>
      }
   
  <LogoutIcon  onClick={logOut}  sx={{position:'absolute',right:'2rem',bottom:"0" ,fontSize:"3rem",color:'white',cursor:'pointer'}}/>
    </Box>
  )
}

export default Home