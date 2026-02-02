import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/courses", label: "Courses" },
    { path: "/teachers", label: "Instructors" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4">

        {/* TOP BAR */}
        <div className="flex h-14 items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="text-lg font-semibold text-blue-600 dark:text-white no-underline"
          >
            AE
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium no-underline transition
                    ${
                      active
                        ? "bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">


            {/* SIGN IN */}
            <Link
              to="/login"
              className="hidden md:inline px-3 py-1.5 text-sm rounded-md no-underline
                text-gray-700 dark:text-white
                border border-transparent dark:border-white/30
                hover:bg-gray-100 dark:hover:bg-white/10
                transition"
            >
              Sign in
            </Link>

            {/* GET STARTED */}
            <Link
              to="/register"
              className="hidden md:inline px-4 py-1.5 text-sm rounded-md no-underline
                bg-blue-600 text-white hover:bg-blue-700
                dark:bg-white dark:text-black dark:hover:bg-gray-200
                transition"
            >
              Get started
            </Link>

            {/* MOBILE MENU */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden px-2 py-1 rounded-md
                text-gray-700 dark:text-white
                hover:bg-gray-100 dark:hover:bg-white/10
                transition"
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden border-t border-gray-200 dark:border-white/10 py-2 space-y-1 bg-white dark:bg-black">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 text-sm rounded-md no-underline transition
                    ${
                      active
                        ? "bg-gray-100 text-gray-900 dark:bg-white/10 dark:text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
