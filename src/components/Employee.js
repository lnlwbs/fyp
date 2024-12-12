import { useState } from "react";

function Employee() {
  const [employees, setEmployees] = useState([
    {
      name: "Lionel",
      role: "Founder",
      img: "https://media.licdn.com/dms/image/v2/D4E03AQF7MFNBQfCXEA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1681040193132?e=1739404800&v=beta&t=JzlDQNVtL-9bVRz1Jilu_Yxg3eZ2_0UTE87DlrBrfd0",
    },
    {
      name: "Sarah",
      role: "Head Ariel Pilates Instructor",
      img: "https://img.republicworld.com/tr:w-800,h-450,q-75,f-auto/rimages/whatsappimage2024-03-22at4.07.35pm-171110413838116_9.webp",
    },
    {
      name: "Anne",
      role: "Head Pilates Instructor",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROMWPDsJWIRu8C-_CNWI332ambZsLtVRMN4A&s",
    },
    {
      name: "Jeswinder",
      role: "Assitant Head Pilates Instructor",
      img: "https://www.pilates.com/static/8671e8c9f3f06d3a842826057e449467/ab438/banner1-12.jpg",
    },
  ]);

  return (
    <div className="bg-white-900 dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Meet the team
          </h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            We’re a dynamic group of individuals who are passionate about Pilates and dedicated to helping you achieve your fitness goals.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {employees.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <div className="h-24 w-24 overflow-hidden rounded-lg">
                  <img
                    alt={person.name}
                    src={person.img}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Employee;
