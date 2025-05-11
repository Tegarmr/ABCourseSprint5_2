export default function Chatbot() {
  const suggestionQuestions = [
    "What can I ask you to do?",
    "What is Grammar?",
    "What skills should I be concerned about right now?",
  ];

  return (
    <div className="dashboard-container">
      <div className="chatbot-content">
        <div className="chatbot-center">
          <div className="chatbot-header">
            <div className="sparkle-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3L13.4328 8.56718L19 10L13.4328 11.4328L12 17L10.5672 11.4328L5 10L10.5672 8.56718L12 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="chatbot-title">Ask our AI anything</h1>
          </div>

          <div className="chatbot-suggestions">
            <p className="suggestions-label">
              Suggestions on what to ask Our AI
            </p>
            <div className="suggestions-grid">
              {suggestionQuestions.map((question, index) => (
                <button key={index} className="suggestion-button">
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className="chatbot-input-container">
            <div className="chatbot-input-wrapper">
              <input
                type="text"
                className="chatbot-input"
                placeholder="What's on your mind?"
              />
              <button className="send-button">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 2L11 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
