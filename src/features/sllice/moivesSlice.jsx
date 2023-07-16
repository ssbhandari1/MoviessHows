import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/movieApi";
import { API_KEY } from "../../common/movieApiKey";


export const fetchMovieApi=createAsyncThunk("movies/fetchMovieApi" , async(searchText)=>{
    try {
       
        const res=await movieApi.get(`?apikey=${API_KEY}&s=${searchText}&type=movie`)
      return res.data
      } catch (error) {
        console.log(error)
      }
    
})
export const fetchShowsApi=createAsyncThunk("movies/fetchShowsApi" , async(searchText)=>{
    try {
      
        const res=await movieApi.get(`?apikey=${API_KEY}&s=${searchText}&type=series`)
      return res.data
      } catch (error) {
        console.log(error)
      }
    
})

export const fetchMovieOrShow=createAsyncThunk("movies/fetchMovieOrShow" , async(id)=>{
    try {
    
        const res=await movieApi.get(`?apikey=${API_KEY}&i=${id}&Plot=full`)
    
        return res.data
     
      } catch (error) {
        console.log(error)
      }
    
})




const moviesSlice=createSlice({
    name:'movies',
    initialState:{
        isloading:false,
        isError:false,
        movie:{},
        shows:{},
        selectMovieShow:{}
    },
    reducers:{
        removeMovieShow(state,action){
        state.selectMovieShow={}
        },
 
    },
    extraReducers: (builder)=>{
builder.addCase(fetchMovieApi.pending ,(state )=>{
    state.isloading=true;
})
.addCase(fetchMovieApi.fulfilled,(state,action)=>{
    state.isloading=false;
    state.movie = action.payload;
})
.addCase(fetchMovieApi.rejected,(state,action)=>{
    state.isError=true;
   
})
.addCase(fetchShowsApi.pending ,(state )=>{
    state.isloading=true;
})
.addCase(fetchShowsApi.fulfilled,(state,action)=>{
    state.isloading=false;
    state.shows = action.payload;
})
.addCase(fetchShowsApi.rejected,(state,action)=>{
    state.isError=true;
   
})
.addCase(fetchMovieOrShow.pending ,(state )=>{
    state.isloading=true;
})
.addCase(fetchMovieOrShow.fulfilled,(state,action)=>{
    state.isloading=false;
    state.selectMovieShow = action.payload;
})
.addCase(fetchMovieOrShow.rejected,(state,action)=>{
    state.isError=true;
   
})

    }
})

export const {removeMovieShow }=moviesSlice.actions;
export default moviesSlice.reducer;




// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import movieApi from './common/movieApi';
// import { API_KEY } from './common/movieApiKey';

// const fetchMovieApi = createAsyncThunk('movies/fetchMovieApi', async (movietext) => {
//   try {
//     const response = await movieApi.get(`?apikey=${API_KEY}&s=${movietext}&type=movie`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// });

// const moviesSlice = createSlice({
//   name: 'movies',
//   initialState: {
//     movie: [],
//     status: 'idle',
//     error: null
//   },
//   reducers: {
//     addToMovie(state, action) {
//       state.movie = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMovieApi.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchMovieApi.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.movie = action.payload;
//       })
//       .addCase(fetchMovieApi.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   }
// });

// export const { addToMovie } = moviesSlice.actions;
// export { fetchMovieApi };
// export default moviesSlice.reducer;
