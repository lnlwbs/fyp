'use client';

import React, { useState } from 'react';

const ContactUs = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the form visibility
  const toggleForm = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleForm}
        className="fixed bottom-6 left-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-50"
      >
        Contact Us
      </button>

      {/* Modal Form */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white max-w-lg w-full mx-4 p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={toggleForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Contact Us</h2>
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="flex flex-col space-y-4"
            >
              {/* Hidden Access Key */}
              <input type="hidden" name="access_key" value="496a4b7f-300b-4cd7-8c4d-e4beee1f85e7" />

              {/* Name Input */}
              <label className="text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {/* Email Input */}
              <label className="text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {/* Message Input */}
              <label className="text-gray-700">Message:</label>
              <textarea
                name="message"
                required
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="5"
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit Form
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUs;
