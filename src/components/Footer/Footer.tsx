import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget mauris vitae
            consequat semper.
          </p>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: info@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <img src="facebook-icon.png" alt="Facebook" />
            </a>
            <a href="#" className="social-icon">
              <img src="twitter-icon.png" alt="Twitter" />
            </a>
            <a href="#" className="social-icon">
              <img src="instagram-icon.png" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Todo App. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer