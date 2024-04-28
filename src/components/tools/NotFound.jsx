import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate()
    return (
    <div className='w-[100vw] h-[70vh] grid place-items-center'>
        <div className='text-center'>
            <h2 className='text-[4rem] xs:text-[2.5rem] text-blue-500'>404: Page Not Found</h2>
            <button className='text-white bg-blue-500 px-4 py-1 rounded-lg text-[1.5rem] xs:text-[1.2rem]'
                    onClick={()=>{navigate('/')}}>
                <i className="fa-solid fa-arrow-left mr-1"></i>
                Back to home page
            </button>
        </div>
    </div>
    )
}

export default NotFound