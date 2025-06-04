import React, { useState } from 'react'
import VenueImage from '../../images/Venue_Map.svg'
import TicketBenefits from './TicketBenefits'
import Packages from './Packages'

const SeatPlan = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);



  return (
   <div className='seating-plan card'>
    <div className='seating-plan-title'>
        <h4>Seat Plan and Packages</h4>

    </div>

        <div className='seat-plan-distribution'>
          <div className='seat-plan-image'
              onMouseEnter={() => setIsPopupOpen(true)}
              onMouseLeave={() => setIsPopupOpen(false)}
              >
            <img className='venue-image' src={VenueImage} alt="event-venue"/>
          </div>

          {/* Popup with help by Chat GPT */}
         {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <img src={VenueImage} alt="Large venue map" />
            </div>
          </div>
        )}

          <div className='seat-plan-categories'>
              <Packages />

          </div>

      </div>
              
              
    </div>
  )
}

export default SeatPlan