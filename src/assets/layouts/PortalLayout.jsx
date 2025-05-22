import React from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Main from '../components/Main/Main'
import Nav from '../components/Aside/Nav'

const PortalLayout = () => {
  return (
    <div className='portal-wrapper'>
       <Nav />
       <Header />
       <Main />
       <Footer />
    </div>
  )
}

export default PortalLayout