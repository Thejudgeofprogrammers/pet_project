import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import Books from './components/Books';
import BookDetails from './components/BookDetails';
import Profile from './components/Profile';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<PrivateRoute component={Books} />} />
        <Route path="/books/:id" element={<PrivateRoute component={BookDetails} />} />
        <Route path="/profile" element={<PrivateRoute component={Profile} />} />
      </Routes>
    </Router>
  );
};

export default App;