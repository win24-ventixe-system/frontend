import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

const VerifyEmail = () => {
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPersistent, setIsPersistent] = useState(false)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
 // Access login and other necessary functions/states from AuthContext
  const { login, resetFormData } = useAuth(); // Assuming formData holds the email/password from signup

  // Use useEffect to get the email from location.state when the component mounts
  useEffect(() => {
 if (location.state) {
        if (location.state.email) setEmail(location.state.email)
        if (location.state.password) setPassword(location.state.password);
        if (location.state.isPersistent !== undefined) {
            setIsPersistent(Boolean(location.state.isPersistent))
        }
    } else {
        setMessage({ type: 'error', text: 'Missing essential data for verification. Please go back to sign up.' });
        navigate('/signup');
    }
}, [location.state, navigate])

 const handleVerify = async () => {
  setLoading(true)

  try {
    const response = await fetch("https://accountservice-ventixe-2025-ahbeagh7dvgabtg8.swedencentral-01.azurewebsites.net/api/Accounts/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const result = await response.json()

    if (response.ok && result.succeeded) {
      setMessage({ type: 'success', text: 'Email verified!' });

      // Attempt to log in the user automatically after successful verification
      const loginSuccess = await login(email, password, isPersistent);

      if (loginSuccess) {
        resetFormData()// Clear the form data from AuthContext
        navigate('/signin')
      } else {
    
        setMessage({ type: 'error', text: result.error || 'Email verified, but auto-login failed. Please try logging in manually.' })
        navigate('/signin') // Redirect to the sign-in page for manual login
      }
    } else {
      // Verification failed (e.g., wrong code, expired, or backend returned an error)
      setMessage({ type: 'error', text: result.error || 'Verification failed. Please check the code or try resending.' })
      // Do not attempt login or redirect if verification itself failed
    }
  } catch (error) {
    console.error('An error occurred during verification or auto-login:', error);
    setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again later.' })
  } finally {
    setLoading(false); // End loading state
  }
};

   



  

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
