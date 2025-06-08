import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';

const ConfirmationPage = () => {
    const location = useLocation();
    const { bookingDetails } = location.state || {}

    if (!bookingDetails) {
        // Handle cases where direct navigation or state is missing
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
        title,
        eventDate,
        location: eventLocation, // Renamed to avoid conflict with `location` from useLocation
        firstName,
        lastName,
        email,
        selectedPackage,
        ticketQuantity,
        totalPrice,
        bookingReference, // Assuming your backend returns this
    } = bookingDetails;

    const formattedEventDate = eventDate ? new Date(eventDate).toLocaleDateString() : 'N/A';

    return (
        <div className="confirmation-container card">
            <div className="confirmation-header">
                <FaCheckCircle className="success-icon" />
                <h1>Booking Confirmed!</h1>
                <p>Your booking was successful. Here are your details:</p>
            </div>

            <div className="booking-details">
                <div className="detail-section">
                    <h3>Event Details</h3>
                    <p><strong>Event:</strong> {title}</p>
                    <p><strong>Date:</strong> {formattedEventDate}</p>
                    <p><strong>Location:</strong> {eventLocation}</p>
                </div>

                <div className="detail-section">
                    <h3>Your Information</h3>
                    <p><strong>Name:</strong> {firstName} {lastName}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Address:</strong> {bookingDetails.streetName}, {bookingDetails.postalCode}, {bookingDetails.city}</p>
                </div>

                <div className="detail-section">
                    <h3>Ticket Details</h3>
                    <p><strong>Package:</strong> {selectedPackage?.title}</p>
                    <p><strong>Seating:</strong> {selectedPackage?.seatingArrangement}</p>
                    <p><strong>Placement:</strong> {selectedPackage?.placement}</p>
                    <p><strong>Tickets:</strong> {ticketQuantity}</p>
                    <p><strong>Total Paid:</strong> {selectedPackage?.currency}{totalPrice?.toFixed(2)}</p>
                </div>

                {bookingReference && (
                    <div className="detail-section booking-reference">
                        <h3>Booking Reference</h3>
                        <p className="reference-code">{bookingReference}</p>
                        <p>Please keep this reference for your records.</p>
                    </div>
                )}
            </div>

            <div className="confirmation-footer">
                <Link to="/" className="btn btn-primary">
                    <IoHomeOutline className="icon" /> Back to Home
                </Link>
               
                <Link to="/allbookings" className="btn btn-secondary">View My Bookings</Link>
            </div>
        </div>
    )
}

export default ConfirmationPage;