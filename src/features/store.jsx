import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./sllice/moivesSlice"; 

const store=configureStore({
    reducer:{
        movies:moviesReducer,
    }
})

export default store