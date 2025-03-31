// This component fetches a quiz by ID and displays its questions and answers.
// It allows the user to select answers and submit the quiz.
// The submission sends the selected answers to the backend and displays the score.

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import API from "../../api";

const QuizDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user_id") || "student01"; // fallback user

  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/quizzes/${id}`)
      .then((res) => setQuiz(res.data))
      .catch((err) => {
        console.error("Failed to load quiz:", err);
      });
  }, [id]);

  const handleAnswerChange = (questionId, answerId) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerId });
  };

  const handleSubmit = () => {
    const answers = Object.entries(selectedAnswers).map(([questionId, selectedAnswerId]) => ({
      question_id: parseInt(questionId),
      selected_answer_id: selectedAnswerId
    }));

    const payload = {
      user_id: userId,
      quiz_id: quiz.id,
      answers
    };

    API.post(`/quizzes/${quiz.id}/submit`, payload)
      .then((res) => {
        alert("Quiz submitted! Score: " + res.data.score);
        navigate(`/quiz/submitted?user_id=${userId}`);
      })
      .catch((err) => {
        console.error("Submission failed:", err);
        alert("Submission failed");
      });
  };

  if (!quiz) return <p>Loading quiz...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
      <p className="mb-4 text-gray-600">{quiz.description}</p>

      {quiz.questions.map((question) => (
        <div key={question.id} className="mb-6">
          <p className="font-semibold mb-2">{question.text}</p>
          {question.answers.map((answer) => (
            <label key={answer.id} className="block mb-1">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={answer.id}
                checked={selectedAnswers[question.id] === answer.id}
                onChange={() => handleAnswerChange(question.id, answer.id)}
                className="mr-2"
              />
              {answer.text}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizDetails;



