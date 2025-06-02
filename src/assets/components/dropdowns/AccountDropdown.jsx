import React from 'react'
import { CgProfile } from "react-icons/cg"
import { GoSignOut } from "react-icons/go"



const AccountDropdown = ({ onProfileClick }) => {
  return (
    <div className="dropdown-actions" onMouseDown={(e) => e.preventDefault()}>

            <span className="dropdown-action" onClick={onProfileClick}>
                <CgProfile />
                My Profile
            </span>
            <span className="dropdown-action"> 
                <GoSignOut />
                Sign Out 
            </span>


    </div>
  )
}

export default AccountDropdown