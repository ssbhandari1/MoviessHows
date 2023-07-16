import React, { useEffect } from 'react'
import './App.css'

import { Box, CardMedia } from '@mui/material'
import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import MoviePage from './component/MoviePage'
import MovieDetails from './component/MovieDetails'
import Loading from './component/Loading'
import poster from './assets/poster.jpg'
const App = () => {


  return (
 <Box sx={{width:'100%',height:'100vh',}}>
    <CardMedia
        component="img"
     
        image={poster}
        alt="poster"
        sx={{width:'100%',height:'100%',objectFit:'cover',position:'absolute',zIndex:'-1'}}
      />
  <Navbar/>
  <Box sx={{width:'100%',height:'90vh',}}>
<Routes>
  <Route path="/" element={<Home/>} />
  <Route path='/moviePage' element={<MoviePage/>}/>
  <Route path='/loading' element={<Loading/>}/>

  <Route path='/movieDetails/:id' element={<MovieDetails/>}/>
</Routes>
  </Box>
 </Box>
  )
}

export default App