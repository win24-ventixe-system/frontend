import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { IoChevronBackCircleOutline } from "react-icons/io5"
import { CiCalendar, CiLocationOn } from "react-icons/ci"



const BookingEventForm = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [event, setEvent] = useState(null)
   const [loadingEvent, setLoadingEvent] = useState(true);
  const [formData, setFormData] = useState ({
    eventId: id, 
    firstName: '', 
    lastName: '', 
    email: '', 
    streetName: '', 
    postalCode:'', 
    city: '',
    selectedPackageId: '',
    ticketQuantity: 1
    })
    
        const getEvent = async() => {
        const res = await fetch(`https://eventservice-ventixe-2025-evecf8epa0azawhq.swedencentral-01.azurewebsites.net/api/Events/${id}`)
    
            if(res.ok) {
                const response = await res.json()
                setEvent(response.result)
                setLoadingEvent(false)
            }
        }
    
        useEffect(() => {
            getEvent()
        }, [id]) 

        if (loadingEvent || !event) {
        return <div>Loading event details...</div>;
        }

        const handleChange = (e) => {
            const {name, value } = e.target
            // Convert ticketQuantity to a number if the name matches
            const newValue = name === "ticketQuantity" ? parseInt(value) : value;
            setFormData(prev => ({...prev, 
                [name]: value
            }))
        }
          
          const handleSubmit = async (e) => {
            e.preventDefault()

             try {
                const res = await fetch (`https://bookingservice-g4gtc7akfwg4gsfm.swedencentral-01.azurewebsites.net/api/Bookings`, {
                method: 'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify(formData)
                 })
                 if(!res.ok) {
                    console.error("Booking failed")
                 } else {
                    console.log("Booking succesful")
                    navigate('/')
                 }
            } catch(err) {
                console.error("Error submitting booking", err)
            }

          }
          const packages = event.packages?.$values || []
          const selectedPackage = packages.find(pkg => pkg.id === formData.selectedPackageId)
            const totalPrice = selectedPackage ? parseFloat(selectedPackage.price) * formData.ticketQuantity : 0
            const lowestPrice = packages && packages.length > 0
            ? packages.reduce((min, pkg) => (pkg.price < min ? pkg.price : min), packages[0].price)
            : null;
       
            // --- Date Formatting Logic 
            const formattedDate = event.eventDate ? event.eventDate.substring(0, 10) : '';
            

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
            </div>
            <div className='form-group'>
                <label className='form-label'>Last Name</label>
                <input className="form-input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last Name' required/>
            </div>
            <div className='form-group'>
                <label className='form-label'>E-mail</label>
                <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' required/>
            </div>
            <div className='form-group'>
                <label className='form-label'>Street Name</label>
                <input className="form-input" type="text" name="streetName" value={formData.streetName} onChange={handleChange} placeholder='Street Name' required/>
            </div>
            <div className='form-group'>
                <label className='form-label'>Postal Code</label>
                <input className="form-input" type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder='Postal Code' required/>
            </div>
            <div className='form-group'>
                <label className='form-label'>City</label>
                <input className="form-input" type="text"name="city" value={formData.city} onChange={handleChange}  placeholder='City' required/>
            </div>
                
               
                <div className='form-group'>
                <label className='form-label'>Packages</label>
                <select className="form-input" name="selectedPackageId" value={formData.packages} onChange={handleChange} required>
                    <option value="">Select a Package</option>
                    {packages.map(pkg => (
                    <option key={pkg.id} value={pkg.id.toString()}>
                        {pkg.title} - {pkg.currency}{pkg.price}
                    </option>
                ))}
                </select>
                </div>
                

            <div className='form-group'>
                <label className='form-label'>Tickets</label>
                <input className="form-input" type="number" name="ticketQuantity" min="1" value={formData.ticketQuantity} onChange={handleChange} />
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