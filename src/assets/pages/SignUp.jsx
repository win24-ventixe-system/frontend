import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleIcon from '../../assets/images/icon_google.svg'
import { useAuth } from '../contexts/AuthContext'
import { IoChevronBackCircleOutline } from "react-icons/io5"


const SignUp = () => {
     const {
    formData,
    handleChange,
    resetFormData,
    formErrors,
    message,
    setMessage,
    login
    
  } = useAuth()
const [localFormErrors, setLocalFormErrors] = useState({});
const navigate = useNavigate();
const [loading, setLoading] = useState(false)

 const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required.";
            isValid = false;
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required.";
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid.";
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
            isValid = false;
        } else if (formData.password.length < 6) { // Example: password must be at least 6 chars
            newErrors.password = "Password must be at least 6 characters.";
            isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            isValid = false;
        }
        if (!formData.terms) {
            newErrors.terms = "You must accept the Terms and Conditions.";
            isValid = false;
        }

         setLocalFormErrors(newErrors); // Update local form errors state
        return isValid;
 }
    const handleSubmit = async (e) => {
     e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' })

    // client-side validatio
    if (!validateForm()) {
      setLoading(false);
      return
    }


    try {
       //Call the backend signup API
      const response =  await fetch('https://accountservice-ventixe-2025-ahbeagh7dvgabtg8.swedencentral-01.azurewebsites.net/api/Accounts/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName:formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Account created! Please check your email for a verification code.' });
        resetFormData(); // Clear the form
        navigate('/verify-email', { state: { email: formData.email, password: formData.password, isPersistent: formData.isPersistent } });
              

      }  else {
      let errorData = {}
        try {
          errorData = await response.json();
        } catch (err) {
          errorData = { error: 'Unexpected error. Please try again.' };
        }
        // Handle model validation errors like
      const errorMessage =
        errorData.error || errorData.Email?.[0] || 'Signup failed. Please check your input.';

      setMessage({ type: 'error', text: errorMessage })
          }
        } catch (error) {
      console.error('Error during sign up:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again later.' });
    } finally {
      setLoading(false)
    }
  }
 const handleGoBack = () => {
        navigate(-1) // goes back one entry in the history stack
    }
  // Google Sign-up (OAuth) 
const handleGoogleSignUp = () => {
  window.location.href = 'https://accountservice-ventixe-2025-ahbeagh7dvgabtg8.swedencentral-01.azurewebsites.net/api/Accounts/signin-google';
}

  return (
     <div className='sign-up card' id="signup">
        
        <div className="card-header">
            <h1>Sign Up</h1>
        </div>
        
        <div className='card-body'>
        <button type="button" className="btn btn-external" noValidate onClick={handleGoogleSignUp }>
              <img src={GoogleIcon} alt="Google Icon"/>
              <span>Sign Up with Google</span>
         </button>
       
        <div className="divider"> <span>or</span></div>

        <form className='sign-up-form' noValidate onSubmit={handleSubmit}>
        
                    {message.text && <div className={`form-error-message ${message.type}`}>{message.text}</div>}

          <div className='form-group'>
            <label className='form-label'>First Name</label>
            <input className="form-input" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='First Name' required />
          {formErrors.firstName && <p className="form-error">{formErrors.firstName}</p>}
          </div>

          <div className='form-group'>
            <label className='form-label'>Last Name</label>
            <input className="form-input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last Name' required />
          {formErrors.lastName && <p className="form-error">{formErrors.lastName}</p>}

          </div>

          <div className='form-group'>
            <label className='form-label'>E-mail</label>
            <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' required />
            {formErrors.email && <p className="form-error">{formErrors.email}</p>}

          </div>

          <div className='form-group'>
            <label className='form-label'>Password</label>
            <input className="form-input" type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' required />
            {formErrors.password && <p className="form-error">{formErrors.password}</p>}

          </div>

          <div className='form-group'>
            <label className='form-label'>Confirm Password</label>
            <input className="form-input" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder='Confirm Password' required />
            {formErrors.confirmPassword && <p className="form-error">{formErrors.confirmPassword}</p>}

          </div>

          <div className='form-group-checkbox'>
            <label className='form-checkbox'>
              <input className="form-checkbox-input" type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
              <span className="checkbox-box"></span>
            </label>
            <label className="checkbox-label">I accept <a href="#">Terms and Conditions</a></label>
            {formErrors.terms && <p className="form-error">{formErrors.terms}</p>}

          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-auth-submit" disabled={loading}>Create Account</button>
            <button type="button" className='btn btn-back' onClick={handleGoBack}>
              <IoChevronBackCircleOutline /> Go back</button>

          </div>
        </form>
        <div className='card-footer'>
              <span>Already have an Account?</span>
              <Link to="/signin">Sign In</Link>

            </div>
        </div>
               
        </div>
  )
}

export default SignUp