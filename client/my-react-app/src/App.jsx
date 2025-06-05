import React from "react";
import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import UsersList from "./components/usersList";
import AddUser from "./components/addUser";

// Dashboard component for better organization
const Dashboard = ({ onLogout }) => (
  <div className="min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] p-6">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-[1.01]">
        <h2 className="text-4xl font-extrabold text-[#A31D1D] text-center mb-8">
          Welcome to Dashboard
        </h2>

        <nav className="flex flex-wrap justify-center gap-4">
          <Link
            to="/users"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-[#D84040] text-white font-semibold shadow-lg hover:bg-[#A31D1D] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Users List
          </Link>

          <Link
            to="/add-user"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-[#D84040] text-white font-semibold shadow-lg hover:bg-[#A31D1D] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </Link>

          <button
            onClick={onLogout}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-600 text-white font-semibold shadow-lg hover:bg-gray-800 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </nav>
      </div>
    </div>
  </div>
);

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF]">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/users"
          element={
            isAuthenticated ? (
              <UsersList />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/add-user"
          element={
            isAuthenticated ? (
              <AddUser />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
