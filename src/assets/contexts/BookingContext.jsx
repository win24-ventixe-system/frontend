import React, { createContext, useState, useCallback  } from 'react'

export const BookingContext = createContext()

export const BookingProvider = ({ children }) => {
    const initialBookingFormData = {
        eventId: '',
        firstName: '',
        lastName: '',
        email: '',
        streetName: '',
        postalCode: '',
        city: '',
        selectedPackageId: '',
        ticketQuantity: 1
    }
    const [formData, setFormData] = useState(initialBookingFormData);
    const [formErrors, setFormErrors] = useState({}) 

   
   // Function to reset form data to its initial state
  const resetFormData = useCallback((currentEventId = null, defaultPackageId = '') => {
        setFormData(prev => ({
            ...initialBookingFormData,
            eventId: currentEventId || prev.eventId, // Keep current eventId or set new
            selectedPackageId: defaultPackageId || '' // Default package
        }));
        setFormErrors({}); // Clear all errors on reset
    }, [])


// Handle change in  inputs
    const handleChange = useCallback((e) => {
        const { name, value } = e.target
        const newValue = name === "ticketQuantity" ? parseInt(value, 10) : value; // Ensure quantity is an integer
        setFormData(prev => ({ ...prev, [name]: newValue }))
        // Clear error when field changes
        setFormErrors(prev => ({ ...prev, [name]: undefined }))
    })

// Function to validate form
 const validateForm = useCallback(() => {
        const errors = {};
        const { firstName, lastName, email, streetName, postalCode, city, selectedPackageId, ticketQuantity } = formData

        // Check each required field and add an error message if invalid
        if (!firstName.trim()) errors.firstName = 'First Name is required.';
        if (!lastName.trim()) errors.lastName = 'Last Name is required.';
        if (!email.trim()) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid.';
        }
        if (!streetName.trim()) errors.streetName = 'Street Name is required.';
        if (!postalCode.trim()) errors.postalCode = 'Postal Code is required.';
        if (!city.trim()) errors.city = 'City is required.';
        if (!selectedPackageId) errors.selectedPackageId = 'Please select a package.';
        if (ticketQuantity <= 0 || isNaN(ticketQuantity)) errors.ticketQuantity = 'Quantity must be at least 1.';

        setFormErrors(errors); 
        return Object.keys(errors).length === 0; // Return true if no errors, false otherwise
    }, [formData]); 

    return (
        <BookingContext.Provider value={{
            formData,
        formErrors,
        handleChange,
        validateForm,
        resetFormData
        }}>
            {children}
        </BookingContext.Provider>
    )
}
export default BookingContext