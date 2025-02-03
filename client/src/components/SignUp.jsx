import { X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/users/login");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err.message);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-black backdrop-blur w-full max-w-md rounded-lg shadow-lg overflow-hidden border border-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Sign Up</h2>
          <Link to="/">
            <button className="text-gray-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp}>
          <div className="p-6 space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-400"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 px-6 py-4 bg-black">
            <Link to="/">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-transparent border border-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white border border-gray-500 bg-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
