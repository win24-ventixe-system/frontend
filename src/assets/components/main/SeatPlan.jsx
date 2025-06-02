import React, { useState } from 'react'
import VenueImage from '../../images/Venue_Map.svg'
import DiamondCategory from '../../images/Diamond_Category.svg'
import PlatinumCategory from '../../images/Platinum_Category.svg'
import VipCategory from '../../images/VIP_Category.svg'
import GoldCategory from '../../images/Gold_Category.svg'
import SilverCategory from '../../images/Silver_Category.svg'
import BronzeCategory from '../../images/Bronze_Category.svg'
import GeneralCategory from '../../images/General_Category.svg'
import BackstageCategory from '../../images/Backstage_Access_Category.svg'
import TicketBenefits from './TicketBenefits'

const SeatPlan = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);



  return (
   <div className='seating-plan card'>
        <h4>Seat Plan</h4>
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
              <img src={DiamondCategory} alt="ticket category description"/>
              <img  src={PlatinumCategory} alt="ticket category description"/>
              <img  src={GoldCategory} alt="ticket category description"/>
              <img src={SilverCategory} alt="ticket category description"/>
              <img src={BronzeCategory} alt="ticket category description"/>
              <img src={GeneralCategory} alt="ticket category description"/>
              <img src={BackstageCategory} alt="ticket category description"/>
              <img src={VipCategory} alt="ticket category description"/>
          </div>

        <TicketBenefits />
      </div>
    </div>
  )
}

export default SeatPlan