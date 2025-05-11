import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import google from "../assets/Google.png";
import "./index3.css";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true,
        });

        // Jika token valid, langsung ke chatbot
        if (response.data) {
          navigate('/app');
        }
      } catch (error) {
        console.error('Token invalid atau tidak ada, stay di register');
      }
    };

    checkToken();
  }, [navigate]);

  const handleLogin = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Kirim dan terima cookie
        body: JSON.stringify({
          email,
          password,
          rememberMe
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error && Array.isArray(data.error)) {
          const newErrors = {};
          data.error.forEach(err => {
            const field = err.path?.[0] || err.path;
            if (field) newErrors[field] = err.message;
          });
          setErrors(newErrors);
          return;
        }
        throw new Error(data.message || "Login failed");
      }

      // Tidak perlu simpan token di localStorage
      toast.success("Login berhasil!");
      navigate("/app");

    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: error.message || "Login gagal. Coba lagi." });
    } finally {
      setIsLoading(false);
    }
  };


  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5000/api/auth/callback', // Arahkan ke backend
        queryParams: {
          access_type: 'offline',
          prompt: 'consent', // Dapatkan refresh token juga
        },
      },
    });

    if (error) {
      console.error("Login error:", error.message);
    }

    if (data?.url) {
      window.location.href = data.url; // Redirect ke Google
    }
  };


  return (
    <div className="login">
      <div className="group">
        <div className="overlap-group">
          <div className="div">
            <div className="text-wrapper">Lorem Ipsum is simply</div>
            <div className="text-wrapper-2">Lorem Ipsum is simply</div>
          </div>
        </div>
      </div>

      <div className="group-2">
        <div className="group-3">
          <div className="overlap-group-wrapper">
            <div className="overlap-group-2">
              <div className="overlap">
                <div className="text-wrapper-3">Login</div>
              </div>
              <div
                className="text-wrapper-4"
                onClick={() => navigate("/signup")}
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </div>
            </div>
          </div>
          <div className="text-wrapper-5">Welcome to ABCourse..!</div>
        </div>

        {/* General error message */}
        {errors.general && (
          <div className="error-message">
            {errors.general}
          </div>
        )}

        <div className="group-4">
          {/* Email field with error */}
          <div className="group-5">
            <div className="text-wrapper-7">Email Address</div>
            <div className={`div-wrapper ${errors.email ? "error-input" : ""}`}>
              <input
                type="email"
                className="input"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                }}
              />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          {/* Password field with error */}
          <div className="overlap-wrapper">
            <div className="overlap-2">
              <div className="group-6">
                <div className="text-wrapper-7">Password</div>
                <div className={`div-wrapper ${errors.password ? "error-input" : ""}`}>
                  <input
                    type="password"
                    className="input"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                    }}
                  />
                </div>
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>
              <div className="invisible">
                <div className="group-7" />
              </div>
            </div>
          </div>          
        </div>

        <div className="group-8">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rectangle-2"
          />
          <label htmlFor="rememberMe" className="text-wrapper-8">Remember me</label>
          <div
            className="text-wrapper-9"
            onClick={() => navigate("/forgot-password")}
            style={{ cursor: "pointer" }}
          >
            Forgot Password ?
          </div>
        </div>
        
        <div className="social-login">
            <p className="social-text">or sign in with</p>
            <div className="social-buttons">
              <button
                type="button"
                className="btn-social"
                onClick={handleGoogleLogin} // Google login
              >
                <img src={google} alt="Google" className="social-icon" />
              </button>
            </div>
          </div>

        <div className="group-9">
          <button
            className="overlap-3"
            onClick={handleLogin}
            disabled={isLoading}
          >
            <div className="text-wrapper-10">
              {isLoading ? "Logging in..." : "Login"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
