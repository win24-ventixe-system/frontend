import { CiFacebook, CiLinkedin } from 'react-icons/ci'
import { FaInstagram } from 'react-icons/fa6'
import { RiTwitterXFill } from "react-icons/ri";
import { FiYoutube } from 'react-icons/fi'


const Footer = () => {
  return (
    <footer>
      <div className='footer-text'>

        <span className='copyright'>Copyright © 2025 Peterdraw</span>
        <a href="#" className='privacy-policy'>Privacy Policy</a>
        <a href="#" className="terms">Terms and Conditions</a>
        <a href="#" className="contact">Contact</a>
      </div>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <CiFacebook /> 
          </a>
         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <RiTwitterXFill />
         </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FiYoutube/>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <CiLinkedin />
        </a>
        </div>
      
    </footer>
  )
}

export default Footer