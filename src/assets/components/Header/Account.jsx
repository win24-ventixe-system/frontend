import React, { useState } from 'react'
import Avatar from '../../../assets/images/avatar-default.svg'
import EditProfile from '../modals/EditProfile'
import AccountDropdown from '../dropdowns/AccountDropdown'
import { useAuth } from '../../contexts/AuthContext'



const Account = () => {
   const [isDropdownOpen, setDropdownOpen] = useState(false)
   const [isModalOpen, setModalOpen] = useState(false)

   const { authUser } = useAuth()
  
   const toggleDropdown = () => {
    setDropdownOpen(prev => !prev)
  }

  const handleProfileClick = (e) => { // help from chat gpt
    e.stopPropagation() 
    setDropdownOpen(false)
    setModalOpen(true)
  }

const handleCloseModal = () => {
    setModalOpen(false)
  }

   const fullName = authUser ? `${authUser.firstName || ''} ${authUser.lastName || ''}`.trim() : 'Admin User'
   const displayRole = authUser ? 'User' : 'Admin'
   const displayName = fullName || authUser?.email || 'User'
  
  
  return (
    <div className="account-container" onClick={toggleDropdown} type="button" tabIndex={0} onBlur={() => setDropdownOpen(false)}>
            
            <div className="user-image">
                <img src={Avatar} className='user-avatar' alt="avatar"/>
            </div>

            <div className="account-info">
                <span className="fullname">{displayName}</span>
                <span className="role">{displayRole}</span>
            </div>

                {isDropdownOpen && (
              
              <AccountDropdown  onProfileClick={handleProfileClick}/>
              )}

              {isModalOpen && <EditProfile onClose={handleCloseModal} />}
    </div>
  )
}

export default Account