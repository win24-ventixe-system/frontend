import React from 'react'
import { Link } from 'react-router-dom'

const AllBookingsListItem = ({booking}) => {
      if (!booking) return null;


   const {
  eventTitle = 'Untitled Event',
  eventDate,
  totalPrice,
  ticketQuantity,
  eventId,
  eventLocation = 'Unknown Location'
} = booking;

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString()
    : 'Date not provided';

  const perTicketPrice = ticketQuantity && totalPrice
    ? (totalPrice / ticketQuantity).toFixed(2)
    : 'N/A';

  const totalDisplay = totalPrice ? `$${totalPrice.toFixed(2)}` : 'N/A'

  return (
     <tr>
      <td className="event-reference">{eventId}</td>
      <td className="event-info">
        <div className="event-title">{eventTitle}</div>
      </td>
      <td className="event-location">{eventLocation}</td>
      <td className="event-date">{formattedDate}</td>
      <td className="event-price">{perTicketPrice !== 'N/A' ? `$${perTicketPrice}` : 'N/A'} </td>
    <td className='event-tickets'>{ticketQuantity}</td>
      <td className="event-total">{totalDisplay}</td>
      <td className="event-action">
        <Link to={`/events/${eventId}`}>
          <button className="btn btn-check-event">Check Event</button>
        </Link>
      </td>
    </tr>
      
  )
}

export default AllBookingsListItem