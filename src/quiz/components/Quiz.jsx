import React, { useState } from "react";
import axios from 'axios';
import "./styles.css";
import { useNavigate } from "react-router-dom";

export default function Quiz({ data, id }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate()

  const handleNext = async () => {
    if (selected === data[current].answer) {
      setScore(score + 1);
    }
    if (current < data.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      await submitQuiz()
      setShowResult(true);
    }
  };

  const submitQuiz = async () => {
    const response = await axios.post('http://localhost:5000/api/quiz', {
      score: score / data.length * 100,
      materi_id: id
    }, {
      withCredentials: true
    })
  }

  const handleBack = () => {
    navigate('/app')
  }

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result">
          <h2>Quiz Completed!</h2>
          <p>
            Your Score: {score} / {data.length}
          </p>
          <button onClick={handleBack}>
            Go Back
          </button>
        </div>
      ) : (
        <div className="quiz-box">
          <h3>{data[current].question}</h3>
          <ul>
            {data[current].options.map((opt, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={index}
                    checked={selected === index}
                    onChange={() => setSelected(index)}
                  />
                  {opt}
                </label>
              </li>
            ))}
          </ul>
          <button disabled={selected === null} onClick={handleNext}>
            {current === data.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
