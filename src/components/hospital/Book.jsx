import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { addPatient, incHospital, register, updateHospital, generateMail } from '../../helper/helper2';
import {fetchDataA} from '../../store/slices/hospitalSlice'
import { useDispatch, useSelector } from 'react-redux'

const Book = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    service: '',
    age: '',
    email: '',
    mobile: '',
    hospitalName: '',
  });

  const param = useParams()
  const {id} = param
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]: value});
  };

  const [formErrors, setFormErrors] = useState({
    age: '',
    email: '',
    mobile: '',
    fullName: '',
    gender: '',
    service: ''
  });

  const handleSubmit=()=>{
    let valid = true;
    const errors = {}

    if (!formData.age.trim()){
      errors.age = 'Age is required'
      valid = false
    } 
    else if(isNaN(formData.age) || (parseInt(formData.age) <= 0) || parseInt(formData.age) > 120){
      errors.age = 'Please enter a valid age'
      valid = false
    }

    if(!formData.email.trim()){
      errors.email = 'Email is required'
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
      valid = false
    }

    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required'
      valid = false
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = 'Please enter a valid 10-digit mobile number'
      valid = false
    }

    if(!formData.fullName.trim()){
      errors.fullName = "Name is required"
      valid = false
    }
    
    if(!formData.gender.trim()){
      errors.gender = "Gender is required"
      valid = false
    }

    if(!formData.service.trim()){
      errors.service = "bed type is required"
      valid = false
    }

    setFormErrors(errors);

    if (valid) {
      const {fullName, gender, service, age, mobile, email} = formData

      formData.hospitalName = id
      const patientPromise = addPatient(formData)
      
      toast.promise(patientPromise,{
        loading: "Loading...",
        success: <b>Patient added successfully...</b>,
        error: <b>Something went wrong.</b>
      })
      
      patientPromise.then(()=>{
        console.log("booking sucessful")
      })
      
      const hospitalpPromise = incHospital(id)
      const updateHospitalPromise = updateHospital(id)

      const registerPromise = register({
        username: fullName, email: email, password: "user123", isAdmin: "false"
      })
      registerPromise.then(()=>{
        dispatch(fetchDataA())
      })
      .then(()=>{
        setTimeout(()=>{
          navigate('/')
        },1000)
      })

      const mailPromise = generateMail({
        username: fullName,
        email,
        hospital: id
      })
      
      setFormData({
        fullName: '',
        gender: '',
        service: '',
        age: '',
        email: '',
        mobile: '',
      })
    }
    else{
      console.log(errors)
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] grid place-items-center xs:block'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className='img_box'>
            <img src='../Background.png' alt="Error" />
        </div>
        <div className="mx-auto p-4 w-[60%] xs:w-[95%] xs:mt-[60px]">
          <h1 className="text-2xl xs:text-[1.05rem] font-bold mb-4">Booking a bed at {id}</h1>
          <div>
              <div className="mb-4">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  {
                    formErrors.fullName && <p className='text-red-500'>{formErrors.fullName}</p>
                  }
                  <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div className="mb-4">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                  {
                    formErrors.gender && <p className='text-red-500'>{formErrors.gender}</p>
                  }
                  <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                  </select>
              </div>
              <div className="mb-4">
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700">Type of bed</label>
                  {
                    formErrors.service && <p className='text-red-500'>{formErrors.service}</p>
                  }
                  <select id="service" name="service" value={formData.service} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option value="">Type of Bed</option>
                      <option value="General Bed">General Bed</option>
                      <option value="Intensive Care Unit (ICU) Bed">Intensive Care Unit (ICU) Bed</option>
                      <option value="Maternity Bed">Maternity Bed</option>
                      <option value="Pediatric Bed">Pediatric Bed</option>
                      <option value="Surgical Bed">Surgical Bed</option>
                      <option value="Psychiatric Bed">Psychiatric Bed</option>
                      <option value="Orthopedic Bed">Orthopedic Bed</option>
                      <option value="Geriatric Bed">Geriatric Bed</option>
                      <option value="Isolation Bed">Isolation Bed</option>
                      <option value="Rehabilitation Bed">Rehabilitation Bed</option>
                  </select>
              </div>
              <div className="mb-4">
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                  {
                    formErrors.age && <p className='text-red-500'>{formErrors.age}</p>
                  }
                  <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  {
                    formErrors.email && <p className='text-red-500'>{formErrors.email}</p>
                  }
                  <input type="email" required={true} id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div className="mb-4">
                  <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  {
                    formErrors.mobile && <p className='text-red-500'>{formErrors.mobile}</p>
                  }
                  <input type="tel" id="mobileNumber" name="mobile" value={formData.mobile} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <button onClick={handleSubmit} className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
          </div>
        </div>
    </div>
  );
};

export default Book;
