import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./slices/locationSlice";
import userSlice from "./slices/user"
import hospitalSlice from "./slices/hospitalSlice";
const store = configureStore({
    reducer:{
        location: locationSlice,
        user: userSlice,
        hospital: hospitalSlice,
    }
})

export default store