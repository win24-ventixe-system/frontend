import React , { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { IoCloseOutline } from "react-icons/io5"
import { BsPencilSquare } from "react-icons/bs"
import PackagesForm from '../forms/PackagesForm'


const EditEvent = ({ onClose, item, onEventUpdated}) => {

 const [formData, setFormData] = useState({
 
    id: '',  
    title: '',
    date: '',
    streetName: '',
    postalCode: '',
    city: '',
    description: '',
    imageFile: null,
    imagePreview: null,

      packages: [
    ]
  })
  
 // storing the original image URL, in case the user doesn't upload a new file.
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [formErrors, setFormErrors] = useState({}) // Simple state for validation errors

  // Effect to populate the form when the modal opens or 'item' changes
  useEffect(() => {
    console.log("EditEvent item prop:", item)
    if (item) {
      // Parse location string back into streetName, postalCode, city
      const locationParts = item.location ? item.location.split(', ').map(part => part.trim()) : ['', '', ''];
      const streetName = locationParts[0] || '';
      const postalCode = locationParts[1] || '';
      const city = locationParts[2] || '';

      setFormData({
        id: item.id,
        title: item.title || '',
        // format date for input type="date" (YYYY-MM-DD)
        date: item.eventDate ? item.eventDate.substring(0, 10) : '',
        streetName: streetName,
        postalCode: postalCode,
        city: city,
        description: item.description || '',
        imageFile: null, // No file initially, user selects new
        imagePreview: item.image || null, // current image URL
        packages: item.packages ? item.packages.map(pkg => ({
          id: pkg.id, //Keeps existing ID for updates
          title: pkg.title || '',
          seatingArrangement: pkg.seatingArrangement || '',
          placement: pkg.placement || '',
          price: pkg.price || '',
          currency: pkg.currency || '$'
        })) : [{ id: Date.now(), title: '', seatingArrangement: '', placement: '', price: '', currency: '$' }] // Default empty package for new events
      });
      setOriginalImageUrl(item.image || null); // store original image URL
    }
  }, [item])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({...prev, [name]: value }))
     setFormErrors(prev => ({ ...prev, [name]: undefined }))
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
 const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file, imagePreview: URL.createObjectURL(file) }));
    } else {
      // revert to the original image preview if user cancel image selection
      setFormData(prev => ({ ...prev, imageFile: null, imagePreview: originalImageUrl }))
    }
  }

    const validateForm = () => {
    const errors = {}
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.streetName) errors.streetName = 'Street Name is required';
    if (!formData.postalCode) errors.postalCode = 'Postal Code is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.description) errors.description = 'Description is required';

    if (formData.packages.length === 0) {
      errors.packages = 'At least one package is required.';
    } else {
      formData.packages.forEach((pkg, index) => {
        if (!pkg.title) errors[`packageTitle${index}`] = `Package ${index + 1} Title is required`;
        if (!pkg.seatingArrangement) errors[`packageSeating${index}`] = `Package ${index + 1} Seating is required`;
        if (!pkg.placement) errors[`packagePlacement${index}`] = `Package ${index + 1} Placement is required`;
        if (!pkg.price || isNaN(pkg.price) || pkg.price <= 0) errors[`packagePrice${index}`] = `Package ${index + 1} Price must be a positive number`;
      })
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }
   
  const handleSubmit = async (e) => {
    e.preventDefault()
    {/**/}
    if(!validateForm()) {
      console.log("Form has validation errors. Preventing submission.")
      return
    }
    const formDataToSend = new FormData ()
    formDataToSend.append('EventId', formData.id)
    formDataToSend.append('Title', formData.title)
    formDataToSend.append('Description', formData.description)
    formDataToSend.append('EventDate', new Date(formData.date).toISOString())
    formDataToSend.append('Location', `${formData.streetName}, ${formData.postalCode}, ${formData.city}`)

       if (formData.imageFile) {
      formDataToSend.append('Image', formData.imageFile)
    }
    
    formData.packages.forEach((pkg, index) => {
      formDataToSend.append(`Packages[${index}].Id`, pkg.id);
      formDataToSend.append(`Packages[${index}].Title`, pkg.title);
      formDataToSend.append(`Packages[${index}].SeatingArrangement`, pkg.seatingArrangement);
      formDataToSend.append(`Packages[${index}].Placement`, pkg.placement);
      formDataToSend.append(`Packages[${index}].Price`, pkg.price);
      formDataToSend.append(`Packages[${index}].Currency`, pkg.currency);
    })

    try {
                const res = await fetch (`https://eventservice-ggakcsayb6baanh0.swedencentral-01.azurewebsites.net/api/Events/${item.id}`, {
                  method: 'PUT',
                  body: formDataToSend
                 })
                 if(!res.ok) {
                    console.error("Editing failed")
                    const errorData = await res.text()
                    console.error("Error details:", errorData)
                 } else {
                    console.log("Editing succesful")
                    if (onEventUpdated) {
                  onEventUpdated();
                  }
                  onClose()
                 }
            } catch(err) {
                console.error("Error submitting form", err)
            }
 
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
              {formData.imagePreview && (
               <img src={formData.imagePreview} alt="Event preview" className="image-preview" />
                )}
                <BsPencilSquare className='pencil-icon' />
                <input type="file" accept="image/*" onChange={handleImageChange} className="event-image"/>
            </div>

            {['title', 'date', 'streetName', 'postalCode', 'city', 'description'].map(field => (
            <div className='form-group' key={field}>
              <label className='form-label'>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input className="form-input" type={field === 'date' ? 'date' : 'text'} 
                name={field} value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required
              />
            </div>
          ))}

           <PackagesForm
            packages={formData.packages}
            onPackageChange={handlePackageChange}
            onAddPackage={addPackage}
            onRemovePackage={removePackage}
            formErrors={formErrors} 
        />

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