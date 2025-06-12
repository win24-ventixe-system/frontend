import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GoogleIcon from '../../assets/images/icon_google.svg'
import { useAuth } from '../contexts/AuthContext'


const Login = () => {
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
      
      const response =  await fetch('https://accountservice-ventixe-2025-ahbeagh7dvgabtg8.swedencentral-01.azurewebsites.net/api/Accounts/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password:formData.password,
          isPersistent: formData.isPersistent,
        }),
      })

// Google Sign-in (OAuth) 
const handleGoogleSignIn = () => {
  window.location.href = 'https://accountservice-ventixe-2025-ahbeagh7dvgabtg8.swedencentral-01.azurewebsites.net/api/Accounts/signin-google';
}

 if (response.ok) {
        setMessage({ type: 'success', text: 'Sign in succesfully!' })
        resetFormData()
  }  else {
        const errorData =  await response.json();
        setMessage({ type: 'error', text: errorData.error || 'Failed to sign in. Please try again.' });
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again later.' });
    } finally {
      setLoading(false)
    }
  }

   return (
     <div className='sign-in card' id="login">
        <div className="card-header">
              <h1>Sign In</h1>
        </div>

        <div className='card-body'>
        <div type="button" className="btn btn-external" noValidate onSubmit={handleGoogleSignUp }>
              <img src={GoogleIcon} alt="Google Icon"/>
              <span>Sign In with Google</span>
         </div>

         <div className="divider"> <span>OR</span></div>

          <form className='sign-in-form' noValidate onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='form-label'>E-mail</label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
              required
            />
          {formErrors.email && <p className="form-error">{formErrors.email}</p>}

          </div>

          <div className='form-group'>
            <label className='form-label'>Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              required
            />
            {formErrors.password && <p className="form-error">{formErrors.password}</p>}
          </div>

          <div className='form-group-checkbox'>
            <label className='form-checkbox'>
              <input
                className="form-checkbox-input"
                type="checkbox"
                name="isPersistent"
                checked={formData.isPersistent}
                onChange={handleChange}
              />
              <span className="checkbox-box"></span>
            </label>
            <label className="checkbox-label">
              Remember me <a href="#">Forgot Password?</a>
            </label>
          {formErrors.isPersistent && <p className="form-error">{formErrors.isPersistent}</p>}

          </div>
          {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}

          <div className="form-group">
            <button type="submit" className="btn btn-auth-submit">Log in</button>
          </div>
        </form>


            <div className='card-footer'>
              <span>Don't have an account?</span>
              <Link to="/signup">Sign Up</Link>

            </div>
        </div>
               
      </div>
  )
}

export default Login