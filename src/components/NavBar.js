import { useState, useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Products", href: "/ProductPage", current: false },
  { name: "Contact Us", href: "/ContactUsPage", current: false },
  { name: "About Us", href: "/AboutUs", current: false },
  { name: "Admin", href: "/AdminLoginPage", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(storedDarkMode);
    document.documentElement.classList.toggle("dark", storedDarkMode);
  }, []);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      const storedUserName = sessionStorage.getItem("userName");
      const storedUserPhoneNumber = sessionStorage.getItem("userPhoneNumber");
      setUser({
        userId: storedUserId,
        userName: storedUserName,
        userPhoneNumber: storedUserPhoneNumber,
      });
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    document.documentElement.classList.toggle("dark", newDarkModeState);
    localStorage.setItem("darkMode", newDarkModeState);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userPhoneNumber");
    setUser(null);
    navigate("/");
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 left-0 w-full z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <a href="/">
                    <img
                      alt="Your Company"
                      src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                      className="h-8 w-auto"
                    />
                  </a>
                </div>
                {/* Desktop navigation */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dark mode toggle */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">Toggle dark mode</span>
                  {isDarkMode ? (
                    <SunIcon className="h-6 w-6 text-yellow-400" />
                  ) : (
                    <MoonIcon className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Login Button */}
              {!open && !user && (
                <button
                  onClick={() => navigate("/LoginPage")}
                  className="hidden sm:block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-4"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile navigation panel */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </a>
              ))}

              {user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={() => navigate("/LoginPage")}
                  className="block w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                >
                  Login
                </button>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}


//make sure that the logout and login button is visible outside the hamburger menu when the hamburger menu is not visible and the logout and login button is visible in the hamburger menu when the hamburger menu is visible