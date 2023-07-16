import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Badge, Box, FormControl, IconButton, InputBase, InputLabel, TextField, Toolbar, Typography } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { fetchMovieApi, fetchShowsApi } from '../features/sllice/moivesSlice';
import Swal from 'sweetalert2'
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { useNavigate } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',

  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: '1rem',
  top: '20%',
  zIndex: '1'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '40ch',
      '&:focus': {
        width: '45ch',
      },
    },
  },
}));

const Navbar = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const [searchtext, setSearchText] = useState('')
  console.log(searchtext)


  //image upload
  const [file, setFile] = useState(null)
useEffect(()=>{
  const storedItem=localStorage.getItem('file')
  if(storedItem){
    setFile(storedItem)
  }
},[])
 
  const handleFile = (e) => {

    const filterImg=e.target.files[0]
    const fileUrl=URL.createObjectURL(filterImg)
    setFile(fileUrl)
    localStorage.setItem('file',fileUrl)
  }

  const handleSearch = () => {
    if (searchtext === "") {
      Swal.fire({

        icon: 'warning',
        title: `Please Fill the Input`,
        showConfirmButton: true,

      })
    }
     else {
      dispatch(fetchMovieApi(searchtext))
      dispatch(fetchShowsApi(searchtext))
      Swal.fire({

        icon: 'success',
        title: ` ${searchtext} Searched Successfuly `,
        showConfirmButton: true,

      })
    }
    setSearchText('')

  }
  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgba(0,0,0,0.82)', height: '10vh' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }}>

        <Typography
          variant="h6"

          sx={{ fontFamily: 'Staatliches', color: 'red', fontSize: '2rem', fontWeight: '500', ml: 10 }}
        >
          MOVIEFLIX
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon onClick={handleSearch} sx={{ cursor: 'pointer' }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchtext}
            onChange={(e) => { setSearchText(e.target.value) }}
          />
        </Search>



        <IconButton
          size="large"
          // edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, position: 'relative' }}
        onClick={()=>{navigate('/')}}
        >
          <InputLabel htmlFor="my-input" sx={{ color: 'white', position: 'absolute', zIndex: '1', right: '5px', bottom: '5px' }}><DataSaverOnIcon sx={{ zIndex: '1', color: 'green', background: 'white', borderRadius: '50%' ,fontSize:".99rem"}} /></InputLabel>
          <TextField
            id='my-input'
            sx={{ background: 'red', display: 'none' }}
            type="file"
            required="required"

            onChange={handleFile}
          >
          </TextField>
          <Avatar src={file} />
        </IconButton>

      </Toolbar>
    </AppBar>
  )
}

export default Navbar
