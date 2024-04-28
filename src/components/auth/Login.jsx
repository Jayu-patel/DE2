import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { login } from '../../helper/helper2';
import { useDispatch } from 'react-redux';
import { setUsername } from '../../store/slices/user';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const [formErrors, setFormErrors] = useState({
    username: '',
    password: '',
    email: '',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [admin, setAdmin] = useState(false)
  const [blue, setBlue] = useState('px-2 py-1 bg-blue-500 text-white border-[1px] border-blue-500')
  const [white, setWhite] = useState('px-2 py-1 bg-white text-blue-500 border-[1px] border-blue-500')

  const change=()=>{
    admin == false ? setAdmin(true) : setAdmin(false)

    blue == 'px-2 py-1 bg-blue-500 text-white border-[1px] border-blue-500' ?
    setBlue('px-2 py-1 bg-white text-blue-500 border-[1px] border-blue-500') :
    setBlue('px-2 py-1 bg-blue-500 text-white border-[1px] border-blue-500')
    
    white == 'px-2 py-1 bg-white text-blue-500 border-[1px] border-blue-500' ?
    setWhite('px-2 py-1 bg-blue-500 text-white border-[1px] border-blue-500') :
    setWhite('px-2 py-1 bg-white text-blue-500 border-[1px] border-blue-500')
  }


  const handleLogin=()=>{
    let valid = true
    const errors = {}

    if(!user.username.trim()){
      errors.username = "Username is required"
      valid = false
    }

    if(!user.password.trim()){
      errors.password = 'Password is required'
      valid = false
    }else if((user.password).includes(' ')) {
      errors.password = 'There should be no space inside the password.'
      valid = false
    }

    setFormErrors(errors)

    if(valid){
      const loginPromise = login(user)

      toast.promise(loginPromise,{
        loading: "Verifying...",
        success: <b>Login successful...</b>,
        error: <b>Password does not match</b>
      })

      loginPromise.then(res =>{
        navigate('/')
        dispatch(setUsername(user.username))
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        {/* <div className='w-full flex justify-evenly'>
          <button className={' '+blue} onClick={change}>As User</button>
          <button className={' '+white} onClick={change}>As Admin</button>
        </div> */}
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              {
                formErrors.username && <p className='text-red-500'>{formErrors.username}</p>
              }
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" autoComplete="username" required placeholder="Username" value={user.username}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setUser(p=>({...p, username: e.target.value}))}
              />
            </div>
            <div>
              {
                formErrors.password && <p className='text-red-500'>{formErrors.password}</p>
              }
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Password" value={user.password}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setUser(p=>({...p, password: e.target.value}))}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login