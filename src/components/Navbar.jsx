import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncsignout } from "../store/userActions";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // --------------------------------------------------
  // Logout
  // --------------------------------------------------
  const handleLogout = () => {
    dispatch(asyncsignout());
    toast.success("Logged out successfully");
    setMenuOpen(false);
  };

  // --------------------------------------------------
  // Close menu when clicking outside
  // --------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // --------------------------------------------------
  // Close menu after route change
  // --------------------------------------------------
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // --------------------------------------------------
  // Logo redirect
  // --------------------------------------------------
  const logoRedirect = !isAuthenticated
    ? "/"
    : user?.role === "employe"
    ? "/employe/dashboard"
    : "/student/dashboard";

  // --------------------------------------------------
  // User initials
  // --------------------------------------------------
  const getInitials = () => {
    const first = user?.firstname?.charAt(0) || "";
    const last = user?.lastname?.charAt(0) || "";

    return `${first}${last}`.toUpperCase() || "U";
  };

  // --------------------------------------------------
  // Active route
  // --------------------------------------------------
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* ==================================================
            LOGO
        =================================================== */}
        <Link
          to={logoRedirect}
          className="group flex items-center gap-2.5"
        >
          {/* Logo Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-lg font-extrabold text-white shadow-lg shadow-indigo-200 transition duration-300 group-hover:scale-105 group-hover:shadow-indigo-300">
            C
          </div>

          {/* Logo Text */}
          <div className="leading-none">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Career<span className="text-indigo-600">Hub</span>
            </h1>

            <p className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">
              Build • Grow • Succeed
            </p>
          </div>
        </Link>

        {/* ==================================================
            DESKTOP RIGHT SIDE
        =================================================== */}
        <div className="hidden items-center gap-3 md:flex">

          {/* ================================================
              NOT LOGGED IN
          ================================================= */}
          {!isAuthenticated && (
            <>
              <Link
                to="/signin"
                className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-2.5 text-sm font-bold text-indigo-600 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-100"
              >
                Candidate Sign-up
              </Link>

              <Link
                to="/employe/signup"
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-600"
              >
                Hire Talent
                <span className="ml-1">→</span>
              </Link>
            </>
          )}

          {/* ================================================
              LOGGED IN
          ================================================= */}
          {isAuthenticated && user && (
            <div
              className="relative"
              ref={menuRef}
            >
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`flex items-center gap-2.5 rounded-2xl p-1.5 pr-3 transition duration-200 ${
                  menuOpen
                    ? "bg-slate-100"
                    : "hover:bg-slate-50"
                }`}
              >
                {/* Avatar */}
                <div className="relative">

                  {user.avatar?.url ||
                  user.organizationLogo?.url ? (
                    <img
                      src={
                        user.avatar?.url ||
                        user.organizationLogo?.url
                      }
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

                {/* User Info */}
                <div className="hidden text-left lg:block">
                  <p className="max-w-[130px] truncate text-sm font-bold text-slate-800">
                    {user.firstname} {user.lastname}
                  </p>

                  <p className="max-w-[130px] truncate text-[11px] text-slate-400">
                    {user.role === "employe"
                      ? "Employer"
                      : "Candidate"}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  className={`ml-1 h-4 w-4 text-slate-400 transition-transform duration-200 ${
                    menuOpen ? "rotate-180" : ""
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

              {/* ==================================================
                  DROPDOWN
              =================================================== */}
              {menuOpen && (
                <div className="absolute right-0 top-[58px] w-[290px] origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 animate-dropdown">

                  {/* Profile Header */}
                  <div className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-600 p-5 text-white">
                    <div className="flex items-center gap-3">

                      {user.avatar?.url ||
                      user.organizationLogo?.url ? (
                        <img
                          src={
                            user.avatar?.url ||
                            user.organizationLogo?.url
                          }
                          alt="Profile"
                          className="h-12 w-12 rounded-xl border-2 border-white/20 object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-lg font-bold backdrop-blur-sm">
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

                    {/* Role */}
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                      {user.role === "employe"
                        ? "Employer Account"
                        : "Candidate Account"}
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">

                    {/* ==========================================
                        STUDENT MENU
                    =========================================== */}
                    {user.role !== "employe" && (
                      <>
                        <Link
                          to="/student/dashboard"
                          className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition ${
                            isActive("/student/dashboard")
                              ? "bg-indigo-50"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100">
                            🏠
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              Dashboard
                            </p>

                            <p className="text-xs text-slate-400">
                              View opportunities
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/resume"
                          className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            📄
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              Profile & Resume
                            </p>

                            <p className="text-xs text-slate-400">
                              Edit your profile
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/myapplications"
                          className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                            📋
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              My Applications
                            </p>

                            <p className="text-xs text-slate-400">
                              Track your applications
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/saved"
                          className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                            ⭐
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              Saved Jobs
                            </p>

                            <p className="text-xs text-slate-400">
                              Your saved opportunities
                            </p>
                          </div>
                        </Link>
                      </>
                    )}

                    {/* ==========================================
                        EMPLOYER MENU
                    =========================================== */}
                    {user.role === "employe" && (
                      <>
                        <Link
                          to="/employe/dashboard"
                          className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            🏠
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              Dashboard
                            </p>

                            <p className="text-xs text-slate-400">
                              Manage your hiring
                            </p>
                          </div>
                        </Link>

                        <Link
                          to="/update-employe"
                          className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            🏢
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              Company Profile
                            </p>

                            <p className="text-xs text-slate-400">
                              Edit company information
                            </p>
                          </div>
                        </Link>
                      </>
                    )}

                    {/* Divider */}
                    <div className="my-2 border-t border-slate-100" />

                    {/* Change password */}
                    <Link
                      to="/change-password"
                      className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        🔐
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Change Password
                        </p>

                        <p className="text-xs text-slate-400">
                          Secure your account
                        </p>
                      </div>
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="group mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-red-50"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
                        ↪
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-red-600">
                          Sign Out
                        </p>

                        <p className="text-xs text-red-400">
                          Logout from CareerHub
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ==================================================
            MOBILE MENU BUTTON
        =================================================== */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
        >
          {menuOpen ? (
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

      {/* ========================================================
          MOBILE MENU
      ========================================================= */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 pb-5 pt-4 shadow-xl md:hidden animate-mobileMenu">

          {/* ==============================================
              NOT AUTHENTICATED
          =============================================== */}
          {!isAuthenticated && (
            <div className="space-y-2">
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-600"
              >
                Candidate Sign-up
              </Link>

              <Link
                to="/employe/signup"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white"
              >
                Hire Talent →
              </Link>
            </div>
          )}

          {/* ==============================================
              AUTHENTICATED
          =============================================== */}
          {isAuthenticated && user && (
            <>
              {/* Mobile profile */}
              <div className="mb-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-4 text-white">
                <div className="flex items-center gap-3">
                  {user.avatar?.url ||
                  user.organizationLogo?.url ? (
                    <img
                      src={
                        user.avatar?.url ||
                        user.organizationLogo?.url
                      }
                      alt="Profile"
                      className="h-11 w-11 rounded-xl border border-white/20 object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 font-bold">
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

                <div className="mt-3 text-xs text-indigo-100">
                  {user.role === "employe"
                    ? "Employer Account"
                    : "Candidate Account"}
                </div>
              </div>

              {/* Mobile navigation */}
              <div className="space-y-1">

                {user.role !== "employe" && (
                  <>
                    <Link
                      to="/student/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      🏠
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      to="/resume"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      📄
                      <span>Profile & Resume</span>
                    </Link>

                    <Link
                      to="/myapplications"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      📋
                      <span>My Applications</span>
                    </Link>

                    <Link
                      to="/saved"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      ⭐
                      <span>Saved Jobs</span>
                    </Link>
                  </>
                )}

                {user.role === "employe" && (
                  <>
                    <Link
                      to="/employe/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      🏠
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      to="/update-employe"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      🏢
                      <span>Company Profile</span>
                    </Link>
                  </>
                )}

                <Link
                  to="/change-password"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  🔐
                  <span>Change Password</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-left text-sm font-bold text-red-600 transition hover:bg-red-100"
                >
                  ↪
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ========================================================
          ANIMATIONS
      ========================================================= */}
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

        @keyframes mobileMenu {
          0% {
            opacity: 0;
            transform: translateY(-8px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-dropdown {
          animation: dropdown 0.18s ease-out;
        }

        .animate-mobileMenu {
          animation: mobileMenu 0.2s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Navbar;