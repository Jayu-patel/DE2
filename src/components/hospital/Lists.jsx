import React from 'react'
import data from '../../data/data'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import useGeoLocation from './useGeoLocation'
import { setLat, setLon } from '../../store/slices/locationSlice'

function Lists() {
    const navigate = useNavigate()

    const latitude = useSelector(s => s?.location?.latitude)
    const longitude = useSelector(s => s?.location?.longitude)
  
    const fun=()=>{
        alert('Please allow Location')
    }
    const nav = e => e.target.parentNode.childNodes[0].click()
    return (
    <div className='w-[100vw] pt-[65px] py-5 bg-gray-200'>
        <div className='w-[75%] xs:w-[85%] mx-auto mb-4'>
            <button className='bg-white px-3 py-2 border-black border-[1px] rounded-md fixed' onClick={()=>{navigate('/')}}>
                <i className="fa-solid fa-arrow-left"></i> Back
            </button>
        </div>
        <div className='pt-9 grid grid-cols-auto-fill-600 gap-7 w-[75%] xs:w-[85%] mx-auto xs:grid-cols-auto-fill-601'>
            {
                data.map(e=>{
                    var num = Math.random() * (10 - 1) + 1;
                    num = Math.ceil(num)
                    return <div key={e.id} className='border-black border-[1px] px-4 py-6 pb-16 bg-white shadow-lg bg-no-repeat bg-cover' 
                        style={{backgroundImage : "url('bg.jpg')"}}>
                        <NavLink to={`/hospital/${e.id}`}>
                            <h1 className='text-[1.5rem] text-blue-500 font-semibold'>{e.title}</h1>
                        </NavLink>
                        <div className='flex'>
                            <span>
                                <i className="fa-solid fa-location-dot"></i>
                            </span>
                            <span className='ml-1'>
                                <p className='text-gray-500'>{e.address}</p>
                            </span>
                        </div>
                        <div className='bed p-1 rounded-lg bg-blue-400 text-white grid place-items-center my-2'>
                            <h3>No. of beds: {num}</h3>
                        </div>
                        <div className='bed p-1 rounded-lg bg-blue-400 text-white grid place-items-center'>
                            {
                                latitude!='' ? 
                                    <button className='w-[100%] h-[100%] relative'>
                                        <a href={`https://www.google.com/maps/dir/${latitude},${longitude}/${e.ad}`} target='_blank'>
                                        <i className="fa-solid fa-diamond-turn-right mr-1"></i>
                                            Get Directions
                                        </a>
                                        <div className='absolute w-[100%] h-[100%] top-0' onClick={nav}>.</div>
                                    </button>
                                    :
                                    <button onClick={fun}><NavLink to={'/'}>Get Directions</NavLink></button>
                            }
                        </div>
                    </div>
                })
            }
        </div>
    </div>
    )
}

export default Lists