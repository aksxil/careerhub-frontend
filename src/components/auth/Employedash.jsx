import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloademploye } from "../../store/userActions";
import EmNavbar from "../EmNavbar";
import AddJobPost from "../Employedash/AddJobPost";
import AddInternshipPost from "../Employedash/AddInternshipPost";
import RandomPost from "../Employedash/RandomPost";
import RandomIntern from "../Employedash/RandomIntern";

const Employedash = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [showJobPost, setShowJobPost] = useState(false);
  const [showInternshipPost, setShowInternshipPost] = useState(false);

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  // =========================
  // AUTH CHECK
  // =========================

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg border p-8 text-center max-w-md w-full">
          <div className="w-14 h-14 mx-auto rounded-full bg-indigo-50 flex items-center justify-center mb-4">
            <i className="ri-lock-line text-2xl text-indigo-600"></i>
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            Login Required
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Please login to access your employer dashboard.
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // LOADING
  // =========================

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>

          <p className="text-gray-500 mt-4 text-sm">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // MODAL HANDLERS
  // =========================

  const openJobPost = () => {
    setShowJobPost(true);
    setShowInternshipPost(false);
  };

  const openInternshipPost = () => {
    setShowInternshipPost(true);
    setShowJobPost(false);
  };

  const closeModals = () => {
    setShowJobPost(false);
    setShowInternshipPost(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =========================
          NAVBAR
      ========================= */}

      <EmNavbar />

      {/* =========================
          HERO
      ========================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 text-white">

        {/* Background decorations */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-12">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-4">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Employer Dashboard
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">
                Hi, {user.firstname}! 👋
              </h1>

              <p className="text-indigo-100 mt-2 max-w-xl">
                Manage your job and internship listings and connect
                with talented candidates.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={openJobPost}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-indigo-600 rounded-xl font-semibold shadow-lg hover:bg-indigo-50 active:scale-[0.98] transition"
              >
                <i className="ri-briefcase-4-line text-lg"></i>
                Post a Job
              </button>

              <button
                onClick={openInternshipPost}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-white/10 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 active:scale-[0.98] transition"
              >
                <i className="ri-graduation-cap-line text-lg"></i>
                Post Internship
              </button>

            </div>
          </div>

          {/* QUICK INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">

            <div className="bg-white/10 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <i className="ri-briefcase-line text-xl"></i>
                </div>

                <div>
                  <p className="text-xs text-indigo-100">
                    Manage
                  </p>
                  <p className="font-semibold">
                    Job Listings
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <i className="ri-graduation-cap-line text-xl"></i>
                </div>

                <div>
                  <p className="text-xs text-indigo-100">
                    Manage
                  </p>
                  <p className="font-semibold">
                    Internships
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <i className="ri-user-search-line text-xl"></i>
                </div>

                <div>
                  <p className="text-xs text-indigo-100">
                    Find
                  </p>
                  <p className="font-semibold">
                    Candidates
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* JOB POSTS */}
        <section className="mb-14">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

            <div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <i className="ri-briefcase-4-line"></i>
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Your Job Listings
                </h2>
              </div>

              <p className="text-sm text-gray-500 mt-1 ml-11">
                Manage the jobs posted by your organization
              </p>
            </div>

            <button
              onClick={openJobPost}
              className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition"
            >
              <i className="ri-add-line"></i>
              Post Job
            </button>

          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <RandomPost />
          </div>

        </section>

        {/* INTERNSHIPS */}
        <section>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

            <div>
              <div className="flex items-center gap-2">

                <div className="w-9 h-9 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                  <i className="ri-graduation-cap-line"></i>
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Your Internship Listings
                </h2>

              </div>

              <p className="text-sm text-gray-500 mt-1 ml-11">
                Manage internships and discover potential talent
              </p>
            </div>

            <button
              onClick={openInternshipPost}
              className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition"
            >
              <i className="ri-add-line"></i>
              Post Internship
            </button>

          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <RandomIntern />
          </div>

        </section>

      </main>

      {/* =========================
          JOB MODAL
      ========================= */}

      {showJobPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">

            {/* CLOSE */}
            <button
              onClick={closeModals}
              className="absolute right-4 top-4 z-10 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-gray-50 transition"
            >
              <i className="ri-close-line text-xl"></i>
            </button>

            <AddJobPost onClose={closeModals} />

          </div>
        </div>
      )}

      {/* =========================
          INTERNSHIP MODAL
      ========================= */}

      {showInternshipPost && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">

            {/* CLOSE */}
            <button
              onClick={closeModals}
              className="absolute right-4 top-4 z-10 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-gray-50 transition"
            >
              <i className="ri-close-line text-xl"></i>
            </button>

            <AddInternshipPost onClose={closeModals} />

          </div>
        </div>
      )}

    </div>
  );
};

export default Employedash;