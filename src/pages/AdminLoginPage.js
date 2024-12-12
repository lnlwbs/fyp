import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function LoginPage() {
  const [form, setForm] = useState({
    Name: "",
    Password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const endpoint = "http://localhost:5050/api/admin/"; // Login endpoint

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login");
      }

      const data = await response.json(); // Assume response contains user data or token

      // Reload Navbar by triggering a page reload
      navigate("/AdminPage");

      setForm({
        Name: "",
        Password: "",
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Login Error:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h3 className="text-2xl font-bold text-center text-gray-700">Admin Login Page</h3>
        <form onSubmit={onSubmit} className="mt-6 space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="Name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="Name"
              value={form.Name}
              onChange={(e) => updateForm({ Name: e.target.value })}
              placeholder="Enter your name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              value={form.Password}
              onChange={(e) => updateForm({ Password: e.target.value })}
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {errorMessage}
            </p>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        
        
      </div>
    </div>
  );
}
