import { useEffect, useState } from 'react'
import AllBookingsListItem from '../components/main/AllBookingsListItem'

const AllBookings = () => {
  // State that  hold bookings and loading status
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true) // Show loading indicator while fetching
      try {
      //const API_BASE_URL = import.meta.env.VITE_API_URL;

       // Fetch all bookings from backend
      //const res = await fetch(`${API_BASE_URL}/api/Bookings`)
        const res = await fetch('https://bookingservice-ventixe-2025.azurewebsites.net/api/Bookings')
        if (!res.ok) throw new Error(`Booking fetch failed: ${res.status}`);

    const data = await res.json()
    const bookingList = data.result || []

    // For each booking, fetch related event info
      const bookingsWithEventInfo = await Promise.all(
            bookingList.map(async (b) => {
              try {
                // Fetch event details using eventId
              const eventRes = await fetch(`https://eventservice-ventixe-2025-evecf8epa0azawhq.swedencentral-01.azurewebsites.net/api/Events/${b.eventId}`);
              if (!eventRes.ok) throw new Error();

            const eventData = await eventRes.json()
              const event = eventData.result;

              // Find the package the user booked to get price
              const bookedPackage = event.packages?.$values?.find(pkg => pkg.id === b.packageId)
            const packagePrice = bookedPackage?.price ?? 0

            // Return enriched booking object with event info
              return {
                ...b,
                eventTitle: event.title,
                eventDate: event.eventDate,
                eventLocation: event.location,
                perTicketPrice: packagePrice,
              };
            } catch {
              // Handle failed event fetch gracefully with fallbacks
              return {
                ...b,
                eventTitle: 'Event not found',
                eventDate: null,
                eventLocation: 'Unknown',
                perTicketPrice: 0,
                firstName: b.owner?.firstName || b.firstName || 'N/A',
                lastName: b.owner?.lastName || b.lastName || 'N/A',
                email: b.owner?.email || b.email || 'N/A',
              }
            }
          })
        );
        // Update state with all enriched bookings
        setBookings(bookingsWithEventInfo)
      } catch (err) {
        console.error('Failed to load bookings:', err)
        setBookings([]) // Empty list on error
      } finally {
        setLoading(false)  // Hide loading indicator

      }
    };

    fetchData()  // Trigger fetch when component mounts
  }, []);
 // Show loading message while fetching data
  if (loading) return <p>Loading bookings...</p>

 

        
  return (
    <div className="card albookings-table">
      <table>
        <thead>
          <tr>
            <th className="booking-reference">Booking Reference </th>
            <th className="booking-date">Booking Date</th>
            <th className="booking-client">Booking Client</th>
            <th className="event-info">Event </th>
            <th className="event-date">Date</th>
            <th className="event-price">Price</th>
            <th className="event-tickets">Tickets</th>
            <th className="event-total">Total</th>
            <th className="event-action"></th>
          </tr>
        </thead>
        <tbody>
          

               {bookings.map((booking) => (
              <AllBookingsListItem key={booking.id} booking={booking} />
          ))}

     
        </tbody>
      </table>
    </div>
  )
}

export default AllBookings