import React from 'react'
import './Homepage.css'

const Homepage = () => {
  return (
    <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Stay Organized with Todo App</h1>
            <p>Manage your tasks effortlessly and boost your productivity.</p>
            <button className="cta-button">Get Started</button>
          </div>
        </section>

        <section className="features">
          <div className="feature">
            <img src="checkmark.png" alt="Checkmark" />
            <h2>Easy to Use</h2>
            <p>Intuitive interface for a seamless experience.</p>
          </div>
          <div className="feature">
            <img src="calendar.png" alt="Calendar" />
            <h2>Organize by Date</h2>
            <p>Sort and prioritize tasks based on deadlines.</p>
          </div>
          <div className="feature">
            <img src="bell.png" alt="Bell" />
            <h2>Set Reminders</h2>
            <p>Never miss an important task with customizable reminders.</p>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users managing their tasks efficiently with Todo App.</p>
          <button className="cta-button">Sign Up Now</button>
        </section>
      </main>
  )
}

export default Homepage