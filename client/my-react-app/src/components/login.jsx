import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ name: "", company: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      formData.name.toLowerCase() === "ahmed" &&
      formData.company.toLowerCase() === "apple"
    ) {
      // Set token in localStorage to mark user as logged in
      localStorage.setItem("token", "authenticated");

      alert(`Welcome ${formData.name} from ${formData.company}! ✅`);
      navigate("/dashboard");
    } else {
      alert("Incorrect credentials ❌\nTry: Name - Ahmed, Company - Apple");
    }
    setFormData({ name: "", company: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F2DE] to-[#ECDCBF] p-4">
      <div className="max-w-md w-full mx-auto p-8 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-sm transform transition-all hover:scale-[1.02]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#A31D1D] mb-2">Welcome Back</h1>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#D84040] focus:ring-4 focus:ring-[#A31D1D]/20 focus:border-[#A31D1D] transition-all duration-300"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              name="company"
              placeholder="Enter your company"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#D84040] focus:ring-4 focus:ring-[#A31D1D]/20 focus:border-[#A31D1D] transition-all duration-300"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D84040] hover:bg-[#A31D1D] text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
