import React from 'react'
import { NavLink } from 'react-router-dom'
import VentixeIcon from '/images/icon_ventixe.svg'
import { LuLayoutDashboard } from "react-icons/lu"
import { BsTicketPerforated } from "react-icons/bs"
import { GrCheckboxSelected } from "react-icons/gr"
import { FaUsers } from "react-icons/fa"
import SignOut from './SignOut'





const Nav = () => {
  return (
    
   <aside className='sidebar'>

<div className='nav-top'>
    <div className="ventixe-logotype">
      <NavLink to="/">
      <img className='company-icon' src={VentixeIcon} alt="company icon"/>
      <span>Ventixe</span>
      </NavLink>
      </div>
      

      <nav>
       <NavLink to="/" className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}>
      <LuLayoutDashboard />
      <span>Dashboard</span>
      </NavLink>

      <NavLink to="/events" className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}>
      <BsTicketPerforated />
      <span>Events</span>
      </NavLink>

      <NavLink to="/allbookings" className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}>
      <GrCheckboxSelected />
      <span>My Bookings</span>
      </NavLink>

      <NavLink to="/users" className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}>
      <FaUsers />
      <span>Users</span>
      </NavLink>

     
    </nav>
</div>
      
  
  
    <NavLink to="" className="nav-bottom">
        <SignOut />
     </NavLink>
  
   </aside>
  )    
}

export default Nav