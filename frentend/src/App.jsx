import './App.css'

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import MyRecipesPage from './pages/MyRecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import MealPlannerPage from './pages/MealPlannerPage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProtectedRoute from './components/routing/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import SearchPage from './pages/SearchPage'; // 1. Removed the duplicate import
import PublicHomePage from './pages/PublicHomePage';
import Footer from './components/layout/Footer';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto py-8 px-4"> {/* Added horizontal padding */}
            <Routes>
              {/* 2. Corrected the root route to show the public homepage */}
              <Route path="/" element={token ? <Navigate to="/dashboard" /> : <PublicHomePage />} />

              {/* Public auth routes */}
              <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/my-recipes" element={<MyRecipesPage />} />
                <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                <Route path="/planner" element={<MealPlannerPage />} />
              </Route>
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;