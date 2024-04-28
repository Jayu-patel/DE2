import {createSlice} from '@reduxjs/toolkit'


const locationSlice = createSlice({
    name: 'location',
    initialState: {
        latitude: '',
        longitude: ''
    },
    reducers: {
        setLat(state,action){
            state.latitude = action.payload
        },
        setLon(state,action){
            state.longitude = action.payload
        }
    }
})

export const {setLat,setLon} = locationSlice.actions
export default locationSlice.reducer