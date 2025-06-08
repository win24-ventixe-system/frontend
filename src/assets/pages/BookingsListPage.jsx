import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import AllBookingsListItem from '../components/main/AllBookingsListItem'
import { IoHomeOutline } from 'react-icons/io5'

const MyBookings = () => {
     
  const location = useLocation();
  const [bookings, setBookings] = useState(location.state?.bookingList || [])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
try {
  const res = await fetch('https://bookingservice-ventixe-2025.azurewebsites.net/api/Bookings')
      const bookingData = await res.json()
      const bookings = bookingData.result
      console.log(bookings[0])

      // Fetch event data for each booking
      const bookingsWithEventInfo = await Promise.all(
        bookings.map(async (b) => {
          const eventRes = await fetch(`https://eventservice-ventixe-2025-evecf8epa0azawhq.swedencentral-01.azurewebsites.net/api/Events/${b.eventId}`);
          const event = await eventRes.json();
          return {
            ...b,
            eventTitle: event.title,
            eventDate: event.date,
            eventLocation: event.location,
            totalPrice: event.price * b.ticketQuantity
          }
        })
      )

    setBookings(bookingsWithEventInfo);
    }
        catch(err) {
          console.error('Failed to load bookings:', err)
        } finally{setLoading(false)}
  }
   if (!location.state?.bookingList) {
    fetchData();
  }
}, [location.state])

  if (loading) return <p>Loading bookings...</p>

  if (!bookings.length) {
    return (
      <div className="confirmation-container card">
        <p>No bookings</p>
        <Link to="/" className="btn btn-primary">
          <IoHomeOutline className="icon" /> Go to Homepage
        </Link>
      </div>
    )
  }

        
  return (
    <div className="card albookings-table">
      <table>
        <thead>
          <tr>
            <th className="event-reference">Booking Reference </th>
            <th className="event-info">Event </th>
            <th className="event-location">Location</th>
            <th className="event-date">Date</th>
            <th className="event-price">Price</th>
            <th className="event-tickets">Tickets</th>
            <th className="event-total">Total</th>
            <th className="event-action"></th>
          </tr>
        </thead>
        <tbody>

               {bookings.map((booking) => (
              <AllBookingsListItem key={booking.bookingId} booking={booking} />
          ))}

     
        </tbody>
      </table>
    </div>
  )
}

export default MyBookings

