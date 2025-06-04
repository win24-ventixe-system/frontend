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
      packages: [
      {
        id: Date.now(),
        title: '',
        seatingArrangement: '',
        placement: '',
        price: '',
        currency: '$'
      }
    ]
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({...prev, [name]: value }))
  }

  const handlePackageChange = (index, e) => {
    const { name, value } = e.target
    setFormData(prev => {
      const updated = [...prev.packages]
      updated[index] = { ...updated[index], [name]: value }
      return { ...prev, packages: updated }
    })
  }
   const addPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [...prev.packages, { id: Date.now(), title: '', seatingArrangement: '', placement: '', price: '', currency: '$' }]
    }))
  }
  const removePackage = (index) => {
  setFormData(prev => {
    const updatedPackages = [...prev.packages];
    updatedPackages.splice(index, 1);
    return { ...prev, packages: updatedPackages };
  })
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

            {['title', 'date', 'streetName', 'postalCode', 'city', 'description'].map(field => (
            <div className='form-group' key={field}>
              <label className='form-label'>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input className="form-input" type={field === 'date' ? 'date' : 'text'} 
                name={field} value={formData[field]}
                onChange={handleChange}
                placeholder={field}
                required
              />
            </div>
          ))}

          <div className='form-group-packages'>
            <h3>Packages</h3>
            {formData.packages.map((pkg, index) => (
              <div key={pkg.id} className="package-group">
                <h4>Package {index + 1}</h4>
                <div className='form-group-horizontal'>
                  <div className='form-group'>
                    <label className='form-label'>Title</label>
                    <select
                      className="form-input"
                      name="title"
                      value={pkg.title}
                      onChange={(e) => handlePackageChange(index, e)}
                      required
                    >
                      <option value="">Titles</option>
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
                    <label className='form-label'>Seating Arrangement</label>
                    <select
                      className="form-input"
                      name="seatingArrangement"
                      value={pkg.seatingArrangement}
                      onChange={(e) => handlePackageChange(index, e)}
                      required
                    >
                      <option value="">Seating Arrangements</option>
                      <option value="Standing">Standing</option>
                      <option value="Seating">Seating</option>
                    </select>
                  </div>

                  <div className='form-group'>
                    <label className='form-label'>Placement</label>
                    <select
                      className="form-input"
                      name="placement"
                      value={pkg.placement}
                      onChange={(e) => handlePackageChange(index, e)}
                      required
                    >
                      <option value="">Placements</option>
                      <option value="Access to Festival Grounds">Access to Festival Grounds</option>
                      <option value="Mid-Tier View">Mid-Tier View</option>
                      <option value="Prime View">Prime View</option>
                      <option value="Near Stage">Near Stage</option>
                      <option value="Front-Row View">Front-Row View</option>
                      <option value="Exclusive Lounge">Exclusive Lounge</option>
                      <option value="Backstage Access">Backstage Access</option>
                      <option value="All-Inclusive Benefits">All-Inclusive Benefits</option>
                    </select>
                  </div>
                </div>

                <div className='form-group-horizontal'>
                  <div className='form-group'>
                    <label className='form-label'>Price</label>
                    <input
                      className="form-input"
                      type="number"
                      name="price"
                      value={pkg.price}
                      onChange={(e) => handlePackageChange(index, e)}
                      required
                    />
                  </div>

                  <div className='form-group'>
                    <label className='form-label'>Currency</label>
                    <input
                      className="form-input"
                      type="text"
                      name="currency"
                      value={pkg.currency}
                      readOnly
                    />
                  </div>

                  {formData.packages.length > 1 && (
                    <button type="button" className='btn btn-remove-package' onClick={() => removePackage(index)}>
                      Remove Package
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button type="button" className='btn btn-add-package' onClick={addPackage}>
              Add Package
            </button>
          </div>

          <div className="form-buttons">
            <button type="submit" className='btn btn-submit-booking'>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  )

  return createPortal(modalContent, document.getElementById('modal-root'))
}

export default EditEvent