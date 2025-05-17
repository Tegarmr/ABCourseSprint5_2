import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Overview() {
  const navigate = useNavigate();
  const [finishedCourses, setFinishedCourses] = useState([
    {
      nama_materi: "Present Tense",
      materi_id: 1,
      score: "95/100",
      status: "Passed",
    },
  ]);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  // Objek mapping nama materi ke path quiz
  const quizPathMapping = {
    "present": "/present/quiz",                         // Simple Present Tense
    "past": "/past/quiz",                               // Simple Past Tense
    "presentperfect": "/presentperfect/quiz",           // Present Perfect Tense
    "pastp": "/pastp/quiz",                             // Past Perfect Tense
    "simplef": "/simplef/quiz",                         // Simple Future Tense
    "futurep": "/futurep/quiz",                         // Future Perfect Continuous Tense
    "adjective": "/adjective/quiz",                     // Adjectives
    "adverb": "/adverb/quiz",                           // Adverbs
    "articles": "/articles/quiz",                       // Articles
    "prepositions": "/prepositions/quiz",               // Prepositions
    "indirect": "/indirect/quiz",                       // Indirect Speech
    "question": "/question/quiz",                       // Question Words
    "subject": "/subject/quiz",                         // Subject Verb Agreement
    "causative": "/causative/quiz",                     // Causative
    // Tambahkan mapping lain sesuai dengan struktur materi dan quiz yang ada
  };
  
  // Fungsi untuk menangani tombol retake quiz
  const handleRetakeQuiz = (materiName) => {
    // Ekstrak nama materi tanpa spasi (gunakan huruf kecil untuk konsistensi)
    const materiKey = materiName.toLowerCase().replace(/\s+/g, '');
    
    // Cari path quiz berdasarkan nama materi
    let quizPath = null;
    for (const [key, path] of Object.entries(quizPathMapping)) {
      if (materiKey.includes(key)) {
        quizPath = path;
        break;
      }
    }
    
    // Jika quiz path ditemukan, arahkan ke halaman quiz
    if (quizPath) {
      navigate(quizPath);
    } else {
      console.error(`Quiz path tidak ditemukan untuk materi: ${materiName}`);
      // Fallback ke halaman material
      navigate(`/${materiKey}`);
    }
  };

  useEffect(() => {
    // Fetch user data
    const getUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });

        const { username, email } = response.data.user;
        setUserData({
          username,
          email,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    getUserData();

    // Fetch course data
    const getCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/materi", {
          withCredentials: true,
        });

        const materi = response.data.data.materi;
        const filteredMateri = materi.filter(
          (materi) => materi.quiz && materi.quiz.length > 0
        );

        const mappedCourses = filteredMateri.map((course) => {
          // Mendapatkan nilai terbaik jika tersedia
          const bestScore = course.bestScore || 
            (course.quiz.length > 0 
              ? Math.max(...course.quiz.map(q => q.nilai_quiz)) 
              : 0);
          
          // Mendapatkan nilai terbaru
          const latestScore = course.quiz.length > 0 
            ? course.quiz[0].nilai_quiz 
            : 0;
          
          return {
            nama_materi: course.nama_materi,
            materi_id: course.materi_id,
            // Tampilkan nilai terbaru/nilai terakhir
            score: latestScore.toFixed(0) + "/100",
            // Nilai terbaik untuk menentukan status
            bestScore: bestScore,
            status: bestScore >= 80 ? "Passed" : "Remedial",
            // Path untuk menyimpan rute quiz
            quizPath: "",
          };
        });

        setFinishedCourses(mappedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    getCourses();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="main-content">
          <h1 className="page-title">Overview</h1>
          <p className="welcome-message">
            Welcome back, {userData.username || "Mulyono"}! Your progress is
            really good. Keep it up
          </p>

          <div className="dashboard-grid">
            <div className="score-card">
              <div className="leaf-decoration"></div>
              <div className="score-content">
                <h2 className="value">9.6 AVERAGE SCORE</h2>
                <p className="score-comparison">Better than 86% of students</p>
              </div>
            </div>

            <div className="course-progress-card">
              <div className="course-info">
                <div>
                  <h3 className="course-title">
                    Intermediate Grammar, Grammar...
                  </h3>
                  <p className="course-subtitle">Continue Learning</p>
                </div>
                <button className="continue-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="progress-section">
                <div className="progress-label">
                  <span>In Progress</span>
                  <span>34%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "34%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="finished-courses-section">
            <div className="section-header">
              <h2>Finished Course</h2>
              <a href="#" className="view-all">
                View all
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#FFC107"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <div className="courses-table">
              <div className="table-header">
                <div className="col-course">Course name</div>
                <div className="col-score">Score</div>
                <div className="col-status">Status</div>
                <div className="col-retake">Retake Quiz</div>
              </div>

              <div className="table-wrapper">
                {finishedCourses.map((course, index) => (
                  <div className="table-row" key={index}>
                    <div className="col-course">
                      <div className="course-info">
                        <div className="course-triangle"></div>
                        <div>
                          <div className="course-name">
                            {course.nama_materi}
                          </div>
                          <div className="course-materials">
                            {course.materials} Materials Available
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-score">
                      <span className="score-value">{course.score}</span>
                    </div>
                    <div className="col-status">
                      <span
                        className={`status-badge ${course.status.toLowerCase()}`}
                      >
                        {course.status}
                      </span>
                    </div>
                    <div className="col-retake">
                      <button 
                        className="retake-btn"
                        onClick={() => handleRetakeQuiz(course.nama_materi)}
                        title="Retake Quiz"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z"
                            stroke="#666666"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-profile">
          <div className="profile-section">
            <div className="avatar">
              <img src="/placeholder.svg?height=120&width=120" alt="Mulyono" />
            </div>
            <h2 className="user-name">{userData.username || "Mulyono"}</h2>
            <p className="user-email">
              {userData.email || "mulyono01@gmail.com"}
            </p>
          </div>

          <div className="divider"></div>

          <div className="summary-section">
            <div className="summary-header">
              <h3>Summary</h3>
              <button className="notification-bell">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.73 21C13.554221.3031 13.3019 21.5548 12.9982 21.7295C12.6945 21.9042 12.3508 21.9954 12 21.9954C11.6492 21.9954 11.3055 21.9042 11.0018 21.7295C10.6981 21.5548 10.4458 21.3031 10.27 21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="summary-content">
              <div className="summary-item">
                <span className="summary-value">
                  {finishedCourses.filter(course => course.bestScore >= 80).length}
                </span>
                <span className="summary-label">Passed Course</span>
              </div>
              <div className="summary-item">
                <span className="summary-value">
                  {finishedCourses.filter(course => course.bestScore < 80).length}
                </span>
                <span className="summary-label">Remedial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .retake-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .retake-btn:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        .retake-btn:active {
          background-color: rgba(0, 0, 0, 0.1);
        }
        
        .retake-btn svg {
          transition: stroke 0.2s;
        }
        
        .retake-btn:hover svg path {
          stroke: #4caf50;
        }
      `}</style>
    </div>
  );
}
