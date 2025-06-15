import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

const VerifyEmail = () => {
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
 // Access login and other necessary functions/states from AuthContext
  const { login, formData, resetFormData } = useAuth(); // Assuming formData holds the email/password from signup

  // Use useEffect to get the email from location.state when the component mounts
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
     
      setMessage({ type: 'error', text: 'Email not provided for verification. Please go back to sign up.' });
    }
  }, [location.state])

  const handleVerify = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    if (!email) {
      setMessage({ type: 'error', text: 'Email is required for verification.' })
      setLoading(false)
      return
    }
    if (!code) {
      setMessage({ type: 'error', text: 'Verification code is required.' })
      setLoading(false)
      return
    }

try {
    const response = await fetch("https://accountservice-ventixe-2025-ahbeagh7dvgabtg8.swedencentral-01.azurewebsites.net/api/Accounts/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    })

    const result = await response.json();
    if (response.ok) {
      setMessage({ type: 'success', text: 'Email verified!' })
              // Use the email and password from the form to log in the user
        const loginSuccess = await login(formData.email, formData.password, formData.isPersistent)

                if (loginSuccess) {
                    // Login was successful, AuthContext state is updated
                    resetFormData(); // Clear the form
                    navigate('/'); // Redirect to dashboard
                } else {
                    // Optionally, redirect to login page if auto-login fails
                    navigate('/signin')
                }
} else {
        // Verification failed (e.g., wrong code, expired code)
        setMessage({ type: 'error', text: result.error || 'Verification failed. Please check the code.' })
      }
    } catch (error) {
      console.error('Verification or auto-login error:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  

  return (
    <form className="card verify-email">
      <div className="card-header">
        <h1>Verify Your Email</h1>
      </div>
      <div className="card-body">
        {message && <div className={`form-error-message ${message.type}`}>{message.text}</div>}

        <input
          className="form-input"
          type="text"
          placeholder="Enter the 6-digit code"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
        />

        <button className="btn btn-auth-submit" onClick={handleVerify}>Verify</button>
        <p className="resend-code-link">
            Didn't receive the code? <Link to="/resend-verification" state={{ email }}>Resend Code</Link>
        </p>
      </div>
    </form>
  );
};

export default VerifyEmail;
