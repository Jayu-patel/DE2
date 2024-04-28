import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PatientTable = ({ patients }) => {
  const styl1 = 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
  const styl2 = 'px-6 py-4 whitespace-nowrap'
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className={styl1}>Hospital Names</th>
            <th className={styl1}>Type of Bed</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {patients.map((patient, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className={styl2}>{patient.hospitalName}</td>
              <td className={styl2}>{patient.service}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PatientDetails = () => {
  const name = useSelector(state=>state?.user?.username)

  

  const [data, setData] = useState([])
  const fetFun=async()=>{
    const myData = await axios.get(`https://de-server.vercel.app/api/patients/${name}`)
    setData(myData.data)
  }
  useEffect(()=>{
    fetFun()
  },[])

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-semibold text-center mb-8">Patient Information</h1>
        <PatientTable patients={data} />
      </div>
    </div>
  );
};

export default PatientDetails;
