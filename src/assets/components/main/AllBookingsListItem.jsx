import React from 'react'
import { Link } from 'react-router-dom'

const AllBookingsListItem = ({event}) => {
    

  return (
     <tr>
              <td className="event-info">
                <img className="event-image" src="public/images/icon_ventixe.svg" alt="event" />
                <div className="event-title">Echo Beats Festival</div>
                <div className='event-location'>
                    <div className="event-streetname">Sunset Park</div>
                    <div className="event-postalcode-city">
                        <span>12345</span>
                        <span>LA</span>
                    </div>
                </div>
                
             
              </td>

              <td className="event-date">May 20, 2019</td>
              <td className="event-time">6:00 PM</td>
              <td className="event-price">$60</td>
              <td className="event-tickets">2</td>
              <td className="event-total_price">$120</td>
              <td>
                  <Link>
                    <button className='btn btn-check-event'>Check Event</button>
                </Link>
              </td>
            

              
    </tr>
      
  )
}

export default AllBookingsListItem