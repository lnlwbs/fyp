import React from "react";

function PilatesStudioInfo() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
 

      {/* Mission Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              To empower individuals through Pilates by fostering physical
              strength, mental clarity, and holistic well-being.
            </p>
          </div>
          <img
            src="https://images.squarespace-cdn.com/content/v1/608b5e8092e28e188649aa37/5077dfe9-05c5-4418-a92d-65170bcb42b0/frontToBack.jpg"
            alt="Pilates in action"
            className="rounded-lg shadow-md object-cover w-full h-64"
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <img
            src="https://static.wixstatic.com/media/420f35_8c1b9d807b0241098b2055f7707c112d~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/420f35_8c1b9d807b0241098b2055f7707c112d~mv2.jpg"
            alt="Studio founders"
            className="rounded-lg shadow-md object-cover w-full h-64"
          />
          <div>
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Established in 2010, Harmony Pilates Studio began as a small community of wellness enthusiasts.
              Over the years, we've grown into a hub for holistic fitness, offering personalized programs and
              a welcoming environment for all.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Harmony by the Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <p className="text-5xl font-extrabold text-indigo-600">3</p>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Locations</p>
            </div>
            <div>
              <p className="text-5xl font-extrabold text-indigo-600">20+</p>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Certified Instructors</p>
            </div>
            <div>
              <p className="text-5xl font-extrabold text-indigo-600">500+</p>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Happy Clients</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PilatesStudioInfo;
