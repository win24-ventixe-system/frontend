import React, { useEffect, useState  } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
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
      login,
      isAuthenticated
    } = useAuth()


  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

    useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard') // Navigate to dashboard
    }
  }, [isAuthenticated, navigate])

const handleSubmit = async (e) => {
     e.preventDefault()
    setLoading(true);
    setMessage({ type: '', text: '' })

    if (!validateForm()) {
      setLoading(false)
      return
    }
    
    try {
      const success = await login(formData.email, formData.password, formData.isPersistent)

      if (success) {
        // AuthContext has already handledsetting the token in localStorage and updating isAuthenticated state.
        resetFormData(); // Clear form data after successful login
      }
    } catch (error) {
      console.error('Login component - Error during sign in:', error)
      setMessage({ type: 'error', text: 'An unexpected error occurred during login.' })
    } finally {
      setLoading(false); // Always reset loading state
    }
  }

  const handleGoBack = () => {
        navigate(-1) // goes back one entry in the history stack
    }
// Google Sign-in (OAuth) 
const handleGoogleSignIn = () => {
  window.location.href = 'https://accountservice-ventixe-2025-ahbeagh7dvgabtg8.swedencentral-01.azurewebsites.net/api/Accounts/signin-google'
}
   return (
     <div className='sign-in card' id="login">
        <div className="card-header">
              <h1>Sign In</h1>
        </div>

        <div className='card-body'>
        <button type="button" className="btn btn-external" noValidate onClick={handleGoogleSignIn }>
              <img src={GoogleIcon} alt="Google Icon"/>
              <span>Sign In with Google</span>
         </button>

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
          {message.text && <div className={`form-error-message ${message.type}`}>{message.text}</div>}

          <div className="form-group">
            <button type="submit" className="btn btn-auth-submit">Log in</button>
            <button type="button" className='btn btn-back' onClick={handleGoBack}>Go back</button>
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