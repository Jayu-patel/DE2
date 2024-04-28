import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const SidePanel = () => {
  const navigate = useNavigate()
  const name = useSelector(state=>state?.user?.username)

  const [data, setData] = useState([])
  const fetFun=async()=>{
    const myData = await axios.get(`https://de-server.vercel.app/api/findUser/${name}`)
    setData(myData.data)
  }
  useEffect(()=>{
    fetFun()
  },[])
  return (
    <div className="bg-gray-800 text-white h-[100vh] xs:h-auto w-[20%] xs:w-full flex flex-col xs:flex-row mt-[60px]">
      {
        data?.isAdmin ?
        <div className="p-4 text-xl font-bold">{name} (Admin)</div>:
        <div className="p-4 text-xl font-bold">{name} (User)</div>
      }
      <ul className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 p-4">
        {
          data?.isAdmin ? 
          <li className="hover:bg-gray-700 px-4 py-2 rounded-md cursor-pointer" onClick={()=>{navigate('/profile')}}>Dashboard</li>
          :
          <li className="hover:bg-gray-700 px-4 py-2 rounded-md cursor-pointer" onClick={()=>{navigate('/profile/paitentDetail')}}>User Record</li>
        }
        {
          <li className="hover:bg-gray-700 px-4 py-2 rounded-md cursor-pointer" onClick={()=>{navigate('/profile/user')}}>Profile</li>
        }
      </ul>
    </div>
  )
}

const UserDashboard = () => {
  return (
    <div className="flex xs:flex-col">
      <SidePanel />
      <div className="flex-1">
        {/* Your dashboard content goes here */}
        {/* <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard!</h1> */}
        <Outlet/>
      </div>
    </div>
  )
}

export default UserDashboard
