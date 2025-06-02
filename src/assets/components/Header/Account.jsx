import React, { useState } from 'react'
import Avatar from '../../../assets/images/avatar-default.svg'
import EditProfile from '../modals/EditProfile'
import AccountDropdown from '../dropdowns/AccountDropdown'
const Account = () => {
   const [isDropdownOpen, setDropdownOpen] = useState(false)
   const [isModalOpen, setModalOpen] = useState(false)
  
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
  
  
  return (
    <div className="account-container" onClick={toggleDropdown} type="button" tabIndex={0} onBlur={() => setDropdownOpen(false)}>
            
            <div className="user-image">
                <img src={Avatar} className='user-avatar' alt="avatar"/>
            </div>

            <div className="account-info">
                <span className="fullname">Orlando Laurentius</span>
                <span className="role">User</span>
            </div>

                {isDropdownOpen && (
              
              <AccountDropdown  onProfileClick={handleProfileClick}/>
              )}

              {isModalOpen && <EditProfile onClose={handleCloseModal} />}
    </div>
  )
}

export default Account