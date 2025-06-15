import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState(''); 
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleVerify = async () => {
    const response = await fetch("https://accountservice-ventixe-2025-ahbeagh7dvgabtg8.swedencentral-01.azurewebsites.net/api/Accounts/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const result = await response.json();
    if (response.ok) {
      setMessage({ type: 'success', text: 'Email verified!' });
      setTimeout(() => navigate('/'), 2000); // Redirect after success
    } else {
      setMessage({ type: 'error', text: result.error || 'Verification failed.' });
    }
    
        // Use the email and password from the form to log in the user
        const loginSuccess = await login(formData.email, formData.password, formData.isPersistent)

                if (loginSuccess) {
                    // Login was successful, AuthContext state is updated
                    resetFormData(); // Clear the form
                    navigate('/'); // Redirect to dashboard
                } else {
                    // Optionally, redirect to login page if auto-login fails
                    navigate('/signin');
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
        />

        <button className="btn btn-auth-submit" onClick={handleVerify}>Verify</button>
      </div>
    </form>
  );
};

export default VerifyEmail;
