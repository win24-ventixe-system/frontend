import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";
import EditEvent from '../modals/EditEvent'
import { FaEllipsis } from "react-icons/fa6"
import EventDropdown from '../dropdowns/EventDropdown'


const EventCard = ({item }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)

    const toggleDropdown = (e) => {
      e.stopPropagation() // to handle the current click event and not others on the site 
    setDropdownOpen(prev => !prev)
  }

   const handleDropdownActionClick = (e) => { // help from chat gpt
    e.stopPropagation() 
    setDropdownOpen(false)
    setModalOpen(true)
  }
      
     const handleCloseModal = () => {
    setModalOpen(false)
  }
  // lowest package price
  const lowestPrice = item.packages && item.packages.length > 0
    ? item.packages.reduce((min, pkg) => (pkg.price < min ? pkg.price : min), item.packages[0].price)
    : null;

    // --- Date Formatting Logic for YYYY-MM-DD ---
  const formattedDate = item.eventDate ? item.eventDate.substring(0, 10) : ''

  return (
  
    <div className='event card'>

      <div className='admin-controls-wrapper'>
        <div className='admin-button' onClick={toggleDropdown} type="button" tabIndex={0} onBlur={() => setDropdownOpen(false)}> 
              <FaEllipsis className='ellipsis-button'/>
        </div>

        {isDropdownOpen && (<EventDropdown  onDropdownActionClick={handleDropdownActionClick}/> )}
        {isModalOpen && <EditEvent onClose={handleCloseModal} />}

      </div>

      <Link to={`/events/${item.id}`}> 
        <div className='card-body'>
            <div className='image-container'>
                <img className='event-image' src={item.image} alt="event image"/>
            </div>
            <div className='date-time'>
                <span className='date'>{formattedDate}</span>
            </div>
            <h3 className='event-title'>{item.title}</h3>
            <div className='event-location'>
                <CiLocationOn />
                <span className='StreetName'>{item.location}</span>
            </div>
        </div>
    </Link>
     
          <div className='card-footer'>
             <Link to={`/events/${item.id}`}>
              <button className='btn btn-check-event'>Check Event</button>
              </Link>
                <div className='event-price'>
                    <p>Starts from</p>
                    <span className="price-standard">$<span className='price'>{lowestPrice}</span></span>
                </div>
          
          </div>

          
    </div>
   

  )
}

export default EventCard