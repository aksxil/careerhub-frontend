import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncsignout } from "../store/userActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuRef = useRef(null);

  // --------------------------------------------------
  // Close profile dropdown when clicking outside
  // --------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --------------------------------------------------
  // Close mobile menu when route changes
  // --------------------------------------------------
  useEffect(() => {
    setIsMobileOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  // --------------------------------------------------
  // Sign out
  // --------------------------------------------------
  const handleSignOut = () => {
    dispatch(asyncsignout());
    setIsMenuOpen(false);
    setIsMobileOpen(false);
  };

  // --------------------------------------------------
  // Check active route
  // --------------------------------------------------
  const isActive = (path) => {
    return location.pathname === path;
  };

  // --------------------------------------------------
  // User initials fallback
  // --------------------------------------------------
  const getInitials = () => {
    const first = user?.firstname?.charAt(0) || "";
    const last = user?.lastname?.charAt(0) || "";

    return `${first}${last}`.toUpperCase() || "U";
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* =====================================================
              LOGO
          ====================================================== */}
          <Link
            to={
              isAuthenticated
                ? "/employe/dashboard"
                : "/"
            }
            className="group flex items-center gap-2"
          >
            {/* Logo icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-lg font-extrabold text-white shadow-lg shadow-indigo-200 transition duration-300 group-hover:scale-105 group-hover:shadow-indigo-300">
              C
            </div>

            {/* Logo text */}
            <div className="leading-none">
              <div className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Career<span className="text-indigo-600">Hub</span>
              </div>

              <p className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">
                Build • Grow • Succeed
              </p>
            </div>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          {isAuthenticated && user ? (
            <div className="hidden items-center gap-1 md:flex">

              {/* Internships */}
              {/* <Link
                to="/student/internships"
                className={`group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  isActive("/student/internships")
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                    isActive("/student/internships")
                      ? "bg-indigo-100"
                      : "bg-slate-100 group-hover:bg-indigo-50"
                  }`}
                >
                  🎓
                </span>

                Internships
              </Link> */}

              {/* Jobs */}
              {/* <Link
                to="/student/jobs"
                className={`group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  isActive("/student/jobs")
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                    isActive("/student/jobs")
                      ? "bg-indigo-100"
                      : "bg-slate-100 group-hover:bg-indigo-50"
                  }`}
                >
                  💼
                </span>

                Jobs
              </Link> */}

              {/* Divider */}
              <div className="mx-3 h-7 w-px bg-slate-200" />

              {/* Profile Dropdown */}
              <div
                className="relative"
                ref={menuRef}
              >
                <button
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className={`flex items-center gap-2 rounded-xl p-1.5 pr-3 transition ${
                    isMenuOpen
                      ? "bg-slate-100"
                      : "hover:bg-slate-50"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative">
                    {user.organizationLogo?.url ? (
                      <img
                        src={user.organizationLogo.url}
                        alt="Profile"
                        className="h-10 w-10 rounded-xl border border-slate-200 object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
                        {getInitials()}
                      </div>
                    )}

                    {/* Online indicator */}
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  </div>

                  {/* User name */}
                  <div className="hidden text-left lg:block">
                    <p className="max-w-[110px] truncate text-sm font-bold text-slate-800">
                      {user.firstname} {user.lastname}
                    </p>

                    <p className="max-w-[110px] truncate text-[11px] text-slate-400">
                      {user.email}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg
                    className={`ml-1 h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* =================================================
                    PROFILE DROPDOWN
                ================================================== */}
                {isMenuOpen && (
                  <div className="absolute right-0 top-[56px] w-72 origin-top-right animate-dropdown overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">

                    {/* User Header */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-5 text-white">
                      <div className="flex items-center gap-3">
                        {user.organizationLogo?.url ? (
                          <img
                            src={user.organizationLogo.url}
                            alt="Profile"
                            className="h-12 w-12 rounded-xl border-2 border-white/30 object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-lg font-bold backdrop-blur-sm">
                            {getInitials()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <h3 className="truncate font-bold">
                            {user.firstname} {user.lastname}
                          </h3>

                          <p className="mt-0.5 truncate text-xs text-indigo-100">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Account Active
                      </div>
                    </div>

                    {/* Menu */}
                    <div className="p-2">

                      <Link
                        to="/employe/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
                          🏠
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Dashboard
                          </p>

                          <p className="text-xs text-slate-400">
                            View your dashboard
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/update-employe"
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
                          ✏️
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Edit Profile
                          </p>

                          <p className="text-xs text-slate-400">
                            Update your information
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/employe-changepassword"
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600 transition group-hover:bg-purple-100">
                          🔐
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Change Password
                          </p>

                          <p className="text-xs text-slate-400">
                            Keep your account secure
                          </p>
                        </div>
                      </Link>

                      {/* Divider */}
                      <div className="my-2 border-t border-slate-100" />

                      {/* Sign out */}
                      <button
                        onClick={handleSignOut}
                        className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-red-50"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition group-hover:bg-red-100">
                          ↪
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-red-600">
                            Sign Out
                          </p>

                          <p className="text-xs text-red-400">
                            Logout from your account
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* =====================================================
                DESKTOP AUTH BUTTONS
            ====================================================== */
            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/signin"
                className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-2.5 text-sm font-bold text-indigo-600 transition hover:-translate-y-0.5 hover:bg-indigo-100"
              >
                Candidate Sign-up
              </Link>

              <Link
                to="/employe/signup"
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-indigo-600"
              >
                Hire Talent →
              </Link>
            </div>
          )}

          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* =======================================================
            MOBILE MENU
        ======================================================== */}
        {isMobileOpen && (
          <div className="border-t border-slate-100 bg-white px-5 pb-5 pt-4 shadow-lg md:hidden">

            {isAuthenticated && user ? (
              <>
                {/* Mobile User */}
                <div className="mb-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
                  {user.organizationLogo?.url ? (
                    <img
                      src={user.organizationLogo.url}
                      alt="Profile"
                      className="h-11 w-11 rounded-xl border border-white/20 object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 font-bold">
                      {getInitials()}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-bold">
                      {user.firstname} {user.lastname}
                    </p>

                    <p className="truncate text-xs text-indigo-100">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Mobile Links */}
                <div className="space-y-1">
                  <Link
                    to="/employe/dashboard"
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                      isActive("/employe/dashboard")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>🏠</span>
                    Dashboard
                  </Link>

                  {/* <Link
                    to="/student/jobs"
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                      isActive("/student/jobs")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>💼</span>
                    Jobs
                  </Link> */}

                  {/* <Link
                    to="/student/internships"
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                      isActive("/student/internships")
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>🎓</span>
                    Internships
                  </Link> */}

                  <Link
                    to="/update-employe"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <span>✏️</span>
                    Edit Profile
                  </Link>

                  <Link
                    to="/employe-changepassword"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <span>🔐</span>
                    Change Password
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="mt-2 flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-left text-sm font-bold text-red-600 transition hover:bg-red-100"
                  >
                    <span>↪</span>
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              /* --------------------------------------------------
                 Mobile Auth
              -------------------------------------------------- */
              <div className="space-y-2">
                <Link
                  to="/signin"
                  className="flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="flex items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-600"
                >
                  Candidate Sign-up
                </Link>

                <Link
                  to="/employe/signup"
                  className="flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
                >
                  Hire Talent →
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* =========================================================
          ANIMATIONS
      ========================================================== */}
      <style>{`
        @keyframes dropdown {
          0% {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-dropdown {
          animation: dropdown 0.18s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;