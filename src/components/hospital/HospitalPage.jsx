import data  from '../../data/data'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


function HospitalPage() {
    const param = useParams()
    const {id} = param
    const hospital = data[id-1]
    const latitude = useSelector(s => s?.location?.latitude)
    const longitude = useSelector(s => s?.location?.longitude)
    return (
    <div className='w-[100vw] h-auto pt-[60px] bg-gray-200'>
        <div className='r w-[75%] mx-auto bg-white xs:w-[100%] shadow-xl'>
            <div className='p-5 xs:p-3'>
                <div className='b'>
                    <h1>{hospital?.title}</h1>
                    <p>                        {
                            hospital.ratings >= 4 ? 
                            <span className='text-green-600'>{hospital?.ratings}</span> : 
                            <span className='text-yellow-500'>{hospital?.ratings}</span>
                        }
                        <span className='text-yellow-500 pr-2'>
                            <i className="fa-solid fa-star"></i>
                        </span>
                        Ratings
                    </p>
                    <h2><i className="fa-solid fa-location-dot"></i> {hospital?.address}</h2>
                    <a href={`https://www.google.com/maps/dir/${latitude},${longitude}/${hospital?.ad}`} target='_blank'>
                        <i className="fa-solid fa-diamond-turn-right mr-1"></i>
                        <button className='rounded-lg px-2 py-1 bg-blue-500 text-white'>
                            Get Directions
                        </button>
                    </a>
                </div>

                <div className='b'>
                    <h1>Address</h1>
                    <p>{hospital.fullAdd}</p>
                </div>

                <div className='b b2'>
                    <h1 className='text'>About us</h1>
                    <h1>{hospital.title}</h1>
                    <p>{hospital.info}</p>
                    <h1>Location and Overview</h1>
                    <p>{hospital.overview}</p>
                    <h1>Product and Services offered</h1>
                    <p>{hospital.services}</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default HospitalPage