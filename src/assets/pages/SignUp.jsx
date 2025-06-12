import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GoogleIcon from '../../assets/images/icon_google.svg'
import { useAuth } from '../contexts/AuthContext'


const SignUp = () => {
     const {
    formData,
    handleChange,
    validateForm,
    resetFormData,
    message,
    setMessage,
    formErrors,
  } = useAuth()



    const handleSubmit = async (e) => {
     e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' })

    if (!validateForm()) {
      setLoading(false);
      return
    }

    try {
      
      const response =  await fetch('https://accountservice-ventixe-2025-ahbeagh7dvgabtg8.swedencentral-01.azurewebsites.net/index.html/api/account/signup', {
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
        setMessage({ type: 'success', text: 'Account created successfully!' })
        resetFormData()
  }  else {
        const errorData =  await response.json();
        setMessage({ type: 'error', text: errorData.error || 'Failed to create account. Please try again.' });
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again later.' });
    } finally {
      setLoading(false)
    }
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
        <button type="button" className="btn btn-external" noValidate onSubmit={handleGoogleSignUp }>
              <img src={GoogleIcon} />
              <span>Sign Up with Google</span>
         </button>
       
        <div className="divider"> <span>or</span></div>

        <form className='sign-up-form' noValidate onSubmit={handleSubmit}>
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
          {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}

          <div className="form-group">
            <button type="submit" className="btn btn-auth-submit" disabled={loading}>Create Account
              {loading ? 'Creating...' : 'Create Account'}
            </button>
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