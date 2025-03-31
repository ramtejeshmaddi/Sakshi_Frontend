// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import QuizDashboard from './pages/quiz/quizDashboard';
import QuizDetails from './pages/quiz/quizDetails';
import QuizSubmission from './pages/quiz/quizSubmission';
import CreateQuiz from './pages/quiz/createQuiz';
import GroupList from './pages/quiz/groupList';
import RoleRedirect from './pages/quiz/RoleRedirect';
import MockLogin from './pages/quiz/MockLogin';
import AdminDashboard from './pages/quiz/AdminDashboard';
import StudentDashboard from './pages/quiz/StudentDashboard';
import './App.css';




function App() {
  
  return (
    <Router>
      <Routes>
        {/* Redirect to a default dashboard based on the role */}
        <Route path="/" element={<MockLogin />} />
        <Route path="/redirect" element={<RoleRedirect />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />


        {/* Quiz routes */}
        <Route path="/quiz" element={<QuizDashboard />} />
        <Route path="/quiz/:id" element={<QuizDetails />} />
        <Route path="/quiz/submitted" element={<QuizSubmission />} />
        <Route path="/quiz/create" element={<CreateQuiz />} />
        <Route path="/groups" element={<GroupList />} />
      </Routes>
    </Router>
  );
}

export default App;