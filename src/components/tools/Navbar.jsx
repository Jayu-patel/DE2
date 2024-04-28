import React, { useEffect, useState } from 'react'
import '../../App.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUsername } from '../../store/slices/user'
import axios from 'axios'

function Navbar() {
    const [menu, setMenu] = useState("xs:h-0 xs:[&_li]:hidden")
    const user = useSelector(state=>state?.user?.username)
    const dispatch = useDispatch()

    const name = useSelector(state=>state?.user?.username)

    const [data, setData] = useState([])
    const fetFun=async()=>{
        const myData = await axios.get(`https://de-server.vercel.app/api/findUser/${name}`)
        setData(myData.data)
    }
    useEffect(()=>{
        fetFun()
    },[data.isAdmin])

    const open=()=>{
        menu == "xs:h-0 xs:[&_li]:hidden" ? setMenu("xs:h-[100px] xs:[&_li]:block") : setMenu("xs:h-0 xs:[&_li]:hidden")
    }

    const home=()=>{
        navigate('/')
    }
    const navigate = useNavigate()

    // useEffect(()=>{},[user])
    return (
    <div className={'w-[100vw] h-auto bg-blue-600 text-white flex justify-between fixed top-[0] z-50 shadow-md'}>
        <div className='ml-8 xss:ml-2 xs:ml-1'>
            <h1 className='text-[2.5rem] font-semibold cursor-pointer' onClick={()=>{navigate('/')}}>VBSS</h1>
        </div>
        {
        user == "" ?
        <div className={'list-none flex justify-around my-auto box text-gray-200 transition-all '+menu}>
            <li>
                <button onClick={()=>{navigate('/login')}}>
                    Already have an account?
                </button>
            </li>
            <li>
                <button onClick={()=>{navigate('/register')}}>Sign up</button>
            </li>
        </div> :
        <div className={'list-none flex justify-around my-auto box text-gray-200 transition-all w-[250px] xs:w-full '+menu}>
            <li>
                {
                    <button onClick={()=>{navigate('profile/user')}}>Profile</button> 
                }
            </li>
            <li>
                <button className='' onClick={()=>{dispatch(setUsername("")); navigate("/")}}>Log Out</button>
            </li>
        </div>
        }
        {
        // user == "" ?
        <div className='hidden xs:block my-auto mr-4 text-[2rem]'>
            <button onClick={open}>
                <i className="fa-solid fa-bars"></i>
            </button>
        </div> 
        // <div className='hidden'></div>
        }
    </div>
    )
}

export default Navbar