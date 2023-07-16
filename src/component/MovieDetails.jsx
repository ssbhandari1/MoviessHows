import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchMovieOrShow, removeMovieShow } from '../features/sllice/moivesSlice'
import { Box, Button, CardMedia, Grid, Paper, Stack, Typography, selectClasses } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StarIcon from '@mui/icons-material/Star';
const MovieDetails = () => {
  const dispatch=useDispatch()
  const {id}=useParams()
  console.log(id)
const selectedMoviesShow=useSelector((state)=>state.movies.selectMovieShow)
console.log(selectedMoviesShow)
  useEffect(()=>{
    dispatch(fetchMovieOrShow(id))
    return(()=>{
      dispatch(removeMovieShow())
    })
  },[dispatch,id])
  return (
   <Box sx={{width:'100%',height:'100%',backgroundColor:'black'}}>
  
<Box sx={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'space-around'}}>
<Paper elevation={20} sx={{width:'300px',height:'400px',background:"white"}}>
<CardMedia
        component="img"
     
        image={selectedMoviesShow.Poster}
        alt="movie"
        sx={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'5px'}}
      />
</Paper>

<Paper  elevation={20} sx={{width:'50%',height:'80%',background:"rgba(0,0,0)",padding:'0 1rem',}}>
  <Stack sx={{backgroundColor:'transparent',width:'100%',height:'100%' ,display:"flex",flexDirection:'column',justifyContent:'space-evenly',color:'white'}}>
<Typography sx={{fontFamily:'oblique',fontSize:'2rem',fontWeight:'bold' ,color:"yellowgreen"}}>{selectedMoviesShow.Title}</Typography>
<Stack direction='row' gap='1rem' alignItems='center' sx={{}}>  <Typography sx={{fontWeight:'600'}}>{selectedMoviesShow.Year} </Typography>.<Typography sx={{fontWeight:'600'}}>{selectedMoviesShow.Runtime}</Typography>.<Typography sx={{fontWeight:'600'}}>{selectedMoviesShow.Language}</Typography></Stack>
<Typography >{selectedMoviesShow.Plot}</Typography>
<Typography sx={{fontWeight:'600'}}> {selectedMoviesShow.Genre} | {selectedMoviesShow.Type} | imbd Rating : {selectedMoviesShow.imdbRating}<StarIcon sx={{color:"yellow"}}/></Typography>
<Button variant='contained'  ><PlayCircleIcon sx={{color:'black',marginRight:'1rem'}}/> Watch now</Button>
</Stack>
</Paper>
</Box>
 

   </Box>
  )
}

export default MovieDetails