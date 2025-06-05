import React, { createContext, useContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    streetName: '',
    postalCode: '',
    city: '',
    description: '',
    image: null,
    imagePreview: '',
    packages: [
      {
        id: Date.now(),
        title: '',
        seatingArrangement: '',
        placement: '',
        price: '',
        currency: '$',
      },
    ],
  })
const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handlePackageChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedPackages = [...prev.packages];
      updatedPackages[index] = { ...updatedPackages[index], [name]: value };
      return { ...prev, packages: updatedPackages };
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData(prev => ({ ...prev, imageFile: file }))
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          //image: file,
          imagePreview: reader.result,
        }))
      }
      reader.readAsDataURL(file);
    }
  }

  const addPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: Date.now(), title: '', seatingArrangement: '', placement: '', price: '', currency: '$' },
      ],
    }))
  }

  const removePackage = (index) => {
    setFormData(prev => {
      const updatedPackages = [...prev.packages];
      updatedPackages.splice(index, 1);
      return { ...prev, packages: updatedPackages };
    })
  }
const validateForm = () => {
    const errors = {};
    const { title, date, streetName, postalCode, city, description, packages } = formData;

    if (!title.trim()) errors.title = 'Title is required'
    if (!date) errors.date = 'Date is required'
    if (!streetName.trim()) errors.streetName = 'Street name is required'
    if (!postalCode.trim()) errors.postalCode = 'Postal code is required'
    if (!city.trim()) errors.city = 'City is required'
    if (!description.trim()) errors.description = 'Description is required'
    if (!formData.imagePreview) errors.image = 'Image is required'

    if (!packages.length) {
      errors.packages = 'At least one package is required';
    } else {
      const incompletePackage = packages.find(
        pkg =>
          !pkg.title.trim() ||
          !pkg.seatingArrangement.trim() ||
          !pkg.placement.trim() ||
          !pkg.price.trim() ||
          isNaN(pkg.price)
      );
      if (incompletePackage) {
        errors.packages = 'All package fields must be filled out and price must be a number';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }
  return (
    <EventContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
        handlePackageChange,
        handleImageChange,
        addPackage,
        removePackage,
        formErrors,
        setFormErrors,
        validateForm,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
export const useEventContext = () => useContext(EventContext)