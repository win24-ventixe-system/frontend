import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GoogleIcon from '../../assets/images/icon_google.svg'


const SignUp = () => {
   const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: true,
    });

    const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    // Add validation or API call here
  }


  return (
     <div className='sign-up card' id="signup">
        
        <div className="card-header">
            <h1>Sign Up</h1>
        </div>
        
        <div className='card-body'>
        <div className="btn btn-external">
              <img src={GoogleIcon} />
              <span>Sign Up with Google</span>
         </div>
       
        <div className="divider"> <span>or</span></div>

        <form className='sign-up-form' noValidate onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='form-label'>First Name</label>
            <input className="form-input" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='First Name' required />
          </div>

          <div className='form-group'>
            <label className='form-label'>Last Name</label>
            <input className="form-input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last Name' required />
          </div>

          <div className='form-group'>
            <label className='form-label'>E-mail</label>
            <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' required />
          </div>

          <div className='form-group'>
            <label className='form-label'>Password</label>
            <input className="form-input" type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password' required />
          </div>

          <div className='form-group'>
            <label className='form-label'>Confirm Password</label>
            <input className="form-input" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder='Confirm Password' required />
          </div>

          <div className='form-group-checkbox'>
            <label className='form-checkbox'>
              <input className="form-checkbox-input" type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
              <span className="checkbox-box"></span>
            </label>
            <label className="checkbox-label">I accept <a href="#">Terms and Conditions</a></label>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-auth-submit">Create Account</button>
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