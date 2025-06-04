import { useState, useEffect } from 'react'
import EventCard from './EventCard'
import AddEvent from '../modals/AddEvent'

const EventList = () => {

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [isAddModalOpen, setAddModalOpen] = useState(false)


    const getEvents = async() => {
        const res = await fetch("https://eventservice-ggakcsayb6baanh0.swedencentral-01.azurewebsites.net/api/Events")

        if(res.ok) {
            const response = await res.json()
            setEvents(response.result || [])
        }
    setLoading(false)
    }

    useEffect(() => {
        getEvents()
    }, []) 

    if (loading) {
    return <div className='loading'>Loading events...</div> 
  }

  return (
    <div className='event-list-page'>
        <div className='page-header'>
        <button type='button' className='btn btn-admin' onClick={() => setAddModalOpen(true)}>Add Event</button>
        </div>
    <div className='event-list'>
        {
            events.map(event => (
                <EventCard key={event.id} item={event} />
            ))
        }
        
    </div>
    {isAddModalOpen && <AddEvent onClose={() => setAddModalOpen(false)} />}

    </div>
  )
}

export default EventList