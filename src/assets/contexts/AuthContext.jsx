import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

const defaultFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: true,
  isPersistent: true
}
  const [formData, setFormData] = useState(defaultFormData)
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' })

  //FOR AUTHENTICATION
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authToken, setAuthToken] = useState(null)
  const [authUser, setAuthUser] = useState(null) //stores authenticated user details

  // EFFECT TO LOAD AUTHENTICATION STATE FROM LOCAL STORAGE ON INITIAL LOAD
   useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user') // Gets stored user data

    if (storedToken && storedUser) {
      setAuthToken(storedToken);

      try {
                // Parse the stored user string back into an object
                setAuthUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user data:", e);
                // Clear corrupted data if parsing fails
                localStorage.removeItem('user');
                setAuthUser(null);
            }
            setIsAuthenticated(true)
      }
      }, [])

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

     // Clear error for the field being typed in
    setFormErrors((prevErrors) => ({
    ...prevErrors,
    [name]: '', 
  }))
  }

  const resetFormData = () => {
    setFormData(defaultFormData);
    setFormErrors({});
    setMessage({ type: '', text: '' })
  }
const login = async (email, password, isPersistent) => {
        try {
            const response = await fetch('https://accountservice-ventixe-2025-ahbeagh7dvgabtg8.swedencentral-01.azurewebsites.net/api/Accounts/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, isPersistent }),
            })

            if (response.ok) {
                const data = await response.json()
                if (data.token) {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('user', JSON.stringify(data.user))//storing user

                    setAuthToken(data.token)
                    setAuthUser(data.user); //Update authUser state
                    setIsAuthenticated(true)
                    setMessage({ type: 'success', text: 'Sign in successfully!' })
                    return true;
                } else {
                    setMessage({ type: 'error', text: 'Sign in failed: No token received.' })
                    return false;
                }
            } else {
                const errorData = await response.json();
                console.log("Error response JSON from backend:", errorData)
                const errorMessage = errorData.error || errorData.Email?.[0] || errorData.Password?.[0] || 'Failed to sign in. Please try again.'
                setMessage({ type: 'error', text: errorMessage })
                return false
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            setMessage({ type: 'error', text: 'Network error. Please try again later.' });
            return false
        }
    }


  // ---  LOGOUT FUNCTIONALITY ---
  const logout = () => {
    localStorage.removeItem('token')// Remove token from localStorage
    setAuthToken(null) // Clear token from context state
    setAuthUser(null) //Clear authUser from context state
    setIsAuthenticated(false) // Set authenticated status to false
  
  }
  return (
    <AuthContext.Provider
      value={{
        formData,
        setFormData,
        handleChange,
        formErrors,
        setFormErrors,
        resetFormData,
        message,
        setMessage,
        isAuthenticated,
        authToken,
        authUser,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);