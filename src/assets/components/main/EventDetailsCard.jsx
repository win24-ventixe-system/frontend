import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CiCalendar, CiLocationOn } from "react-icons/ci"
import { IoChevronBackCircleOutline } from "react-icons/io5";
import EventImage from '../../images/festival_EcoBeats.jpg'


const EventDetailsCard = () => {


    const {id} = useParams()
        const [event, setEvent] = useState({})
    
        const getEvent = async() => {
        const res = await fetch(`https://eventservice-ggakcsayb6baanh0.swedencentral-01.azurewebsites.net/api/Events/${id}`)
    
            if(res.ok) {
                const response = await res.json()
                setEvent(response.result)
            }
        }
    
        useEffect(() => {
            getEvent()
        }, []) 

  return (
    <div className='event-details card'>
        <div className='card-header'>
            <img className='event-details-image' src={EventImage} alt=""/>
                <div className='event-tags'>
                    <div className="event-type-tag">
                        <span>Music</span>
                    </div>
                    <div className='tag-status'>
                        <span className='dot'></span>
                        <span className='dot-red active'>Active</span>
                    </div>            
            </div>
        </div>
               

        
    
        <div className="card-body">

                <h2 className='event-details-header'>{event.title}</h2>
        

            <div className='event-details-info'>
                <div className='date-time'>
                            <CiCalendar />
                            <span className='date'>May 20, 2019</span>
                            <span> - </span>
                            <span className='time'>6:00 PM</span>
                </div>
                <div className='event-location'>
                            <CiLocationOn />            
                            <span className='StreetName'>Sunset Park,</span>
                            <span className='City'>Los Angeles,</span>
                            <span className='Country'>CA</span>
                </div>
                <div className='event-price'>
                    <p>Starts from</p>
                    <span className="price-standard">$<span className='price'>60</span></span>
                </div>

                <div className='divider'></div>
                <div className='event-details-about'>
                    <h6>About Event</h6>
                    <span className='event-description'>The Echo Beats Festival brings together a stellar lineup of artists 
                        across EDM, pop, and hip-hop genres. Prepare to experience a night of electrifying music, 
                        vibrant light shows, and unforgettable performances under the stars. 
                        Explore food trucks, art installations, and VIP lounges for an elevated experience.</span>
                </div>
            </div>
        <div className='card-footer'>
            <Link to={`/events/booking/${id}`} className='btn btn-book-event'>Book Event</Link>
            <Link to={"/events"} className='btn btn-back'>
            <IoChevronBackCircleOutline />
            Back to List
        </Link>
        </div>
        
        
    </div> 
            
    </div>
  )
}

export default EventDetailsCard