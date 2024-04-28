import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from './components/tools/MainLayout'
import HospitalPage from './components/hospital/HospitalPage'
import Lists from './components/hospital/Lists'
import NotFound from './components/tools/NotFound'
import Patient from './components/hospital/Patient'
import LoadLocation from './components/hospital/LoadLocation'
import HomePage from './components/hospital/HomePage'
import Book from './components/hospital/Book'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserDashboard from './components/auth/Dashboard'
import PatientBooks from './components/hospital/PatientBooks'
import UserProfile from './components/auth/Profile'
import PatientDetails from './components/hospital/PatientDetails'
import AdminPage from './components/hospital/AdminPage'
import Database from './components/hospital/Database'
import useGeoLocation from '../src/components/hospital/useGeoLocation'
import { setLat, setLon } from '../src/store/slices/locationSlice'
import { useEffect } from 'react'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout/>,
      children: [
        // {path: '/', element: <Search/>},

        {path: '/', element: <HomePage/>},
        {path: '/lists', element: <Lists/>},
        {path: '/hospital/:id', element: <HospitalPage/>},
        {path: '/patient', element: <Patient/>},
        {path: '/load', element: <LoadLocation/>},
        {path: '/book/:id', element: <Book/>},

        {path: '/login', element: <Login/>},
        {path: '/register', element: <Register/>},
        {
          path: '/profile', 
          element: <UserDashboard/>,
          children: [
            // {path: '/profile', element: <HospitalBeds/>},
            {path: '/profile', element: <AdminPage/>},
            {path: '/profile/paitentDetail', element: <PatientDetails/>},
            {path: '/profile/paitents/:id', element: <PatientBooks/>},
            {path: '/profile/user', element: <UserProfile/>},
            {path: '/profile/database', element: <Database/>},
          ]
        },

        {path: '*', element: <NotFound/>}
      ]
    }
  ])
  const latitude = useSelector(s => s?.location?.latitude)
  const longitude = useSelector(s => s?.location?.longitude)

    const dispatch = useDispatch()
    const location = useGeoLocation()

    useEffect(() => {
        if(latitude == ''){
            if (location.loaded && location.coordinates.lat != '') {
                dispatch(setLat(location.coordinates.lat))
                dispatch(setLon(location.coordinates.lng))
            }
        }
     }, [location.loaded,latitude,longitude]);

  return (
    <RouterProvider router={router} />
  )
}

export default App