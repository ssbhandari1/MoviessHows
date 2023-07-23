import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchMovieApi, fetchShowsApi } from '../features/sllice/moivesSlice'
import { Box, Button, CardMedia, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { posters } from '../common/Images'
import ErrorIcon from '@mui/icons-material/Error';






const MoviePage = () => {


  const [selectMovieShow,setSlected]=useState('')
  const movieText = 'Harry';
  const seriestext = 'friend'
  const navigate = useNavigate()
  const state = useSelector((state) => state.movies)
  console.log(state)

  // console.log(selectMovieShow)
const handleSelectMovieshow=(e)=>{
  setSlected(e.target.value)
 
}
const handleAllSearchMovies=()=>{
  dispatch(fetchMovieApi(selectMovieShow))
  dispatch(fetchShowsApi(selectMovieShow))
  setSlected('')
}

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchMovieApi(movieText))
    dispatch(fetchShowsApi(seriestext))
  }, [dispatch])


  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <Box sx={{ backgroundColor: 'black', width: '100%', height: "90vh", overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>


      <Grid container xs={12} sx={{ backgroundColor: 'transparent', width: '100%', height: '100%', display: 'flex', }}>
        <Grid item sx={{ width: '100%', height: '80vh', backgroundColor: 'transparent', }}>
          <Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%', position: "relative", backgroundColor: 'rgba(0,0,0,0.6)', }}>

         
            <Box sx={{ width: '40%', height: '100%', position: 'absolute', background: 'linear-gradient(90deg, rgba(12,8,89,1) 19%, rgba(0,212,255,0) 100%)', zIndex: "1",display:'felx',flexDirection:'column',color:'white' ,justifyContent:'space-around'}}>
            <Typography sx={{fontSize:'2.5rem',fontWeight:'600',color:'yellow',fontFamily:'fantasy',marginTop:'3rem',marginLeft:'1rem'}}>Enjoy Moives & Shows</Typography>
            {/* <FormControl variant="standard" sx={{ m: 1,mt:3, minWidth: 350 ,color:'white' }}>
            <InputLabel sx={{input:{color:'whtie'},color:'white',fontWeight:'600',fontSize:'1.4rem'}} id="demo-simple-select-standard-label"    focused>Select Your Movies & shows</InputLabel>
            <Select
            sx={{color:"blue",input:{color:'white',}}}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={selectMovieShow}
          onChange={handleSelectMovieshow}
          label="Age"
        
        >
        { state.movie.Search &&state.movie.Search.map((item)=>{
          return(
            <MenuItem value={item.Title}>{item.Title}</MenuItem>
          )
        })}
         
         
        </Select>
        </FormControl> */}
{/* {
  selectMovieShow ? 
  <Typography sx={{marginTop:'2rem',marginLeft:'1rem',backgroundColor:'rgba(0,0,0,0.6)',width:'100px'}}> <Button variant='outlined' color='secondary'sx={{width:'100%'}} onClick={handleAllSearchMovies}> Search</Button></Typography>

  :
  ""
}        */}
            </Box>
            <Slider {...settings}>
           {posters.map((image,index)=>{
          
            return(
              <CardMedia
              component="img"
key={index}
              image={image.src}
              alt="poster"
              sx={{ width: '100%', height: '80vh', objectFit: 'fill', }}
            />
            )
           })}
             
             
              {/* <Typography sx={{marginLeft:'2rem', color:'white',fontSize:'2rem',fontWeight:'600',fontFamily:'sans-serif'}}>Watch Movies & Shows without any Add</Typography> */}
            </Slider>
          </Paper>

        </Grid>

        <Typography sx={{ width: '100%', fontSize: '1.5rem', paddingLeft: '1rem', color: 'white', fontWeight: '600' }}> Movies</Typography>



        <Grid container xs={12} sx={{ width: '100%', }}>
          {/* <Slider {...setting}> */}
          {state.movie.Response ==="True" ? state.movie.Search.map((item, index) => {
            return (

              <Grid key={item.imdbID} item component={Paper} xs={3} sx={{ background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', height: "400px", transition: 'all .5s ease-in-out', '&:hover': { transform: "scale(1.1)" } }} onClick={() => { navigate(`/movieDetails/${item.imdbID}`) }}>
                <Paper elevation={10} sx={{ width: '250px', height: '350px', display: 'flex', flexDirection: 'column', gap: ".5rem", alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.3)' }}>
                  <CardMedia
                    component="img"
                    image={item.Poster}
                    alt="poster"
                    sx={{ width: '100%', height: '250px', objectFit: 'fill', borderRadius: '5px' }}
                  />
                  <Typography variant='body2' sx={{ textAlign: 'center', fontWeight: '600', color: 'white' }}>{item.Title}</Typography>
                  <Typography variant='subTitle2' sx={{ textAlign: 'center', fontWeight: '500', color: 'white' }}>Release Date :{item.Year}</Typography>
                </Paper>
              </Grid>

            )
          })
        :
<Grid item component={Paper} sx={{ width:'100%', background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', height: "300px", transition: 'all .5s ease-in-out', }}>
<Paper elevation={10} sx={{ width: '50%', height: '250px', display: 'flex', flexDirection: 'column', gap: ".5rem", alignItems: 'center',justifyContent:'center', backgroundColor: 'rgba(255,255,255,0.3)' }}>
<ErrorIcon sx={{color:'white',fontSize:'5rem'}}/>
<Typography sx={{fontSize:'2rem',fontWeight:'600',color:'white'}}>Sorry! No Movies Found</Typography>

</Paper>


</Grid>

        }
          {/* </Slider> */}
        </Grid>

        <Typography sx={{ width: '100%', fontSize: '1.5rem', paddingLeft: '1rem', color: 'white', fontWeight: '600' }}> Shows</Typography>
        <Grid container xs={12} sx={{ width: '100%', }}>
          {state.shows.Response ==="True" ? state.shows.Search.map((item, index) => {
            return (
              <Grid key={item.imdbID} item component={Paper} xs={3} sx={{
                background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', height: "400px", transition: 'all .5s ease-in-out', '&:hover': {
                  transform: 'scale(1.1)'
                }
              }} onClick={() => { navigate(`/movieDetails/${item.imdbID}`) }}>
                <Paper elevation={10} sx={{ width: '250px', height: '350px', display: 'flex', flexDirection: 'column', gap: ".5rem", alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.3)' }}>
                  <CardMedia
                    component="img"
                    image={item.Poster}
                    alt="poster"
                    sx={{ width: '100%', height: '250px', objectFit: 'fill', borderRadius: '5px' }}
                  />
                  <Typography variant='body2' sx={{ textAlign: 'center', fontWeight: '600', color: 'white' }}>{item.Title}</Typography>
                  <Typography variant='subTitle2' sx={{ textAlign: 'center', fontWeight: '500', color: 'white' }}>Release Date :{item.Year}</Typography>
                </Paper>
              </Grid>
            )
          })
        :

<Grid item component={Paper} sx={{ width:'100%', background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', height: "300px", transition: 'all .5s ease-in-out', }}>
<Paper elevation={10} sx={{ width: '50%', height: '250px', display: 'flex', flexDirection: 'column', gap: ".5rem", alignItems: 'center',justifyContent:'center', backgroundColor: 'rgba(255,255,255,0.3)' }}>
<ErrorIcon sx={{color:'white',fontSize:'5rem'}}/>
<Typography sx={{fontSize:'2rem',fontWeight:'600',color:'white'}}>Sorry! No Shows Found</Typography>

</Paper>


</Grid>

        }


        </Grid>
      </Grid>

    </Box>
  )
}

export default MoviePage