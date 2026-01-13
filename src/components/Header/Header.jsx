import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchVisible((prev) => !prev);

  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }`;

  const mobileLinkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center ml-2 md:ml-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8 text-blue-600"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zm8.25 0v.75a3 3 0 11-6 0V6a3 3 0 116 0zm-3.75 8.25a3 3 0 106 0 3 3 0 00-6 0zm-3.75 0a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-800">
                MegaMart
              </span>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-2 ml-8">
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/women" className={linkClasses}>
              Women
            </NavLink>
            <NavLink to="/men" className={linkClasses}>
              Men
            </NavLink>
            <NavLink to="/kids" className={linkClasses}>
              Kids
            </NavLink>
            <NavLink to="/home-living" className={linkClasses}>
              Home & Living
            </NavLink>
            <NavLink to="/beauty" className={linkClasses}>
              Beauty
            </NavLink>
          </nav>

          {/* Desktop search */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search groceries..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Right side buttons and mobile toggles */}
          <div className="flex items-center">
            {/* Mobile search toggle */}
            <button
              onClick={toggleSearch}
              className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 mr-1"
              aria-label="Toggle search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>

            {/* Cart button */}
            <button className="rounded-md p-2 text-gray-700 hover:bg-gray-100 relative mr-2 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden rounded-md p-2 text-gray-700 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>

            {/* Login/Signup links on small+ screens */}
            <div className="hidden sm:flex items-center space-x-2">
              <NavLink
                to="/login"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>

        {/* Mobile search input */}
        {isSearchVisible && (
          <div className="md:hidden pb-3">
            <div className="relative">
              <input
                type="search"
                placeholder="Search groceries..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* Mobile menu links */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-3">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
              <NavLink to="/" className={mobileLinkClasses}>
                Home
              </NavLink>
              <NavLink to="/women" className={mobileLinkClasses}>
                Women
              </NavLink>
              <NavLink to="/men" className={mobileLinkClasses}>
                Men
              </NavLink>
              <NavLink to="/kids" className={mobileLinkClasses}>
                Kids
              </NavLink>
              <NavLink to="/home-living" className={mobileLinkClasses}>
                Home & Living
              </NavLink>
              <NavLink to="/beauty" className={mobileLinkClasses}>
                Beauty
              </NavLink>

              <div className="grid grid-cols-2 gap-3 pt-4 mt-2">
                <NavLink
                  to="/login"
                  className="text-center border border-blue-600 text-blue-600 px-4 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors duration-300"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
