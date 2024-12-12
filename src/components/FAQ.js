import React, { useState } from 'react';

const FAQ = () => {
  // State to handle toggling of FAQ answers
  const [openSection, setOpenSection] = useState(null);

  // Function to toggle FAQ answers
  const toggleSection = (val) => {
    setOpenSection(openSection === val ? null : val);
  };

  return (
    <div className="container mx-auto py-9 px-4 dark:bg-gray-900" style={{ width: '80%' }}>
      <h2 className="font-semibold text-4xl leading-9  dark:text-white">
        Frequently Asked Questions
      </h2>
      <div className="mt-4 flex md:justify-between md:items-start md:flex-row flex-col justify-start items-start">
        <div>
          <p className="font-normal text-base leading-6 text-black-400 lg:w-8/12 md:w-9/12 dark:text-white">
            Here are a few of the most frequently asked questions by our valuable customers.
          </p>
        </div>
      </div>

      <div className="flex md:flex-row flex-col md:space-x-8 md:mt-16 mt-8">
        <div className="md:w-5/12 lg:w-4/12 w-full">
          <img
            src="https://i.ibb.co/8bCs73h/pexels-ron-lach-8128069-1.png"
            alt="Image of Glass bottle"
            className="w-full md:block hidden"
          />
          <img
            src="https://i.ibb.co/gZMfQJq/pexels-ron-lach-8128069-1-1.png"
            alt="Image of Glass bottle"
            className="w-full md:hidden block"
          />
        </div>
        <div className="md:w-7/12 lg:w-8/12 w-full md:mt-0 sm:mt-14 mt-10">
          {faqData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center cursor-pointer dark:text-white" onClick={() => toggleSection(index)}>
                <h3 className="font-semibold text-xl leading-5 text-black-400 dark:text-white">{item.question}</h3>
                <button
                  aria-label="toggle"
                  className="text-black-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:text-white"
                >
                  {/* Toggle between "+" and "-" icons */}
                  {openSection === index ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* "-" icon */}
                      <path d="M4.16602 10H15.8327" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* "+" icon */}
                      <path d="M10 4.1665V15.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4.16602 10H15.8327" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
              <p className={`font-normal text-base leading-6 mt-4 w-11/12 ${openSection === index ? 'block' : 'hidden'} text-black-400 dark:text-gray-300`}>
                {item.answer}
              </p>
              <hr className="my-7 bg-gray-200 dark:bg-gray-700 text-black-400 dark:text-white-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sample FAQ data
const faqData = [
  {
    question: 'Shipping',
    answer: 'We are covering every major country worldwide. The shipment leaves from the US as it is our headquarters.',
  },
  {
    question: 'Returns',
    answer: 'We offer a 30-day return policy on all our products. Please contact support for more information.',
  },
  {
    question: 'Exchange',
    answer: 'Exchanges are possible within 30 days of purchase. Please ensure the product is in original condition.',
  },
  {
    question: 'Tracking',
    answer: 'You can track your order using the tracking link sent to your email upon dispatch.',
  },
];

export default FAQ;
