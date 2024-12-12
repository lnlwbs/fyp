import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({
    Name: "",
    Email: "",
    Password: "",
    PhoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error messages
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();
  const params = useParams();

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }
    // Handle file change for photo upload
    function handleFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        setForm((prev) => ({
          ...prev,
          photo: file, // Save the selected file in the form state
        }));
      }
    }

  async function onSubmit(e) {
    e.preventDefault();
    const endpoint = isNew
      ? "http://localhost:5050/api/users" // POST for creating a new user
      : `http://localhost:5050/api/users/${params.id}`; // PATCH for updating an existing user
    const method = isNew ? "POST" : "PATCH";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        throw new Error(errorData.message || "Unknown error occurred");
      }

      setForm({
        Name: "",
        Email: "",
        Password: "",
        PhoneNumber: "",
      });
      setErrorMessage(""); // Clear any previous errors
      navigate("/LoginPage"); // Redirect to login or user list after successful submit
    } catch (error) {
      setErrorMessage(error.message); // Set the error message for display
      console.error("Error adding/updating record:", error);
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Register User</h3>
      <form onSubmit={onSubmit} className="border rounded-lg overflow-hidden p-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              User Details
            </h2>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8">
            {/* Name */}
            <div>
              <label htmlFor="Name" className="block text-sm font-medium text-slate-900">
                Name
              </label>
              <input
                type="text"
                id="Name"
                value={form.Name}
                onChange={(e) => updateForm({ Name: e.target.value })}
                placeholder="Enter your name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="Email" className="block text-sm font-medium text-slate-900">
                Email
              </label>
              <input
                type="email"
                id="Email"
                value={form.Email}
                onChange={(e) => updateForm({ Email: e.target.value })}
                placeholder="Enter your email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="Password" className="block text-sm font-medium text-slate-900">
                Password
              </label>
              <input
                type="password"
                id="Password"
                value={form.Password}
                onChange={(e) => updateForm({ Password: e.target.value })}
                placeholder="Enter your password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            {/* Phone Number */}
            <div>
              <label htmlFor="PhoneNumber" className="block text-sm font-medium text-slate-900">
                Phone Number
              </label>
              <input
                type="tel"
                id="PhoneNumber"
                value={form.PhoneNumber}
                onChange={(e) => updateForm({ PhoneNumber: e.target.value })}
                placeholder="Enter your phone number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
        {/* Display error message */}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          className="mt-4 inline-flex justify-center rounded-md border border-gray-300 bg-blue-500 px-4 py-2 text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save User
        </button>
      </form>
    </>
  );
}