import {createSlice} from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchDataA = createAsyncThunk('fetchDataA', async ()=> {
    const res = await axios.get('https://de-2-one.vercel.app/api/getAllHospitals').then(res => res.data)
    return res
})

const hosplitalSlice = createSlice({
    name: 'hospital',
    initialState: {
        data: null,
        isLoading: false,
        isError: false
    },
    reducers: {
    },
    extraReducers : b =>{
        b.addCase(fetchDataA.pending, state =>{
            state.isLoading = true
        })
        b.addCase(fetchDataA.fulfilled, (state, action)=>{
            state.isLoading = false
            state.data = action.payload
        })
        b.addCase(fetchDataA.rejected, (state, action)=>{
            state.isError = true
            console.log("error", action.payload)
        })
    }
})

export default hosplitalSlice.reducer