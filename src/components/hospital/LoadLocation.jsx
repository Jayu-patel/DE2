import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGeoLocation from './useGeoLocation'
import { setLat, setLon } from '../../store/slices/locationSlice'
import Loader from '../tools/Loader'

function LoadLocation() {
    const navigate = useNavigate()
    const nav=()=>{
        navigate('/lists')
    }

    const latitude = useSelector(s => s?.location?.latitude)
    const longitude = useSelector(s => s?.location?.longitude)

    const dispatch = useDispatch()

    const location = useGeoLocation()

    useEffect(() => {
        if(latitude == ''){
            if (location.loaded && location.coordinates.lat != '') {
                dispatch(setLat(location.coordinates.lat))
                dispatch(setLon(location.coordinates.lng))
            }
        }
     }, [location.loaded,latitude,longitude]);

    
    setInterval(()=>{
        if(location.error != null){
            alert('Please reload the page & allow location')
            window.location.reload(true)
        }
    },8000)
    useEffect(()=>{
        console.log("loaded")
        if(latitude != ""){
            nav()
        }
    },[latitude])
    return (
        <div className='w-[100vw] h-[calc(100vh-60px)] grid place-items-center'><Loader/></div>
    )
}

export default LoadLocation