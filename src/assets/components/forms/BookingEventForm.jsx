import React, { useEffect, useState, useCallback, useContext  } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { IoChevronBackCircleOutline } from "react-icons/io5"
import { CiCalendar, CiLocationOn } from "react-icons/ci"
import { BookingContext } from '../../contexts/BookingContext'



const BookingEventForm = () => {
  const navigate = useNavigate()
  const {id} = useParams()
    const {
        formData,
        formErrors,
        handleChange,
        validateForm,
        resetFormData 
    } = useContext(BookingContext)

    const [event, setEvent] = useState({})
 
  
     // Fetch Event Details 
        const getEvent = useCallback (async() => {
            try {
                 const res = await fetch(`https://eventservice-ventixe-2025-evecf8epa0azawhq.swedencentral-01.azurewebsites.net/api/Events/${id}`)
    
            if(res.ok) {
                const response = await res.json()
                setEvent(response.result)
                resetFormData(response.result.id, response.result.packages?.$values?.[0]?.id || '')
                }
                
            }
            catch (error) {
            console.error("Error fetching event:", error);
            }
        }, [id, resetFormData] )
       
    
        useEffect(() => {
            getEvent()
        }, [getEvent]) 

        

          const handleSubmit = async (e) => {
            e.preventDefault()
                if (!validateForm()) {
                    return; // Don't submit if validation fails
                    }
             try {
                const res = await fetch (`https://bookingservice-g4gtc7akfwg4gsfm.swedencentral-01.azurewebsites.net/api/Bookings`, {
                method: 'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify(formData)
                 })
                 if(!res.ok) {
                    const errorData = await res.text()
                    console.error("Booking failed:", res.status, errorData)
                 } else {
                    console.log("Booking succesful")
                    const bookingResponse = await res.json()
                   
                   
                    // Prepare data to pass to the confirmation page
                    const bookingDetailsToConfirm = {
                    ...bookingFormData, // All basic form data
                    title: eventDetails.title, // Event title from eventDetails prop
                    eventDate: eventDetails.eventDate, // Event date from eventDetails prop
                    location: eventDetails.location, // Event location from eventDetails prop
                    selectedPackage: selectedPackage, // Full selected package object
                    totalPrice: totalPrice,
                    bookingReference: bookingResponse.bookingReference || 'N/A' // Use actual booking reference
                }
                     
                resetFormData(event.id, event.packages?.$values?.[0]?.id || '')
        
                 navigate('/confirmation', { state: { bookingDetails: bookingDetailsToConfirm } })
            } 
        } catch(err) {
                console.error("Error submitting booking", err)
            }
          }
          // Get current selected package and total price
                    const packages = event.packages?.$values || []
                    const selectedPackage = packages.find(pkg => pkg.id === formData.selectedPackageId)
                    const totalPrice = selectedPackage ? parseFloat(selectedPackage.price) * formData.ticketQuantity : 0
                     // Lowest Price display 
                    const lowestPrice = packages.length > 0
                    ? Math.min(...packages.map(pkg => Number(pkg.price)))
                    : null
                    // Date Formatting  
                    const formattedDate = event.eventDate ? event.eventDate.substring(0, 10) : ''
            

    return (
<div className='form card' id="book-event-form">
    <div className='card-header'>
        <div className='book-event-details card'>
            
            <div className='image-container'>
                <img className='event-image' src={event.image} alt={event.title} />
                </div>
            
            <div className='book-event-info'>
                <div className='book-event-title'>
                    <h4>{event.title}</h4>
                 
                    <span className='date-time'><CiCalendar /> {formattedDate}</span>
                    <span className="place"> <CiLocationOn /> {event.location} </span>
                </div>
                
               
                <div className='event-price'>
                    <p>Starts from</p>
                    <span className="price-standard">
                        ${event.packages?.[0]?.currency}{lowestPrice}
                    </span>
                </div>
                
        </div>

            
    </div>
         <div className='card-body'>
        <form className='book-event-form' noValidate onSubmit={handleSubmit}>
            <div className='form-group'>
            
                <label className='form-label'>First Name</label>
                <input className="form-input" type="text"name="firstName" value={formData.firstName} onChange={handleChange} placeholder='First Name' required/>
                {formErrors.firstName && <p className="form-error">{formErrors.firstName}</p>}
            </div>
            <div className='form-group'>
                <label className='form-label'>Last Name</label>
                <input className="form-input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last Name' required/>
                {formErrors.lastName && <p className="form-error">{formErrors.lastName}</p>}

            </div>
            <div className='form-group'>
                <label className='form-label'>E-mail</label>
                <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' required/>
                {formErrors.email && <p className="form-error">{formErrors.email}</p>}

            </div>
            <div className='form-group'>
                <label className='form-label'>Street Name</label>
                <input className="form-input" type="text" name="streetName" value={formData.streetName} onChange={handleChange} placeholder='Street Name' required/>
                {formErrors.streetName && <p className="form-error">{formErrors.streetName}</p>}

            </div>
            <div className='form-group'>
                <label className='form-label'>Postal Code</label>
                <input className="form-input" type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder='Postal Code' required/>
                {formErrors.postalCode && <p className="form-error">{formErrors.postalCode}</p>}

            </div>
            <div className='form-group'>
                <label className='form-label'>City</label>
                <input className="form-input" type="text"name="city" value={formData.city} onChange={handleChange}  placeholder='City' required/>
                {formErrors.city && <p className="form-error">{formErrors.city}</p>}

            </div>
                
               
                <div className='form-group'>
                <label className='form-label'>Packages</label>
                <select className="form-input" name="selectedPackageId" value={formData.selectedPackageId} onChange={handleChange} required>
                    <option value="">Select a Package</option>
                    {packages.map(pkg => (
                    <option key={pkg.id} value={pkg.id.toString()}>
                        {pkg.title} - {pkg.currency}{pkg.price}
                    </option>
                ))}
                </select>
                {formErrors.selectedPackageId && <p className="form-error">{formErrors.selectedPackageId}</p>}

                </div>
                

            <div className='form-group'>
                <label className='form-label'>Tickets</label>
                <input className="form-input" type="number" name="ticketQuantity" min="1" value={formData.ticketQuantity} onChange={handleChange} />
                {formErrors.ticketQuantity && <p className="form-error">{formErrors.ticketQuantity}</p>}
            </div>
              <div className='form-group'>
                    <label className='form-label'>Total</label>
                    <input className="form-input" type="text" name="totalDisplay" value={selectedPackage ? `${selectedPackage.currency}${totalPrice.toFixed(2)}` : '$0.00'} readOnly />
            </div>
            <div className="form-buttons">
                <button type="submit" className='btn btn-submit-booking'>Book Now</button>
                <Link to={`/events/${event.id}`} className='btn btn-back'>
                    <IoChevronBackCircleOutline />
                    Back
                </Link>
            </div>
            
        </form>     
        
         </div>
        
     
      </div>
    </div>

  )
}

export default BookingEventForm