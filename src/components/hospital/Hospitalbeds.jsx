import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HospitalCard = ({ hospitalName, patientsBooked, availableBeds }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-lg font-semibold mb-2">{hospitalName}</h2>
      <div className="flex justify-between mb-2">
        <p className="text-gray-600">Patients booked for bed:</p>
        <p className="text-gray-800">{patientsBooked}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-600">Available beds:</p>
        <p className="text-green-600">{availableBeds}</p>
      </div>
    </div>
  );
};

const HospitalBeds = () => {
  const [data, setData] = useState([])
  const fetFun=async()=>{
    const myData = await axios.get(`https://de-server.vercel.app/api/getHospitals`)
    setData(myData.data)
    console.log(data)
  }
  useEffect(()=>{
    fetFun()
  },[])
  return (
    <div className='mt-[70px]'>
      <div className='w-[100%] text-center my-5'>
        <h2 className='font-semibold text-[1.8rem]'>Hospital data</h2>
      </div>
      <div className='w-[95%] h-full mx-auto grid grid-cols-auto-fill-600 gap-5'>
        {
          data?.map((e,i)=>{
            return(
              e?.count > 0 ?
              <div key={i} className='border-[1px] border-black h-full'>
                <Link to={`/profile/paitents/${e?.name}`} >
                  <HospitalCard hospitalName={e?.name} patientsBooked={e?.count} availableBeds={5} />
                </Link>
              </div> : <></>
            )
          })
        }
      </div>
    </div>
  );
};

export default HospitalBeds;