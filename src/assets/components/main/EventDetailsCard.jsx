import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CiCalendar, CiLocationOn } from "react-icons/ci"
import { IoChevronBackCircleOutline } from "react-icons/io5";



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

    const lowestPrice = event.packages && event.packages.length > 0
  ? event.packages.reduce((min, pkg) => (pkg.price < min ? pkg.price : min), event.packages[0].price)
  : null; // gets the lowest price out of all the packages prices

   // --- Date Formatting Logic (MOVED HERE) ---
    const formattedDate = event.eventDate ? event.eventDate.substring(0, 10) : ''

  return (
    <div className='event-details card'>
        <div className='card-header'>
            <div className='image-container'>
            <img className='event-details-image' src={event.image}  alt="event-image"/>
            </div>
            
                {/*  <div className='event-tags'>
                    <div className="event-type-tag">
                        <span>Music</span>
                    </div>
                    <div className='tag-status'>
                        <span className='dot'></span>
                        <span className='dot-red active'>Active</span>
                    </div>            
            </div>   */}
        </div>
               

        <div className='card-bottom'>

            <div className="card-body">

                <h2 className='event-details-header'>{event.title}</h2>
        

                <div className='event-details-info'>
                <div className='date-time'>
                            <CiCalendar />
                            <span className='date'>{formattedDate}</span>
                            
                </div>
                <div className='event-location'>
                            <CiLocationOn />            
                            <span className='StreetName'>{event.location}</span>
                </div>
                {
                    event.packages?.map((pkg) =>(

                        <div key={pkg.id} className='event-price'>
                        <p>Starts from</p>
                
                        <span className="price-standard">
                            <span>{pkg.currency} {lowestPrice}</span>
                        </span>
                    </div>
                        
                    ))
                }
                

                <div className='divider'></div>
                <div className='event-details-about'>
                    <h5>About Event</h5>
                    <span className='event-description'>{event.description}.</span>
                </div>
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