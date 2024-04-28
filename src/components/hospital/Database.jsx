import React, { useState } from 'react'

function Database() {
    const [beds, setBeds] = useState(10)

    const fun=(sign)=>{
        if(sign == "+"){
            let n = beds + 1
            setBeds(n)
        }
        else{
            let n = beds - 1
            setBeds(n)
        }
    }
  return (
    <div className='w-[100%] mt-[140px]'>
        <div className='w-[60%] mx-auto text-center'>
            <div className='text-[1.4rem]'>Available Beds :{beds}</div>
        </div>
        <div className='w-[40%] mx-auto mt-[20px]'>
            <div className='flex justify-around'>
                <button className='bg-blue-500 px-7 py-2 text-white text-[1.2rem]' onClick={()=>{fun('+')}}>Add</button>
                <button className='bg-blue-500 px-7 py-2 text-white text-[1.2rem]' onClick={()=>{fun('-')}}>Bed Booked</button>
            </div>
        </div>
    </div>
  )
}

export default Database