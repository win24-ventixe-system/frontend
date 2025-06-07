import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { useEventContext } from '../../contexts/EventContext'
import { IoCloseOutline } from 'react-icons/io5'
import { BsPencilSquare } from 'react-icons/bs'



const AddEvent = ({ onClose }) => {
    const navigate = useNavigate()


  const {
    formData,
    handleChange,
    handlePackageChange,
    handleImageChange,
    addPackage,
    removePackage,
    formErrors,
    validateForm
  } = useEventContext()

 
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("handleSubmit triggered!");// ADD THIS LINE
    console.log("Current formData(entire object):" , formData); // ADD THIS LINE 
    console.log("formData.image: (from state)", formData.image);

   const isValid = validateForm(); 
        console.log("Form is valid:", isValid); 

        if (!isValid) {
            console.log("Form has validation errors. Preventing submission.");
            // If the form is not valid, stop the submission process
            return;
        }
// 1. Create a new FormData object
        const formDataToSend = new FormData()
// 2. Append simple text fields
        formDataToSend.append('title', formData.title)
        formDataToSend.append('description', formData.description)
        formDataToSend.append('eventDate', new Date(formData.date).toISOString()); // Convert date to ISO string
        formDataToSend.append('location', `${formData.streetName }, ${formData.postalCode }, ${formData.city}`)
// 3. Append the image file if it exists
        
     if (formData.image) {
        formDataToSend.append('image', formData.image);
        console.log("Image appended to FormDataToSend."); // <--- THIS IS CRITICAL
    } else {
        console.log("No image found in formData.image, NOT appending to FormDataToSend."); // <--- THIS IS CRITICAL
    }
  // 4. Append package data
  formData.packages.forEach((pkg, index) => {
            formDataToSend.append(`packages[${index}].title`, pkg.title);
            formDataToSend.append(`packages[${index}].seatingArrangement`, pkg.seatingArrangement);
            formDataToSend.append(`packages[${index}].placement`, pkg.placement);
            formDataToSend.append(`packages[${index}].price`, pkg.price); 
            formDataToSend.append(`packages[${index}].currency`, pkg.currency);
        })
    


 
    try {
                const res = await fetch (`https://eventservice-ventixe-2025-evecf8epa0azawhq.swedencentral-01.azurewebsites.net/api/Events`, 
                {
                method: 'POST',
                //headers: { 'Content-Type':'multipart/form-data'},
                //body: JSON.stringify(data)
                body: formDataToSend
            
                 })
                 if(!res.ok) {
                    console.error("Event creation failed")
                    const errorData = await res.text()
                    console.error("Error details:", errorData);
                 } else {
                    console.log("Event created succesfully")
                     navigate(`/`)
                 }
            } catch(err) {
                console.error("Error submitting form", err)
            }
  }



const modalContent = (
    <div className="modal" onClick={onClose}>
         <div className='modal-event card' id='add-event-modal'  onClick={(e) => e.stopPropagation()}>
        <div className="card-header">
        <h2>Add Event</h2>
        <IoCloseOutline onClick={onClose} className="close-icon"/>
    </div>
           <form className='modal-event-form' noValidate onSubmit={handleSubmit}>
            <div className="image-previewer square">
                  {formData.imagePreview ? (
                <img src={formData.imagePreview} alt="Preview" className="image-preview" />) : null} 
                <BsPencilSquare className='pencil-icon' />
                <input type="file" className="event-image" accept="image/*" onChange={handleImageChange}/>
            </div>
            <div className='form-group'>
                <label className='form-label'>Title</label>
                <input className="form-input" type="text" name="title" value={formData.title} onChange={handleChange} placeholder='Title' required/>
                {formErrors.title && <p className="form-error">{formErrors.title}</p>}
            </div>
            <div className='form-group'>
                <label className='form-label'>Date</label>
                <input className="form-input" type="date" name="date" value={formData.date} onChange={handleChange} placeholder='Date' required/>
                {formErrors.date && <p className="form-error">{formErrors.date}</p>}
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
                <label className='form-label'>Description</label>
                <input className="form-input" type="text" name="description" value={formData.description} onChange={handleChange}  placeholder='Description' required/>
                {formErrors.description && <p className="form-error">{formErrors.description}</p>}
            </div>
            
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
                        placeholder="Price"
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

                    {formErrors.packages && <p className="form-error">{formErrors.packages}</p>}
            </div>
             
            <div className="form-buttons">
                <button type="submit" className='btn btn-submit-booking'>Save Event</button>
               
            </div>
            
        </form> 
    </div>

    </div>

)
    return createPortal(modalContent, document.getElementById('modal-root'))
  
}

export default AddEvent