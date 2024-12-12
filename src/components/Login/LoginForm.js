import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Ensure the path is correct
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function LoginPage() {
  const [form, setForm] = useState({
    PhoneNumber: "",
    Password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from AuthContext

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const endpoint = "http://localhost:5050/api/users/login"; // Login endpoint

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
      login(data); // Store user data in context and localStorage

      // Reload Navbar by triggering a page reload
      navigate("/");
      window.location.reload(); // This will reload the page and re-render the Navbar

      setForm({
        PhoneNumber: "",
        Password: "",
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Login Error:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-gray-50 dark:bg-gray-700 p-8 shadow-lg rounded-lg max-w-md w-full">
        <h3 className="text-2xl font-bold text-center text-gray-700 dark:text-white">Login</h3>
        <form onSubmit={onSubmit} className="mt-6 space-y-6">
          {/* PhoneNumber */}
          <div>
            <label
              htmlFor="PhoneNumber"
              className="block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="PhoneNumber"
              value={form.PhoneNumber}
              onChange={(e) => updateForm({ PhoneNumber: e.target.value })}
              placeholder="Enter your phone number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              value={form.Password}
              onChange={(e) => updateForm({ Password: e.target.value })}
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Login
          </button>
        </form>
        {/* Register Link */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/RegisterPage"
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
