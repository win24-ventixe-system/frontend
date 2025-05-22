import React, { useState, useEffect } from 'react'
import EventCard from './EventCard'

const Events = () => {

    const [events, setEvents] = useState([])

    const getEvents = async() => {
        const res = await fetch("https://eventservice-ggakcsayb6baanh0.swedencentral-01.azurewebsites.net/api/Events")

        if(res.ok) {
            const response = await res.json()
            setEvents(response.result || [])
        }
    }

    useEffect(() => {
        getEvents()
    }, []) 

  return (
    <div>
        {
            events.map(event => (
                <EventCard key={event.id} item={event} />
            ))
        }
    </div>
  )
}

export default Events