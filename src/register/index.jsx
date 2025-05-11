
import google from "../assets/Google.png";
import "./index2.css";
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from "axios";



const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true,
        });
  
        // Jika token valid, langsung ke overview
        if (response.data) {
          navigate('/app');
        }
      } catch (error) {
        console.error('Token invalid atau tidak ada, stay di register');
      }
    };
  
    checkToken();
  }, [navigate]);
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error on input change
    setFormErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError(false);
    setFormErrors({});

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error && Array.isArray(data.error)) {
          const fieldErrors = {};
          data.error.forEach(err => {
            const field = err.path?.[0];
            if (field) fieldErrors[field] = err.message;
          });
          setFormErrors(fieldErrors);
        } else {
          setMessage(data.message || "Registration failed");
          setError(true);
        }
      } else {
        setMessage(data.message || "Registration successful!");
        setError(false);
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
      setError(true);
    }
  };

  return (
    <div className="register">
      <div className="group">
        <div className="div">
          <div className="text-wrapper">Lorem Ipsum is simply</div>
          <div className="text-wrapper-2">Lorem Ipsum is simply</div>
        </div>
      </div>

      <div className="group-2">
        <div className="group-3">
          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <div
                className="text-wrapper-3"
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer" }}
              >
                Log In
              </div>
              <div className="overlap">
                <div className="text-wrapper-4">Sign Up</div>
              </div>
            </div>
          </div>
          <div className="text-wrapper-5">Welcome to ABCourse..!</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="group-4">
            <div className="div-wrapper">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="text-wrapper-6 input-field"
                placeholder="Enter your User name"
              />
            </div>
            <div className="text-wrapper-7">User name</div>
            {formErrors.username && <p className="error-text">{formErrors.username}</p>}
          </div>

          <div className="group-5">
            <div className="div-wrapper">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-wrapper-6 input-field"
                placeholder="Enter your Email Address"
              />
            </div>
            <div className="text-wrapper-7">Email Address</div>
            {formErrors.email && <p className="error-text">{formErrors.email}</p>}
          </div>

              <div className="group-6">
                <div className="div-wrapper">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="text-wrapper-6 input-field"
                    placeholder="Enter your Password"
                  />
                </div>
                <div className="text-wrapper-7">Password</div>
                {formErrors.password && <p className="error-text">{formErrors.password}</p>}
              </div>
              
              <div className="group-6-2">
                <div className="div-wrapper">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="text-wrapper-6 input-field"
                    placeholder="Confirm your Password"
                  />
                </div>
                <div className="text-wrapper-7">Confirm Password</div>
                {formErrors.confirmPassword && (
                  <p className="error-text">{formErrors.confirmPassword}</p>
                )}
              </div>

          {/* Social Login Section - Adjusted */}

          <div className="group-8">
            <button type="submit" className="overlap-3">
              <div className="text-wrapper-8">Register</div>
            </button>
          </div>

          {message && (
            <div className={`message ${error ? "error" : "success"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;