import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS_WITH_COMPANY } from "../graphql/queries";
import { Link } from "react-router-dom";

const UsersList = () => {
  const { loading, error, data } = useQuery(GET_USERS_WITH_COMPANY);

  if (loading) 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF]">
        <div className="flex items-center space-x-4">
          <svg className="animate-spin h-8 w-8 text-[#A31D1D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-xl font-semibold text-[#A31D1D]">Loading users...</span>
        </div>
      </div>
    );
    
  if (error) 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF]">
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl shadow-lg">
          <p className="text-xl font-semibold text-red-700">Error: {error.message}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] p-6">
      <div className="max-w-7xl mx-auto">
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

          <Link
            to="/add-user"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-[#D84040] text-white font-semibold shadow-lg hover:bg-[#A31D1D] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New User
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <h2 className="text-4xl font-extrabold text-[#A31D1D] text-center mb-8">Users List</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...data.users].reverse().map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl border-2 border-[#ECDCBF] shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500 font-mono">ID: {user.id}</p>
                    <span className="px-3 py-1 bg-[#ECDCBF] text-[#A31D1D] rounded-full text-sm font-medium">
                      Age: {user.age}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#A31D1D] mb-4">{user.firstName}</h3>
                  
                  <div className="bg-[#F8F2DE] rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-[#A31D1D] mb-3">Company Details</h4>
                    <div className="space-y-2">
                      <p className="flex items-center text-gray-700">
                        <span className="font-medium w-20">ID:</span>
                        <span className="font-mono">{user.company?.id || "N/A"}</span>
                      </p>
                      <p className="flex items-center text-gray-700">
                        <span className="font-medium w-20">Name:</span>
                        <span>{user.company?.name || "N/A"}</span>
                      </p>
                      <p className="flex items-center text-gray-700">
                        <span className="font-medium w-20">Slogan:</span>
                        <span className="italic">{user.company?.slogan || "N/A"}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
