import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { IoChevronBackCircleOutline } from "react-icons/io5"
import { CiCalendar, CiLocationOn } from "react-icons/ci"



const BookingEventForm = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [event, setEvent] = useState({})
  const [formData, setFormData] = useState ({
    eventId: id, 
    firstName: '', 
    lastName: '', 
    email: '', 
    streetName: '', 
    postalCode:'', 
    city: '',
    ticketQuantity: 1
    })
    
        const getEvent = async() => {
        const res = await fetch(`https://eventservice-ggakcsayb6baanh0.swedencentral-01.azurewebsites.net/api/Events/${id}`)
    
            if(res.ok) {
                const response = await res.json()
                setEvent(response.result)
            }
        }
    
        useEffect(() => {
            getEvent()
        }, []) 

  

        const handleChange = (e) => {
            const {name, value } = e.target
            setFormData(prev => ({...prev, [name]: value }))
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
  const lowestPrice = event.packages && event.packages.length > 0
  ? event.packages.reduce((min, pkg) => (pkg.price < min ? pkg.price : min), event.packages[0].price)
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
                        {event.packages?.[0]?.currency} {lowestPrice}
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
                <select
                    className="form-input"
                    name="packages"
                    value={formData.packages}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a Package</option>
                    <option value="General Admission">General Admission</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Diamond">Diamond</option>
                    <option value="VIP Lounge">VIP Lounge</option>
                    <option value="Artists Meet-and-Greet">Artists Meet-and-Greet</option>
                    <option value="Ultimate Access">Ultimate Access</option>
                </select>
                </div>
            <div className='form-group'>
                <label className='form-label'>Tickets</label>
                <input className="form-input" type="number" name="ticketQuantity" min="1" value={formData.ticketQuantity} onChange={handleChange} />
            </div>
              <div className='form-group'>
                    <label className='form-label'>Total</label>
                    <input className="form-input" type="number" name="total" value={formData.packages} onChange={handleChange}  placeholder='$0' required/>
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