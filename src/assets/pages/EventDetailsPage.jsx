import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const EventDetailsPage = () => {

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
    <div className='event-details'>
        <h1>{event.title}</h1>
        <Link to={`/events/booking/${id}`}>Book Event</Link>

    </div>
  )
}

export default EventDetailsPage