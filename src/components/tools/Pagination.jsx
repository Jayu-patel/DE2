import React, { useEffect, useState } from 'react'

function Pagination({postPerPage, totalPage, paginate}) {
    const [load, setLoad] = useState('hidden')

    const pageNums = []

    for(let i = 1; i<= Math.ceil(totalPage / postPerPage); i++){
        pageNums.push(i)
    }
    let bool = 1
    const border = (active)=>{
        pageNums.forEach(n=>{
            let element = document.getElementsByClassName(n)[0]
            if(active == n){
                element.style.background = 'rgb(96,165,250)'
                element.style.color = 'white'
            }
            else{
                element.style.background = 'white'
                element.style.color = 'rgb(96,165,250)'
            }
        })
        bool--
    }

    useEffect(()=>{
        if(bool == 1){
            document.querySelector('.borderr').childNodes[0].style.background = 'rgb(96,165,250)'
            document.querySelector('.borderr').childNodes[0].style.color = 'white'
        }
        else document.querySelector('.borderr').childNodes[0].style.background = 'white'
    },[])

    setTimeout(() => {
        setLoad('flex')
    }, 900)

    return (
    <div className={'borderr list-none py-2 mt-2 text-blue-400 '+load}>
        {
            pageNums.map(num =>{
                return (
                    <li key={num} className={`cursor-pointer px-4 py-2 border-[1px] border-blue-400 hover:bg-slate-200 bg-white ${num}`}

                    onClick={()=>{paginate(num); border(num)}}>
                        {num}
                    </li>
                )})
        }
    </div>
    )
}

export default Pagination