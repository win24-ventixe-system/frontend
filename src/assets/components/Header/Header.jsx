import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import Account from './Account'
import Headline from './Headline'
import { useAuth } from '../../contexts/AuthContext'

const Header = () => {
 const { isAuthenticated } = useAuth()

  return (
    <header>
    
      <Headline />
      <SearchBar/>
      {isAuthenticated ? (
                
                <Account />
                ) : (
                //user is NOT authenticated, render Sign In and Sign Up buttons
                <div className="auth-actions"> {/* You might want to style this div */}
                    <Link to="/signin" className="btn btn-primary">Sign In</Link> {/* Use Link for navigation */}
                    <Link to="/signup" className="btn btn-secondary">Sign Up</Link> {/* Adjust classes as per your CSS */}
                </div>
            )}

 
      
    </header>
  )
}

export default Header
