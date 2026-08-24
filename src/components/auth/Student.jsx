import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncloaduser,
  fetchRandomJobs,
  fetchRandomInternships,
} from "../../store/userActions";

import Navbar from "../Navbar";
import JobCard from "../JobCard";
import InternCard from "../InternCard";
import FilteredJobsAndInternships from "../studentdash/Filtered";

const Student = () => {
  const dispatch = useDispatch();

  const {
    isAuthenticated,
    user,
    randomJobs = [],
    randomInternships = [],
  } = useSelector((state) => state.user);

  // Load user
  useEffect(() => {
    dispatch(asyncloaduser());
  }, [dispatch]);

  // Fetch jobs and internships after authentication
  useEffect(() => {
    if (!isAuthenticated) return;

    if (!randomJobs.length) {
      dispatch(fetchRandomJobs());
    }

    if (!randomInternships.length) {
      dispatch(fetchRandomInternships());
    }
  }, [
    dispatch,
    isAuthenticated,
    randomJobs.length,
    randomInternships.length,
  ]);

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="flex min-h-[80vh] items-center justify-center px-6">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl shadow-lg">
              🔐
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Login Required
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Please log in to access personalized jobs, internships and
              career opportunities.
            </p>

            <button className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800">
              Login to Continue
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white">
        {/* Background decorations */}
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-32 left-10 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />

        <div className="absolute right-1/4 top-1/2 h-48 w-48 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            {/* Hero Content */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                <span>CareerHub is ready for you</span>
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Hi, {user?.firstname || "there"}! 👋
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
                Discover opportunities that match your skills, explore new
                internships and take the next step toward your dream career.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#jobs"
                  className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
                >
                  Explore Jobs →
                </a>

                <a
                  href="#internships"
                  className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Find Internships
                </a>
              </div>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur-md">
                <div className="text-3xl font-bold">
                  {randomJobs.length}
                </div>

                <p className="mt-1 text-xs text-indigo-100 sm:text-sm">
                  Jobs for you
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur-md">
                <div className="text-3xl font-bold">
                  {randomInternships.length}
                </div>

                <p className="mt-1 text-xs text-indigo-100 sm:text-sm">
                  Internships
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur-md">
                <div className="text-3xl font-bold">24/7</div>

                <p className="mt-1 text-xs text-indigo-100 sm:text-sm">
                  Opportunities
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur-md">
                <div className="text-3xl font-bold">🚀</div>

                <p className="mt-1 text-xs text-indigo-100 sm:text-sm">
                  Your journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SEARCH / FILTER
      ========================================================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="-mt-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Find your next opportunity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Search and filter jobs or internships based on your preferences.
            </p>
          </div>

          <FilteredJobsAndInternships />
        </div>
      </section>

      {/* =========================================================
          QUICK STATS
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl transition group-hover:scale-110">
                💼
              </div>

              <div>
                <p className="text-sm text-slate-500">Recommended Jobs</p>
                <p className="text-2xl font-bold text-slate-900">
                  {randomJobs.length}
                </p>
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-xl transition group-hover:scale-110">
                🎓
              </div>

              <div>
                <p className="text-sm text-slate-500">Internships</p>
                <p className="text-2xl font-bold text-slate-900">
                  {randomInternships.length}
                </p>
              </div>
            </div>
          </div>

          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl transition group-hover:scale-110">
                ✨
              </div>

              <div>
                <p className="text-sm text-slate-500">Career Status</p>
                <p className="text-lg font-bold text-green-600">
                  Actively Looking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          RECOMMENDED JOBS
      ========================================================= */}
      <section
        id="jobs"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 pt-16 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-indigo-600">
              <span>💼</span>
              Opportunities
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Recommended Jobs
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Explore opportunities that could be a great match for your
              career goals.
            </p>
          </div>

          {randomJobs.length > 0 && (
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
              {randomJobs.length} available
            </span>
          )}
        </div>

        {randomJobs.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="text-4xl">🔍</div>

            <h3 className="mt-4 font-bold text-slate-900">
              No jobs available right now
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Check back later for new opportunities.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {randomJobs.map((job) => (
              <div
                key={job._id}
                className="transition duration-300 hover:-translate-y-1"
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          INTERNSHIPS
      ========================================================= */}
      <section
        id="internships"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-20 pt-20 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-purple-600">
              <span>🎓</span>
              Start Your Career
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Trending Internships
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Gain real-world experience and build skills that can accelerate
              your career.
            </p>
          </div>

          {randomInternships.length > 0 && (
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
              {randomInternships.length} available
            </span>
          )}
        </div>

        {randomInternships.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="text-4xl">🎓</div>

            <h3 className="mt-4 font-bold text-slate-900">
              No internships available right now
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              New internships are added regularly. Check again soon.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {randomInternships.map((internship) => (
              <div
                key={internship._id}
                className="transition duration-300 hover:-translate-y-1"
              >
                <InternCard internship={internship} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          BOTTOM CTA
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div>
              <div className="mb-3 text-2xl">🚀</div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Your dream career starts here.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Keep exploring, keep learning and keep applying. The right
                opportunity might be just one application away.
              </p>
            </div>

            <a
              href="#jobs"
              className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Explore Opportunities →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Student;