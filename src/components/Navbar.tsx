import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [openNavbar, setOpenNavbar] = useState(false);
  const isUserIsLoggedin = localStorage.getItem("token");

  return (
    <nav className="shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <div>
            <Link
              className="text-2xl font-bold text-black dark:text-white lg:text-3xl hover:text-indigo-700 duration-300 dark:hover:text-gray-300"
              to="/"
            >
              U Payments
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => {
                setOpenNavbar(!openNavbar);
              }}
              type="button"
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-700 duration-300 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div id="nav" className={openNavbar ? "hidden" : ""}>
          <div className="items-center md:flex">
            <div className="flex flex-col md:flex-row md:mx-6">
              {isUserIsLoggedin && (
                <Link
                  to="/login"
                  onClick={() => {
                    localStorage.clear();
                  }}
                  className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-700 duration-300 dark:hover:text-indigo-400 md:mx-4 md:my-0"
                >
                  Logout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
