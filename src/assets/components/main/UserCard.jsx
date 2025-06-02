import React, { useState} from 'react'
import { FaEllipsis } from "react-icons/fa6"
import UserImage from  '../../images/avatar-default.svg'
import UserDropdown from '../dropdowns/UserDropdown'
import EditUser from '../modals/EditUser'



const UserCard = () => {
     const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)

    const toggleDropdown = () => {
    setDropdownOpen(prev => !prev)
  }

  // by chat gpt - This function will be passed down to UserDropdown
    const handleOpenEditModal = () => {
        setDropdownOpen(false); // Close the dropdown when modal opens
        setModalOpen(true);
    };
      
     const handleCloseModal = () => {
    setModalOpen(false)
  }
  return (
    <div className='user card'>
        <div className='card-header'>
            <div className='admin-button' onClick={toggleDropdown} type="button" tabIndex={0} onBlur={() => setDropdownOpen(false)}>
        {isDropdownOpen && (
              
            <UserDropdown  onOpenEditModal={handleOpenEditModal} />
        )}

              {isModalOpen && <EditUser onClose={handleCloseModal} />} 
              <FaEllipsis className='ellipsis-button'/>
        </div>
        </div>
        <div className='card-body'>
            <div className='image-container square'>
              <img className='user-image' src={UserImage} alt="user image"/>
            </div>
            <h3 className='user-name'>Anton Mosquera</h3>
            <span className='user-email'>anton@domain.com</span>
            <span className='user-phone'>0767051321</span>
            <div className='user-address'>
                <span className='user-streetname'>DennaVägen 35</span>
            <div className='user-postalcode-city'> 
                 <span className='user-postalcode'>24567</span>
                <span className='user-city'>Här</span>
            </div>
               
            </div>

            <div className='user-role'>
                <span className=''>
                    Role
                </span>
            </div>
        </div>

    </div>
  )
}

export default UserCard