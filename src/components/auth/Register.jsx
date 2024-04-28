import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { register } from '../../helper/helper2';
const Register = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    isAdmin: "false",
  })
  const [validate, setV] = useState({
     email: false,
  })

  const [admin, setAdmin] = useState("false")
  const [blue, setBlue] = useState('px-2 py-1 bg-blue-500 text-white border-[1px] border-blue-500')
  const [white, setWhite] = useState('px-2 py-1 bg-white text-blue-500 border-[1px] border-blue-500')

  const navigate = useNavigate()

  const change=()=>{
    admin == "false" ? setAdmin("true") : setAdmin("false")

    blue == 'px-2 py-1 bg-blue-500 text-white border-[1px] border-blue-500' ?
    setBlue('px-2 py-1 bg-white text-blue-500 border-[1px] border-blue-500') :
    setBlue('px-2 py-1 bg-blue-500 text-white border-[1px] border-blue-500')
    
    white == 'px-2 py-1 bg-white text-blue-500 border-[1px] border-blue-500' ?
    setWhite('px-2 py-1 bg-blue-500 text-white border-[1px] border-blue-500') :
    setWhite('px-2 py-1 bg-white text-blue-500 border-[1px] border-blue-500')
  }

  const handleRegister =()=> {
    const {username, email, password} = user
    setUser(p=>({...p, isAdmin: admin}))
    if(username!="" && email!="" && password!=""){
      if(username.includes(' ') || email.includes(' ') || password.includes(' ')) return toast.error("spaces are invalid")
      else{
        if(!(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))){ 
          setV(p=>({...p, email: true}))
          return toast.error("invalid email address")
        }
        else setV(p=>({...p, email: false}))

        if(validate.email == false){
            const registerPromise = register(user)
            
            toast.promise(registerPromise,{
              loading: "Creating...",
              success: <b>Register successfully...</b>,
              error: <b>User already exsists...</b>
            })
            
            registerPromise.then(()=>{
              navigate('/login')
            })
        }
      }
    }
    else{
      toast.error("Please fill all details")
    }
  };

  useEffect(()=>{
    console.log()
  },[admin])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
        </div>
        <div className='w-full flex justify-evenly'>
          <button className={' '+blue} onClick={change}>As User</button>
          <button className={' '+white} onClick={change}>As Admin</button>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username" name="username" type="text" autoComplete="username" required placeholder="Username" value={user.username}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setUser(p=>({...p, username: e.target.value}))}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password" name="password" type="password" autoComplete="new-password" required placeholder="Password" value={user.password}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setUser(p=>({...p, password: e.target.value}))}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email" name="email" type="email" autoComplete="email" required placeholder="Email address" value={user.email}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setUser(p=>({...p, email: e.target.value}))}
              />
            </div>
          </div>

          <div>
            <button onClick={handleRegister}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
