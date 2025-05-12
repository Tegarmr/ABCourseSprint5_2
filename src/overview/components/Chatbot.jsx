import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([]); // [{ sender: "user" | "bot", text }]
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll ke bawah setiap kali ada message baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: input,
      });

      const botMessage = {
        sender: "bot",
        text: res.data.reply || "No response from AI.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chatbot API error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't process your request." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestionQuestions = [
    "What can I ask you to do?",
    "What is Grammar?",
    "What skills should I be concerned about right now?",
  ];

  return (
    <div className="dashboard-container">
      <div className="chatbot-content">
        <div className="chatbot-center">
          {messages.length === 0 && (
  <>
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
                <button
                  key={index}
                  className="suggestion-button"
                  onClick={() => {
                    setInput(question);
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
</>
)}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.sender === "user" ? "user" : "bot"
                }`}
              >
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-message bot">
                <div className="chat-bubble">Thinking...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <div className="chatbot-input-wrapper">
              <input
                type="text"
                className="chatbot-input"
                placeholder="What's on your mind?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={loading}
              />
              <button
                className="send-button"
                onClick={handleSend}
                disabled={loading || !input.trim()}
              >
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
