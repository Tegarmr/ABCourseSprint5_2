import { Link } from "react-router-dom";
import { useState } from "react";
import "./css/Overview.css";
import CourseCard from "./components/CourseCard";
import logo from "../assets/logo.png"
import logo2 from "../assets/logo2.png"
import card1 from "../assets/card1.png"
import card2 from "../assets/card2.png"
import card3 from "../assets/card3.png"
import card4 from "../assets/card4.png"
// Fix: Import from react-icons/lu was incorrect, switching to react-icons/fa
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

function App() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="ABCourse Logo" className="logo" />
        </div>

        <nav className="main-nav">
          <a href="#" className="nav-link">
            Home
          </a>
          <a href="#" className="nav-link">
            Course Category
          </a>
          <a href="#" className="nav-link">
            About Us
          </a>
        </nav>

        <div className="auth-buttons">
          <Link to="/login">
            <button className="btn btn-outline">LOG IN</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-primary">SIGN UP</button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge">
            <span>Never stop learning</span>
          </div>

          <h1 className="hero-title">
            Grow up your skills
            <br />
            by online courses
            <br />
            with ABCourse
          </h1>

          <button className="btn btn-cta">GET STARTED</button>
        </div>

        {/* Stats Card */}
        <div className="stats-card">
          <div className="stats-content">
            <div className="stats-info">
              <div className="stats-icon">
                <FaCalendarAlt />
              </div>
              <div>
                <p className="stats-number">250k</p>
                <p className="stats-text">Assisted Student</p>
              </div>
            </div>
            <button className="btn-know-more">
              <span>Know More</span>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section-atas">
        {/* AI Chatbot */}
        <div className="feature-card-atas">
          <div className="feature-dot"></div>
          <h3 className="feature-title">What is ABCourse?</h3>
          <a href="#" className="feature-link">
            kursus grammar
          </a>
        </div>
      </section>




      {/* Courses Category Section */}
      <section className="courses-section">
        <h2 className="section-title">Courses Category</h2>
        <div className="section-divider"></div>

        <div className="tabs">
          <div className="tabs-list">
            <button
              className={`tab-button ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Programme
            </button>
          </div>

          <div
            className="tab-content"
            style={{ display: activeTab === "all" ? "grid" : "none" }}
          >
            {/* Course Card 1 */}
            <CourseCard
              image={card1}
              title="English Grammar"
              description="blablabla"
              students={0}
              materials={5}
              buttonText="Try Now"
            />

            {/* Course Card 2 */}
            <CourseCard
              image={card3}
              title="Quiz Grammar"
              materials={5}
              buttonText="Try Now"
            />

            {/* Course Card 3 */}
            <CourseCard
              title="Grammar Checker"
              image={card2}
              materials={5}
              buttonText="Try Now"
            />

            {/* Course Card 4 */}
            <CourseCard
              title="Chatbot"
              image={card4}
              materials={5}
              buttonText="Try Now"
            />
          </div>

          <div
            className="tab-content"
            style={{ display: activeTab === "grammar" ? "grid" : "none" }}
          >
            {/* Grammar courses would go here */}
          </div>

          <div
            className="tab-content"
            style={{ display: activeTab === "listening" ? "grid" : "none" }}
          >
            {/* Listening courses would go here */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        {/* AI Chatbot */}
        <div className="feature-card">
          <div className="feature-dot"></div>
          <h3 className="feature-title">AI Chatbot</h3>
          <a href="#" className="feature-link">
            more
          </a>
        </div>

        {/* Quiz */}
        <div className="feature-card">
          <div className="feature-dot"></div>
          <h3 className="feature-title">Quiz</h3>
          <a href="#" className="feature-link">
            more
          </a>
        </div>

        {/* Grammar checker */}
        <div className="feature-card">
          <div className="feature-dot"></div>
          <h3 className="feature-title">
            Grammar
            <br />
            checker
          </h3>
          <a href="#" className="feature-link">
            more
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Logo and Contact */}
            <div className="footer-column">
              <div className="logo-container">
                <img src={logo2} alt="ABCourse Logo" className="logo" />
              </div>

              <div className="contact-info">
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <p className="contact-text">
                    Address:
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>

                <div className="contact-item">
                  <FaPhoneAlt className="contact-icon" />
                  <p className="contact-text">Tel: +2292341037</p>
                </div>

                <div className="contact-item">
                  <FaClock className="contact-icon" />
                  <p className="contact-text">Response hours: 8 to 20</p>
                </div>

                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <p className="contact-text">Email: info@abcourse.com</p>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="footer-column">
              <h3 className="footer-heading">Categories</h3>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    Grammar Checker
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    AI Chatbot
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Exams
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    more
                  </a>
                </li>
              </ul>
            </div>

            {/* Links */}
            <div className="footer-column">
              <h3 className="footer-heading">Links</h3>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-column">
              <h3 className="footer-heading">
                Stay up to date with the latest courses
              </h3>
              <div className="newsletter">
                <input
                  type="email"
                  placeholder="Email"
                  className="newsletter-input"
                />
                <button className="btn btn-primary">Send</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
