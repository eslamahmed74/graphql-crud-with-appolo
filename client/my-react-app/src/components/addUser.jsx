import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import { GET_USERS_WITH_COMPANY } from "../graphql/queries";
import { Link } from "react-router-dom";

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    age: "",
    companyId: ""
  });
  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS_WITH_COMPANY }]
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addUser({
        variables: { ...formData, age: parseInt(formData.age) }
      });
      alert("User added successfully");
      setFormData({ firstName: "", age: "", companyId: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-[#D84040] text-white font-semibold shadow-lg hover:bg-[#A31D1D] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-[1.01]">
          <h2 className="text-4xl font-extrabold text-[#A31D1D] text-center mb-8">Add New User</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#D84040] focus:ring-4 focus:ring-[#A31D1D]/20 focus:border-[#A31D1D] transition-all duration-300"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Enter age"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#D84040] focus:ring-4 focus:ring-[#A31D1D]/20 focus:border-[#A31D1D] transition-all duration-300"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Company ID</label>
              <input
                type="text"
                name="companyId"
                placeholder="Enter company ID"
                className="w-full px-4 py-3 rounded-lg border-2 border-[#D84040] focus:ring-4 focus:ring-[#A31D1D]/20 focus:border-[#A31D1D] transition-all duration-300"
                value={formData.companyId}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D84040] hover:bg-[#A31D1D] text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding User...
                </span>
              ) : (
                "Add User"
              )}
            </button>

            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-center text-red-700 font-medium">{error.message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
