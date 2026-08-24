import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloaduser } from "../../store/userActions";
import Navbar from "../Navbar";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(asyncloaduser());
  }, [dispatch]);

  const firstName = user?.user?.firstname || "there";
  const lastName = user?.user?.lastname || "";
  const email = user?.user?.email || "";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {user.isAuthenticated ? (
          <>
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 px-6 py-10 text-white shadow-xl sm:px-10">
              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl" />

              <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    <span>You're all set</span>
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Welcome back, {firstName}! 👋
                  </h1>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
                    Your next opportunity could be closer than you think.
                    Explore jobs, improve your profile and take the next step
                    in your career.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50">
                      Explore Jobs →
                    </button>

                    <button className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
                      Complete Profile
                    </button>
                  </div>
                </div>

                {/* Profile Avatar */}
                <div className="hidden lg:flex">
                  <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 shadow-2xl backdrop-blur-md">
                    <span className="text-5xl font-bold">
                      {firstName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* User Profile */}
            <section className="mt-8 grid gap-6 lg:grid-cols-3">
              {/* Profile Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white shadow-lg">
                    {firstName.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-bold">
                      {firstName} {lastName}
                    </h2>

                    <p className="truncate text-sm text-slate-500">
                      {email || "CareerHub Member"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      Profile completion
                    </span>

                    <span className="text-sm font-bold text-indigo-600">
                      70%
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" />
                  </div>

                  <button className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    View Profile
                  </button>
                </div>
              </div>

              {/* Applications */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Applications
                    </p>

                    <h3 className="mt-2 text-4xl font-bold text-slate-900">
                      12
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                    📄
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-slate-500">
                    <span className="font-semibold text-green-600">
                      +3
                    </span>{" "}
                    applications this week
                  </p>
                </div>
              </div>

              {/* Saved Jobs */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Saved Jobs
                    </p>

                    <h3 className="mt-2 text-4xl font-bold text-slate-900">
                      8
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-xl">
                    🔖
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-slate-500">
                    Keep exploring opportunities
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="mt-10">
              <div className="mb-5">
                <h2 className="text-2xl font-bold tracking-tight">
                  Quick Actions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Everything you need to move your career forward.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Jobs */}
                <button className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl transition group-hover:scale-110">
                    🔎
                  </div>

                  <h3 className="font-bold">Find Jobs</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Discover jobs that match your skills.
                  </p>

                  <span className="mt-4 inline-block text-sm font-semibold text-indigo-600">
                    Browse jobs →
                  </span>
                </button>

                {/* Resume */}
                <button className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-xl transition group-hover:scale-110">
                    📑
                  </div>

                  <h3 className="font-bold">Resume Builder</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Create a professional resume recruiters notice.
                  </p>

                  <span className="mt-4 inline-block text-sm font-semibold text-purple-600">
                    Build resume →
                  </span>
                </button>

                {/* Applications */}
                <button className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl transition group-hover:scale-110">
                    📊
                  </div>

                  <h3 className="font-bold">Applications</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Track all your job applications in one place.
                  </p>

                  <span className="mt-4 inline-block text-sm font-semibold text-green-600">
                    Track applications →
                  </span>
                </button>

                {/* Profile */}
                <button className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-xl transition group-hover:scale-110">
                    👤
                  </div>

                  <h3 className="font-bold">My Profile</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Keep your professional profile updated.
                  </p>

                  <span className="mt-4 inline-block text-sm font-semibold text-orange-600">
                    Edit profile →
                  </span>
                </button>
              </div>
            </section>

            {/* Career Tip */}
            <section className="mt-10 overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50 p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  💡
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Career Tip
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    Keep your profile updated
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    A complete profile helps recruiters understand your
                    experience and increases your chances of getting noticed.
                  </p>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Not Authenticated */
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl shadow-lg">
                🚀
              </div>

              <h1 className="mt-7 text-3xl font-bold tracking-tight">
                Welcome to CareerHub
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">
                Your all-in-one platform to discover opportunities, build your
                career profile and manage your job applications.
              </p>

              <button className="mt-7 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800">
                Login to Continue
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {user.isAuthenticated && !user.user && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

              <p className="mt-4 text-sm font-medium text-slate-600">
                Loading your CareerHub...
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;