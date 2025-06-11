import React from 'react'
import { Link } from 'react-router-dom'

const AllBookingsListItem = ({booking}) => {
      if (!booking) return null;


   const {
  id,
  bookingDate,
  eventTitle ,
  eventDate,
  ticketQuantity,
  perTicketPrice,
  eventId,
  eventLocation,
  firstName,
  lastName,
  email
} = booking

console.log("Booking object:", booking);
  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString('en-SE') 
    : 'N/A'
  
     const formattedBookingDate = bookingDate
    ? new Date(bookingDate).toLocaleDateString('en-SE') 
    : 'N/A'


 

  return (
     <tr>
      <td className="event-reference-data">{id}</td>
      <td className="booking-date-data">{formattedBookingDate}</td>
      <td className="booking-client-data">
        <div>{firstName}{lastName}</div>
        <div className='client-email-data'>{email}</div>
      </td>
      <td className="event-info-data"> 
        <div className="event-title-data">{eventTitle}</div> 
        <div> {eventLocation}</div>
        </td>
      <td className="event-date-data">{formattedDate}</td>
      <td className="event-price-data">${perTicketPrice}</td>
      <td className='event-tickets-data'>{ticketQuantity}</td>
      <td className="event-total-data">${ Number(booking.totalPrice).toFixed(2) }</td>
      <td className="event-action-data">
        <Link to={`/events/${eventId}`}>
          <button className="btn btn-check-event">Check Event</button>
        </Link>
      </td>
    </tr>
      
  )
}

export default AllBookingsListItem