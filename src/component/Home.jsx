import React, { useEffect, useState } from 'react'

import { Box, Button, CardMedia, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const Home = () => {
  const navigate = useNavigate()
const[userName,setUserName]=useState(null)
console.log(userName)
  const handleLog = () => {
if(userName!==""){
  Swal.fire({
    
    icon: 'success',
    title: `Hello ${userName} Welcome To the MOVIEFLIX`,
    showConfirmButton: true,
  
  })
  navigate('/moviePage')
}else{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Please Enter Your Name',
    // footer: '<a href="">Why do I have this issue?</a>'
  })
}
  }

  return (
    <Box sx={{ background: "rgba(0,0,0,.6)", width: "100%", height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Typography sx={{ color: 'red', fontSize: '4rem', fontWeight: '600',background: "rgba(0,0,0,.6)",fontFamily:'Bebas Neue',borderRadius:'10px' }}>  MOVIEFLIX</Typography>

      <Typography sx={{ color: 'white', fontSize: '3rem', fontWeight: '600' }}>Unlimited movies & TV shows </Typography>
      <Typography sx={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Watch and Enjoy with  MOVIEFLIX </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,.6)', mt: 4 }}>
        <TextField placeholder='Enter Name' type='text' variant="outlined" color="secondary" sx={{ input: { color: 'white' }, color: 'white' }} focused value={userName} onChange={(e)=>{setUserName(e.target.value)}} autoComplete='off'/>
        <Button variant="contained" color='secondary' sx={{ height: '100%' }} onClick={handleLog}>Connect to Us</Button>
      </Box>
      {/* <MoviePage/> */}
    </Box>
  )
}

export default Home