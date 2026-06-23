import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration/Registration';
import Categories from './pages/Categories/Categories';
import Dashboard from './pages/Dashboard/Dashboard';
import Entertainment from './pages/Entertainment/Entertainment';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />

        <Route
          path="/categories"
          element={
            <ProtectedRoute requireUser>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireUser>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movies"
          element={
            <ProtectedRoute requireUser requireCategories>
              <Entertainment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
