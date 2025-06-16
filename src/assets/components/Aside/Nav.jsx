import React from 'react'
import { NavLink } from 'react-router-dom'
import VentixeIcon from '/images/icon_ventixe.svg'
import { LuLayoutDashboard } from "react-icons/lu"
import { BsTicketPerforated } from "react-icons/bs"
import { GrCheckboxSelected } from "react-icons/gr"
import { MdOutlineLogout } from "react-icons/md"
import { FaUsers } from "react-icons/fa"
import SignOut from './SignOut'


// Pass user as a prop or get it from context/store

const Nav = ({user}) => {
    const isAdmin = user?.roles?.includes("Admin");

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

        <NavLink to="/mybookings" className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}>
        <span style={{ color: 'red', fontWeight: 'bold',fontSize: '14px', backgroundColor: '#ffeaea', padding: '4px 8px', borderRadius: '4px'
}}>USER:</span>
      <GrCheckboxSelected />
      <span>My Bookings</span>
      </NavLink>
 {isAdmin && (
            <>
              <NavLink to="/allbookings" className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}>
                <span style={{
                  color: 'red', fontWeight: 'bold', fontSize: '14px', backgroundColor: '#ffeaea',
                  padding: '4px 8px', borderRadius: '4px'
                }}>ADMIN:</span>
                <GrCheckboxSelected />
                <span>All Bookings</span>
              </NavLink>

              <NavLink to="/users" className={({ isActive }) => isActive ? 'navlink active' : 'navlink'}>
                <span style={{
                  color: 'red', fontWeight: 'bold', fontSize: '14px', backgroundColor: '#ffeaea',
                  padding: '4px 8px', borderRadius: '4px'
                }}>ADMIN:</span>
                <FaUsers />
                <span>Users</span>
              </NavLink>
            </>
          )}

        </nav>
</div>
      
  
    <div className="nav-bottom btn btn-signout">
      <MdOutlineLogout />
        <SignOut />
     </div>
  
   </aside>
  )    
}

export default Nav
