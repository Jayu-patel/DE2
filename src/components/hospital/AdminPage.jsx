import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function AdminPage() {
    const navigate = useNavigate()
    const hospital = useSelector(state=>state?.user?.username)
  return (
    <div className='w-[100%] mt-[80px]'>
        <div className='w-[100%]'>
            <h2 className='text-[1.5rem] text-center'>Welcome {hospital}</h2>
        </div>
        <div className='flex mt-[60px] xs:mt-[25px] w-[80%] mx-auto'>
            <div className='flex-1 grid place-items-center'>
                <Link to={`/profile/paitents/${hospital}`} >
                    <button className='bg-blue-500 px-4 py-2 text-white text-[1.2rem] xs:text-[0.85rem]'>Patient Details</button>
                </Link>
            </div>
            {/* <div className='flex-1 grid place-items-center'>
                <button className='bg-blue-500 px-4 py-2 text-white text-[1.2rem] xs:text-[0.85rem]' onClick={()=>{navigate('/profile/database')}}>Update Database</button>
            </div> */}
        </div>
    </div>
  )
}

export default AdminPage