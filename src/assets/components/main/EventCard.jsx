import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";
import EventImage from '../../images/festival-3466251_1280.jpg'
import EditEvent from '../modals/EditEvent'
import { FaEllipsis } from "react-icons/fa6"
import EventDropdown from '../dropdowns/EventDropdown'


const EventCard = ({item }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)

    const toggleDropdown = () => {
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
  
  return (
  
    <div className='event card'>

      <div className='card-header'>
        <div className='admin-button' onClick={toggleDropdown} type="button" tabIndex={0} onBlur={() => setDropdownOpen(false)}> 
              <FaEllipsis className='ellipsis-button'/>
        </div>

        {isDropdownOpen && (
              
              <EventDropdown  onDropdownActionClick={handleDropdownActionClick}/>
              )}

              {isModalOpen && <EditEvent onClose={handleCloseModal} />}

      </div>

      <div className='card-body'> 
        <Link to={`/events/${item.id}`}>
          <div className='image-container'>
              <img className='event-image' src={EventImage} alt="event image"/>
          </div>
        </Link>
        <div className='date-time'>
            <span className='date'>{item.eventDate}</span>
          </div>
            <Link to={`/events/${item.id}`}>
          <h3 className='event-title'>{item.title}</h3>
          </Link>
          <div className='event-location'>
              <CiLocationOn />            
              <span className='StreetName'>Sunset Park,</span>
              <span className='City'>Los Angeles,</span>
              <span className='Country'>CA</span>
          </div>
      </div>
     
          <div className='card-footer'>
             <Link to={`/events/${item.id}`}>
              <button className='btn btn-check-event'>Check Event</button>
              </Link>
                <div className='event-price'>
                    <p>Starts from</p>
                    <span className="price-standard">$<span className='price'>60</span></span>
                </div>
          
          </div>

          
    </div>
   

  )
}

export default EventCard