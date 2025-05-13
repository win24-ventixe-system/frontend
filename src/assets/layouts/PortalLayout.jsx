import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const PortalLayout = () => {
  return (
    <div className='portal-wrapper'>
       <Nav />
       <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default PortalLayout