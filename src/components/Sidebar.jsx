import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../assets/sidebar.css";
import { ArrowLeft } from "lucide-react";

const SidebarLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setLoading(false);
      } catch (error) {
        console.error("Token invalid atau tidak ada, redirect ke login");
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-header">
        <div className="sidebar-header">
  <button className="back-button" onClick={() => navigate('/app')}>
    <ArrowLeft size={16} />
  </button>
  <h1 className="sidebar-title">CHANGE SIMPLIFICATION</h1>
</div>

          <h1 className="sidebar-title">CHANGE SIMPLIFICATION</h1>
        </div>

        <div className="lessons-container">
          {[
            { color: "teal", title: "Adjective", path: "/adjective" },
            { color: "blue", title: "Noun", path: "/noun" },
            { color: "purple", title: "Verb", path: "/verb" },
            { color: "red", title: "Adverb", path: "/adverb" },
          ].map((item, index) => (
            <div
  key={`lesson-${index}`}
  className={`lesson-card ${item.color}-card ${
    location.pathname === item.path ? "active" : ""
  }`}
>

              <div className="card-icon">
                <span>📚</span>
              </div>
              <div className="card-content">
                <span className="card-subtitle">Lesson 0{index + 1}</span>
                <Link
                  to={item.path}
                  className={`card-title ${location.pathname === item.path ? "active" : ""}`}
                >
                  {item.title}
                </Link>
                <span className="card-duration">30 mins</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
};

export default SidebarLayout;
