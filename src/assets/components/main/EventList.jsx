import { useState, useEffect } from 'react'
import EventCard from './EventCard'
import AddEvent from '../modals/AddEvent'
import { useAuth } from '../../contexts/AuthContext'


const EventList = () => {

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [isAddModalOpen, setAddModalOpen] = useState(false)
    
    const { user } = useAuth() // Get the user object from AuthContext
   
    // Determine if the logged-in user is an admin
    const isAdmin = user && user.role === 'Admin'

    const getEvents = async() => {
        const res = await fetch("https://eventservice-ventixe-2025-evecf8epa0azawhq.swedencentral-01.azurewebsites.net/api/Events")

        if(res.ok) {
            const response = await res.json()
            setEvents(Array.isArray(response.result?.$values) ? response.result.$values : [])
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
        <div className='page-header' >
           
           {isAdmin && ( // Conditionally render if "isAdmin" is true
                    <>
                        <span style={{ color: 'red', fontWeight: 'bold', fontSize: '14px', backgroundColor: '#ffeaea', padding: '4px 8px', borderRadius: '4px' }}>
                            Only for ADMIN:
                        </span>
                        <button type='button' className='btn btn-admin' onClick={() => setAddModalOpen(true)}>
                            Add Event
                        </button>
                    </>
                )}
        
        </div>

    <div className='event-list'>
        {
            events.length > 0 ? (
                        events.map(event => (
                            <EventCard key={event.id} item={event} />
                        ))
                    ) : (
                        <p>No events found.</p> 
                    )
        }
        
    </div>
    {isAddModalOpen && <AddEvent onClose={() => setAddModalOpen(false)} />}

    </div>
  )
}

export default EventList