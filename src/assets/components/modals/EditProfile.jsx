import React , { useState } from 'react'
import { createPortal } from 'react-dom' //by chat gpt to center modal
import { IoCloseOutline } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";



const EditProfile = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetName: '',
    postalCode: '',
    city: ''
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

  }

  const modalContent = (
    <div className="modal" onClick={onClose}>
      <div className='edit-profile card' id='edit-profile-modal' onClick={(e) => e.stopPropagation()}>
        <div className="card-header">
          <h2>Edit profile</h2>
          <IoCloseOutline onClick={onClose} className="close-icon" />
        </div>
        <form className='edit-profile-form' noValidate onSubmit={handleSubmit}>
          <div className="image-previewer circle">
            <img src="" alt="" className="image-preview" />
            <BsPencilSquare className='pencil-icon' />
            {/*<input className="user-image" />*/}
          </div>
          {/* Form fields */}
          <div className='form-group'>
            <label className='form-label'>First Name</label>
            <input className="form-input" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='First Name' required />
          </div>
          <div className='form-group'>
            <label className='form-label'>Last Name</label>
            <input className="form-input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last Name' required />
          </div>
          <div className='form-group'>
            <label className='form-label'>E-mail</label>
            <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' required />
          </div>
          <div className='form-group'>
            <label className='form-label'>Phone Number</label>
            <input className="form-input" type="text" name="phone" value={formData.phone} onChange={handleChange}  placeholder='Phone'/>
          </div>
          <div className='form-group'>
            <label className='form-label'>Street Name</label>
            <input className="form-input" type="text" name="streetName" value={formData.streetName} onChange={handleChange} placeholder='Street Name' required />
          </div>
          <div className='form-group'>
            <label className='form-label'>Postal Code</label>
            <input className="form-input" type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder='Postal Code' required />
          </div>
          <div className='form-group'>
            <label className='form-label'>City</label>
            <input className="form-input" type="text" name="city" value={formData.city} onChange={handleChange} placeholder='City' required />
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

export default EditProfile