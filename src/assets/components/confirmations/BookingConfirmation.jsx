import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';

const ConfirmationPage = () => {
    const location = useLocation();
    const { bookingDetails } = location.state || {}

    if (!bookingDetails) {
        return (
            <div className="confirmation-container card">
                <h2>Booking Details Not Found</h2>
                <p>It looks like you've landed on the confirmation page directly or the booking details were not passed correctly.</p>
                <Link to="/" className="btn btn-primary">
                    <IoHomeOutline className="icon" /> Go to Homepage
                </Link>
            </div>
        );
    }

    const {
        bookingReference,
        bookingDate,
        title,
        eventDate,
        location: eventLocation, // Renamed to avoid conflict with `location` from useLocation
        firstName,
        lastName,
        email,
        selectedPackage,
        ticketQuantity,
        totalPrice,
    } = bookingDetails;

    const formattedEventDate = eventDate ? new Date(eventDate).toLocaleDateString('en-SE')  : 'N/A'
     const formattedBookingDate = bookingDate ? new Date(bookingDate).toLocaleDateString('en-SE')  : 'N/A'

    return (
        <div className="confirmation-container card">
            <div className="confirmation-header">
                <FaCheckCircle className="success-icon" />
                    <h1>Booking Confirmed!</h1>
                 
                    <div className="booking-reference">
                        <h3>Booking Reference:</h3>
                        <p className="reference-code">{bookingReference}</p>
                    </div>
                    <div className='booking-date'>
                        <h3>Booked on: <span>{formattedBookingDate}</span></h3> 
                    </div>
               
            </div>

            <div className="booking-details">
                <div className="detail-section">
                    <h3>Event Details</h3>
                    <p><span>Event:</span> {title}</p>
                    <p><span>Date:</span> {formattedEventDate}</p>
                    <p><span>Location:</span> {eventLocation}</p>
                </div>

                <div className="detail-section">
                    <h3>Your Information</h3>
                    <p><span>Name:</span> {firstName} {lastName}</p>
                    <p><span>Email:</span> {email}</p>
                    <p><span>Address:</span> {bookingDetails.streetName}, {bookingDetails.postalCode}, {bookingDetails.city}</p>
                </div>

                <div className="detail-section">
                    <h3>Ticket Details</h3>
                    <p><span>Package:</span> {selectedPackage?.title}</p>
                    <p><span>Seating:</span> {selectedPackage?.seatingArrangement}</p>
                    <p><span>Placement:</span> {selectedPackage?.placement}</p>
                    <p><span>Tickets:</span> {ticketQuantity}</p>
                    <p><span>Total Paid:</span> {selectedPackage?.currency}{totalPrice?.toFixed(2)}</p>
                </div>
                <div className="detail-section">
                    <p>A confirmation email has been sent to  </p>
                    <p><strong>{email}</strong></p>
                </div>
 
               {/* */} 
              
            </div>

            <div className="confirmation-footer">
                <Link to="/" className="btn btn-primary">
                    <IoHomeOutline className="icon" /> Back to Home
                </Link>
               
                <Link to="/allbookings" className="btn btn-admin">View My Bookings</Link>
            </div>
        </div>
    )
}

export default ConfirmationPage;