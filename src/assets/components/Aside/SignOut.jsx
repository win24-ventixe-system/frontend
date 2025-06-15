import React from 'react'

import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { MdOutlineLogout } from "react-icons/md"


const SignOut = () => {
    const { logout, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    // Function to handle the sign-out click
    const handleSignOut = () => {
        logout() // Call the logout function from AuthContext
        navigate('/') 
    }

    if (!isAuthenticated) {
        return null; // Don't render the sign-out button if not logged in
    }
  
  return (
        
        <span onClick={handleSignOut}>
          <MdOutlineLogout />
          Sign out
          </span>
   
  )
}

export default SignOut