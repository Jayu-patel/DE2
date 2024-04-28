import React, { useState } from 'react'
import Loader from '../tools/Loader'
import ReactSwitch from 'react-switch';
import {Link, useNavigate} from 'react-router-dom'

function SearchPosts({posts}) {
  const [load, setLoad] = useState(true)
  const [checked, setChecked] = useState(false);
  const [siz, setSiz] = useState(true)

  const navigate = useNavigate()
  setInterval(()=>{
    if(window.innerWidth < 900) setSiz(false)
    else setSiz(true)
  },50)

    const handleChange = val => {
      if(checked){
          posts.sort((x,y)=>{
              let a = x.id;
              let b = y.id;
        
              if(a<b) return -1;
              if(a>b) return 1;
              return 0;
          })
      }
      else{
          posts.sort((x,y)=>{
              let a = x.distance;
              let b = y.distance;
        
              if(a<b) return -1;
              if(a>b) return 1;
              return 0;
          })
      }
      setChecked(val)
  }

  setTimeout(() => {
    setLoad(false)
  }, 900)

  const book=(id)=>{
    navigate(`book/${id}`)
  }
  return (
    load ? 
    <div className='w-[100%] h-[250px] bg-white grid place-items-center'>
      <Loader/>
    </div>:
    <div className='p-4 bg-white'>
        {/* <div className='w-[80%] xs:w-full mx-auto pb-2'>
                <div className='flex'>

                  <ReactSwitch
                      checked={checked}
                      onChange={handleChange}
                  />
                  <p className='ml-[8px]'>Sort by distance</p>
                </div>
        </div> */}
        {
            posts?.map((e)=>{
                return( 
                  e?.bed < 0 ? <></> :
                  <div key={e?.id} className='py-1'>
                          <div className='flex justify-between w-[85%] xs:w-full mx-auto p-3 border-[1px] border-black' style={{backgroundImage : "url('bg.jpg')"}}>
                              <div className='ml-10 xs:ml-0'>
                                <Link to={`/hospital/${e?.id}`} >
                                  <h1 className='box2 text-[1.5rem] text-blue-500 font-semibold'>{e?.title}</h1>
                                </Link>
                                <h2 className='box2 mt-[-5px] text-gray-500'>{e?.address}</h2>
                                <h2 className='box2'>Distance : {e?.distance} km</h2>
                              </div>

                              <div className='mr-20 xs:mr-0'>
                                  <div>
                                    <h1 className='box2 xs:text-[0.9rem]'>Beds: {e?.bed}</h1>
                                  </div>
                                  <div>
                                    {
                                      siz ?
                                      <button className='bg-blue-500 px-3 py-2 xs:p-[8px_4px] text-white xs:text-[0.9rem]' onClick={()=>{book(e?.title)}}>Book a bed</button> :
                                      <button className='bg-blue-500 px-3 py-2 text-white' onClick={()=>{book(e?.title)}}>Book</button> 
                                    }
                                  </div>
                              </div>
                          </div>
                      </div>
                 )
            })
        }
    </div>
  )
}

export default SearchPosts