import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Patient() {
  const navigate = useNavigate()
  const latitude = useSelector(s => s?.location?.latitude)
  const nav=()=>{
    navigate('/load')
    // if(latitude != "") navigate('/lists')
    // else{
    //   alert("Please allow location")
    //   window.location.reload()
    // }
  }
  return (
    <div className='w-[100vw] h-[100vh] bg-cover bg-no-repeat' style={{backgroundImage: "url('hospital.jpg')"}}>
        <div className='h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.7)] grid place-items-center'>
            <div className='h-[400px] w-[650px] xs:w-[90%] mx-auto bg-white rounded-2xl grid place-items-center'>
                <div className='btns flex flex-col'>
                  <button className='mb-[15px] mt-[-15px]' onClick={nav}>It's an emergency</button>
                  <button onClick={()=>{navigate('/map')}}>Login/Sign up</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Patient