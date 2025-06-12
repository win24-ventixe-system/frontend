import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const defaultFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: true,
}

export const AuthProvider = ({ children }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetFormData = () => {
    setFormData(defaultFormData);
    setFormErrors({});
    setMessage({ type: '', text: '' });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName) errors.firstName = 'First name is required.';
    if (!formData.lastName) errors.lastName = 'Last name is required.';
    if (!formData.email) errors.email = 'Email is required.';
    if (!formData.password) errors.password = 'Password is required.';
    if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password.';
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    if (!formData.terms) errors.terms = 'You must accept the terms.';

    setFormErrors(errors);
    setMessage({ type: '', text: '' });

    return Object.keys(errors).length === 0;
  };

  return (
    <AuthContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
        formErrors,
        setFormErrors,
        validateForm,
        resetFormData,
        message,
        setMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);