import React from 'react'
import { CgProfile } from "react-icons/cg"
import { GoSignOut } from "react-icons/go"
import SignOut from '../Aside/SignOut'
import { MdOutlineLogout } from "react-icons/md"



const AccountDropdown = ({ onProfileClick }) => {
  return (
    <div className="dropdown-actions" onMouseDown={(e) => e.preventDefault()}>

            <span className="dropdown-action" onClick={onProfileClick}>
                <CgProfile />
                My Profile
            </span>
            <span className="dropdown-action"> 
               <MdOutlineLogout />
               <SignOut />
            </span>


    </div>
  )
}

export default AccountDropdown