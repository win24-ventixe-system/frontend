import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AllBookingsListItem from '../components/main/AllBookingsListItem'

const MyBookings = () => {
    const {id} = useParams()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    
        const getEvents = async() => {
        const res = await fetch(`https://eventservice-ggakcsayb6baanh0.swedencentral-01.azurewebsites.net/api/Events/${id}`)
    
            if(res.ok) {
                const response = await res.json()
                setEvents(response.result)
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
    <div className="card albookings-table">
      <table>
        <thead>
          <tr>
            <th className="event-info">Event </th>
            <th className="event-date">Date</th>
            <th className="event-time">Time</th>
            <th className="event-price">Price</th>
            <th className="event-tickets">Tickets</th>
            <th className="event-tickets">Total</th>
            <th className="event-tickets"></th>
          </tr>
        </thead>
        <tbody>
               {(events || []).map(event => (
              <AllBookingsListItem key={event.id} event={event} />
          ))}

         <AllBookingsListItem />
           
        </tbody>
      </table>
    </div>
  )
}

export default MyBookings

