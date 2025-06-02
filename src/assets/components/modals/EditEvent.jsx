import React , { useState } from 'react'
import { createPortal } from 'react-dom'
import { IoCloseOutline } from "react-icons/io5"
import { BsPencilSquare } from "react-icons/bs"

const EditEvent = ({ onClose }) => {

 const [formData, setFormData] = useState({
    title: '',
    date: '',
    streetName: '',
    postalCode: '',
    city: '',
    description: '',
    price: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    /*try {
                const res = await fetch (`https://bookingservice-g4gtc7akfwg4gsfm.swedencentral-01.azurewebsites.net/api/Bookings`, {
                method: 'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify(formData)
                 })
                 if(!res.ok) {
                    console.error("Editing failed")
                 } else {
                    console.log("Editing succesful")
                    navigate('/')
                 }
            } catch(err) {
                console.error("Error submitting form", err)
            }*/
 onClose()
  }



const modalContent = (
    <div className="modal" onClick={onClose}>
         <div className='modal-event card' id='add-event-modal'  onClick={(e) => e.stopPropagation()}>
        <div className="card-header">
        <h2>Edit Event</h2>
        <IoCloseOutline onClick={onClose} className="close-icon"/>
    </div>
           <form className='modal-event-form' noValidate onSubmit={handleSubmit}>
            <div className="image-previewer square">
                <img src=""  alt="" className="image-preview" />
                <BsPencilSquare className='pencil-icon' />
            {/*<input className="event-image" />*/}
            </div>
            <div className='form-group'>
                <label className='form-label'>Title</label>
                <input className="form-input" type="text" name="title" value={formData.title} onChange={handleChange} placeholder='First Name' required/>
            </div>
            <div className='form-group'>
                <label className='form-label'>Date</label>
                <input className="form-input" type="date" name="date" value={formData.date} onChange={handleChange} placeholder='Last Name' required/>
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
                <label className='form-label'>Description</label>
                <input className="form-input" type="text" name="description" value={formData.description} onChange={handleChange}  placeholder='Description' required/>
            </div>
            <div className='form-group'>
                <label className='form-label'>Price</label>
                <input className="form-input" type="number" name="price" value={formData.price} onChange={handleChange}  placeholder='' required/>
            </div>
            <div className="form-buttons">
                <button type="submit" className='btn btn-submit-booking'>Save</button>
               
            </div>
            
        </form> 
    </div>

    </div>

)
    return createPortal(modalContent, document.getElementById('modal-root'))
  
}

export default EditEvent