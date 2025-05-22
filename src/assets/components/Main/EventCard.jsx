import React from 'react'
import { Link } from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";

const EventCard = ({item}) => {
  return (
  
        <div className='event card'>
          <div className='event-image-container'>
            <img className='event-image' src="/images/festival-3466251_1280.jpg" alt="event image"/>
          </div>
          <div className='date-time'>
            <span className='date'>May 20, 2019 </span>
            <span className='time'>6:00 PM</span>
          </div>
            <Link to={`/events/${item.id}`}>
          <div>{item.title}</div>
          </Link>
          <div className='location'>
          <CiLocationOn />            
          <span>Sunset Park</span>
            <span>Los Angeles</span>
            <span>CA</span>
          </div>
          <div className='price'>
            $<span>60</span>
          </div>
        </div>
   

  )
}

export default EventCard