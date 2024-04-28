import React from 'react'
import Navbar from './Navbar'
import { Outlet, ScrollRestoration } from 'react-router-dom'

function MainLayout() {
  return (
    <div className='overflow-x-hidden'>
        <ScrollRestoration
            getKey={(location, matches) => {
            return location.pathname;
        }}
        />
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default MainLayout