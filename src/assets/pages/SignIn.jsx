import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GoogleIcon from '../../assets/images/icon_google.svg'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isPersistent: true
  })
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }
   const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
    // AuthContext or an API here
  }

   return (
     <div className='sign-in card' id="login">
        <div className="card-header">
              <h1>Sign In</h1>
        </div>

        <div className='card-body'>
        <div className="btn btn-external">
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
          </div>

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