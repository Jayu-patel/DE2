import React, { useState } from 'react'

function Kayni() {
    const [count, setCount] = useState({
        rare: 0,
        superRare: 0,
        epic: 0,
        mythic: 0,
        Legendry: 0,
        total: 0,
    })

    const fun = (key) =>{
        setCount(prev=>({
            ...prev,
            ['total']: prev['total'] + 1,
            [key] : prev[key] + 1,
        }))
    }
    return (
    <div className='w-[100vw] h-[100vh] grid place-items-center text-[1.2rem]'>
        <div className='w-[40%] h-[70%] bg-yellow-300'>
            <div className='w-full text-center'>
                <h1>{count.total}</h1>
            </div>

            <div className='mx-3 [&_div]:py-2'>
                <div>
                    <span className='mr-4'>{count.rare}</span> <span><button className='px-4 py-2 bg-lime-400' onClick={()=>{fun('rare')}}>Rare</button></span>
                </div>
                <div>
                    <span className='mr-4'>{count.superRare}</span> <span><button className='px-4 py-2 bg-lime-400' onClick={()=>{fun('superRare')}}>Super Rare</button></span>
                </div>
                <div>
                    <span className='mr-4'>{count.epic}</span> <span><button className='px-4 py-2 bg-lime-400' onClick={()=>{fun('epic')}}>Epic</button></span>
                </div>
                <div>
                    <span className='mr-4'>{count.mythic}</span> <span><button className='px-4 py-2 bg-lime-400' onClick={()=>{fun('mythic')}}>Mythic</button></span>
                </div>
                <div>
                    <span className='mr-4'>{count.Legendry}</span> <span><button className='px-4 py-2 bg-lime-400' onClick={()=>{fun('Legendry')}}>Legendry</button></span>
                </div>

            </div>
        </div>
    </div>
    )
}

export default Kayni