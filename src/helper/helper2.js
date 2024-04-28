import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.baseURL = 'https://de-server.vercel.app'
import {jwtDecode} from 'jwt-decode'

export const addPatient=async(userData)=>{
    try{
        const {data: {msg}} = await axios.post(`/api/addPatient`,userData)
        return Promise.resolve(msg)
    }
    catch(error){
        return Promise.reject({error})
    }
}
export const register=async(userData)=>{
    try{
        const {data: {msg},status} = await axios.post(`/api/pRegister`,userData)
        return Promise.resolve(msg)
    }
    catch(error){
        return Promise.reject({error})
    }
}
export const login=async({username,password})=>{
    try{
        const {data} = await axios.post(`/api/pLogin`,{username,password})
        return Promise.resolve({data})
    }
    catch(error){
        return Promise.reject({error: "Password does not match"})
    }
}
export const incHospital=async(name)=>{
    try{
        const {data} = await axios.put(`/api/plusHospital`,{hospitalName: name})
        return Promise.resolve({data})
    }
    catch(error){
        return Promise.reject({error: "Somting went wrong"})
    }
}

export const searchHospital=async()=>{
    try{
        const {data} = await axios.get(`/api/getHospitals`)
        return Promise.resolve({data})
    }
    catch(error){
        return Promise.reject({error: "Somting went wrong"})
    }
}
export const searchPatient=async(hospital)=>{
    try{
        const {data} = await axios.get(`/api/getPatients`,{hospital})
        return Promise.resolve({data})
    }
    catch(error){
        return Promise.reject({error: "Somting went wrong"})
    }
}
export const updateHospital=async(hospitalName)=>{
    try{
        const {data} = await axios.put(`/api/book`,{hospitalName})
        return Promise.resolve({data})
    }
    catch(error){
        return Promise.reject({error: "Somting went wrong"})
    }
}

export const generateMail=async(obj)=>{
    try{
        const text = `Thank you for reaching out to us and for choosing <strong>${obj.hospital}</strong> for your healthcare needs. 
                        We're delighted to confirm that we have received your bed reservation request`
        const subject = `Confirmation of Bed Reservation at ${obj.hospital}`

        const {data} = await axios.post(`api/getMail`,{username: obj.username, email: obj.email, text, subject})
        return Promise.resolve({data})
    }
    catch(error){
        return Promise.reject({error})
    }
}