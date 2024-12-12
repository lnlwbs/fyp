'use client';

import React from 'react';

const ContactUs = () => {
  return (
    <div className="w-full mx-auto flex flex-wrap justify-center items-start py-12 bg-blue dark:bg-gray-900">
      {/* Left Section - Map */}
      <div className="w-full lg:w-3/5 p-4">
        {/* Map Placeholder */}
        <div className="h-full bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <h3 className="text-xl text-center p-6 text-gray-800 dark:text-white">Our Location</h3>
          <iframe
            src="https://www.google.com/maps/embed/v1/place?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY"
            width="100%"
            height="400"
            className="rounded-lg shadow-md"
            title="Google Maps"
          ></iframe>
        </div>
      </div>

      {/* Right Section - Contact Us Form */}
      <div className="w-full lg:w-2/5 p-4 mt-8 lg:mt-0">
        <div className="max-w-4xl w-full mx-auto p-8 bg-blue dark:bg-gray-800 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">Contact Us</h2>
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="flex flex-col space-y-6"
          >
            {/* Hidden Access Key */}
            <input type="hidden" name="access_key" value="496a4b7f-300b-4cd7-8c4d-e4beee1f85e7" />

            {/* Name Input */}
            <label className="text-gray-700 dark:text-gray-300">Name:</label>
            <input
              type="text"
              name="name"
              required
              className="p-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />

            {/* Email Input */}
            <label className="text-gray-700 dark:text-gray-300">Email:</label>
            <input
              type="email"
              name="email"
              required
              className="p-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            />

            {/* Message Input */}
            <label className="text-gray-700 dark:text-gray-300">Message:</label>
            <textarea
              name="message"
              required
              className="p-4 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              rows="6"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              Submit Form
            </button>
          </form>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="w-full text-center mt-8 bg-gray-900 py-8">
  <h3 className="text-2xl text-white mb-6">Find Us on Social Media</h3>
  <div className="flex justify-center space-x-8">
    <a
      href="https://www.facebook.com/share/15WLNaAcBs/"
      className="text-3xl text-blue-600 hover:text-blue-800"
      aria-label="Facebook"
    >
      <img
        src="https://cdn-icons-png.freepik.com/256/15707/15707770.png?semt=ais_hybrid"
        alt="Facebook"
        className="h-8 w-8" // Increased size
      />
    </a>
    <a
      href="https://x.com/punchingcat?s=21"
      className="text-3xl text-blue-400 hover:text-blue-600"
      aria-label="Twitter"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/X_icon_2.svg/1200px-X_icon_2.svg.png"
        alt="Twitter"
        className="h-8 w-8" // Increased size
      />
    </a>
    <a
      href="https://www.instagram.com/lioneltans/profilecard/?igsh=MWJ6Ymk2NjVsZXA2cw=="
      className="text-3xl text-pink-600 hover:text-pink-800"
      aria-label="Instagram"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/768px-Instagram_icon.png"
        alt="Instagram"
        className="h-8 w-8" // Increased size
      />
    </a>
    <a
      href="https://www.linkedin.com/in/lionel-tan-a44a71271?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
      className="text-3xl text-blue-700 hover:text-blue-900"
      aria-label="LinkedIn"
    >
      <img
        src="https://cdn3.iconfinder.com/data/icons/2018-social-media-black-and-white-logos/1000/2018_social_media_popular_app_logo_linkedin-512.png"
        alt="LinkedIn"
        className="h-8 w-8" // Increased size
      />
    </a>
  </div>
</div>

    </div>
  );
};

export default ContactUs;
