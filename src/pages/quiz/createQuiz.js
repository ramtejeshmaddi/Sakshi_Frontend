import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../api";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", answers: [{ text: "", is_correct: false }] },
  ]);

  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("group_id");
  const createdBy = searchParams.get("user_id");
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { text: "", answers: [{ text: "", is_correct: false }] }]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addAnswer = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].answers.push({ text: "", is_correct: false });
    setQuestions(updated);
  };

  const removeAnswer = (qIndex, aIndex) => {
    const updated = [...questions];
    updated[qIndex].answers.splice(aIndex, 1);
    setQuestions(updated);
  };

  const handleAnswerChange = (qIndex, aIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex][field] = value;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    const payload = {
      title,
      description,
      group_id: parseInt(groupId),
      created_by: createdBy,
      questions,
    };

    console.log("Submitting payload:", payload);

    try {
      await API.post("/quizzes", payload);
      alert("Quiz created successfully!");
      navigate(`/quiz?group_id=${groupId}&user_id=${createdBy}&role=admin`);
    } catch (err) {
      console.error(err);
      alert("Failed to create quiz");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Create a Quiz</h2>

      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <textarea
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="border p-4 mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Question {qIndex + 1}</h3>
            <button
              type="button"
              onClick={() => removeQuestion(qIndex)}
              className="text-red-500 text-sm"
            >
              Remove Question
            </button>
          </div>

          <input
            type="text"
            placeholder="Question text"
            value={q.text}
            onChange={(e) =>
              handleQuestionChange(qIndex, "text", e.target.value)
            }
            className="border p-2 w-full mb-2"
          />

          {q.answers.map((answer, aIndex) => (
            <div key={aIndex} className="flex gap-2 items-center mb-1">
              <input
                type="text"
                placeholder="Answer text"
                value={answer.text}
                onChange={(e) =>
                  handleAnswerChange(qIndex, aIndex, "text", e.target.value)
                }
                className="border p-1"
              />
              <input
                type="checkbox"
                checked={answer.is_correct}
                onChange={(e) =>
                  handleAnswerChange(qIndex, aIndex, "is_correct", e.target.checked)
                }
              />
              <button
                type="button"
                onClick={() => removeAnswer(qIndex, aIndex)}
                className="text-red-500 text-xs"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addAnswer(qIndex)}
            className="text-sm text-blue-600 mt-2"
          >
            + Add Answer
          </button>
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Add Question
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default CreateQuiz;
