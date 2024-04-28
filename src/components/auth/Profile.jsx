import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast'

const UserProfile = () => {
  // Sample user data
  const initialUserData = {
    username: '',
    email: '',
    password: '',
    newPass: ''
  };

  const [userData, setUserData] = useState(initialUserData);
  const [showPass, setPass] = useState(false)
  const name = useSelector(state=>state?.user?.username)
  console.log(name)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const [data, setData] = useState([])
  const fetFun=async()=>{
    const myData = await axios.get(`https://de-server.vercel.app/api/findUser/${name}`)
    setData(myData.data)
    setUserData({...userData, username: data?.username, email: data?.email})
  }
  useEffect(()=>{
    fetFun()
  },[])

  const handleSubmit=()=>{
    setPass(true)
  };
  const handleSubmit2=async()=>{
    const{password, newPass} = userData
    if(password != "" && newPass != ""){
      try{
        const api = await axios.put(`https://de-server.vercel.app/api/updatePass`,{
          username: name, password, newPass
        })
        if(api.status == 200){
          toast.success("Password updated")
        }
        else{
          toast.error("Somthing went wrong")
        }
      }
      catch(e){
        console.log(e)
        toast.error("Wrong password")
      }

      setUserData({
        ...userData,
        password: '',
        newPass: ''
      });
    }
    else{
      toast.error("Password required!")
    }
    setPass(false)
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-[100px]">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700">Full Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={data.username}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        {/*//////////////////////////////////////////////////////////////////////////////////// */}
        {showPass ?
        <div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Current Password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="form-input mt-1 block w-full rounded-md border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPass" className="block text-gray-700">New password</label>
            <input
              type="text"
              id="newPass"
              name="newPass"
              value={userData.newPass}
              onChange={handleChange}
              className="form-input mt-1 block w-full rounded-md border-gray-300"
              required
            />
          </div>
        </div>
        : <></>
        }
        {
          !showPass ?
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update Password</button>:
          <button onClick={handleSubmit2} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Confirm</button>
        }
      </div>
    </div>
  );
};

export default UserProfile;
