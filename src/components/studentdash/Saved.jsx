import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchSavedJobsAndInternships,
  removeSavedItemAsync,
} from "../../store/userActions";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const SavedItemsPage = () => {
  const dispatch = useDispatch();

  const {
    savedJobs = [],
    savedInternships = [],
    loading,
    error,
    user,
  } = useSelector((state) => state.user);

  const userId = user?._id;

  // --------------------------------
  // FETCH SAVED ITEMS
  // --------------------------------
  useEffect(() => {
    if (userId) {
      dispatch(fetchSavedJobsAndInternships(userId));
    }
  }, [dispatch, userId]);

  // --------------------------------
  // REMOVE SAVED ITEM
  // --------------------------------
  const handleRemove = async (type, id) => {
    if (!userId || !id) return;

    try {
      await dispatch(removeSavedItemAsync(userId, type, id));

      toast.success(
        type === "job"
          ? "Job removed from saved"
          : "Internship removed from saved"
      );

      // Refresh saved items
      dispatch(fetchSavedJobsAndInternships(userId));
    } catch (error) {
      toast.error("Failed to remove saved item");
    }
  };

  // --------------------------------
  // LOADING
  // --------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>

            <p className="mt-4 text-gray-500">
              Loading saved items...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------
  // ERROR
  // --------------------------------
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="min-h-[70vh] flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl shadow-sm border p-8 text-center max-w-md">
            <div className="text-4xl mb-4">⚠️</div>

            <h2 className="text-xl font-semibold text-gray-800">
              Something went wrong
            </h2>

            <p className="text-red-500 mt-2">
              {error}
            </p>

            <button
              onClick={() =>
                userId &&
                dispatch(fetchSavedJobsAndInternships(userId))
              }
              className="mt-6 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------
  // SAFE ARRAYS
  // --------------------------------
  const jobs = Array.isArray(savedJobs)
    ? savedJobs
    : Object.values(savedJobs || {});

  const internships = Array.isArray(savedInternships)
    ? savedInternships
    : Object.values(savedInternships || {});

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* PAGE HEADER */}
        <div className="mb-10">
          <p className="text-sm font-medium text-indigo-600 mb-2">
            MY ACCOUNT
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Saved Jobs & Internships
          </h1>

          <p className="text-gray-500 mt-2">
            Jobs and internships you've saved for later.
          </p>
        </div>

        {/* =====================================
            SAVED JOBS
        ===================================== */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Saved Jobs
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {jobs.length} saved {jobs.length === 1 ? "job" : "jobs"}
              </p>
            </div>
          </div>

          {jobs.length === 0 ? (
            <div className="bg-white border rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">
                💼
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                No saved jobs
              </h3>

              <p className="text-gray-500 mt-2">
                Jobs you save will appear here.
              </p>

              <Link
                to="/jobs"
                className="inline-block mt-5 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
              >
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <div
                  key={job?._id || `saved-job-${index}`}
                  className="bg-white rounded-2xl border shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
                >
                  {/* CARD HEADER */}
                  <div className="p-5 border-b">
                    <div className="flex justify-between items-start gap-4">

                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 truncate">
                          {job?.title || "Job Position"}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 truncate">
                          {job?.employe?.organizationname ||
                            "Organization"}
                        </p>
                      </div>

                      {job?.employe?.organizationLogo?.url ? (
                        <img
                          src={job.employe.organizationLogo.url}
                          alt={
                            job?.employe?.organizationname ||
                            "Company"
                          }
                          className="h-12 w-12 rounded-xl object-contain border bg-white p-1 flex-shrink-0"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">
                          {job?.employe?.organizationname
                            ?.charAt(0)
                            ?.toUpperCase() || "C"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="p-5">

                    <div className="space-y-3 text-sm text-gray-600">

                      <div className="flex items-center gap-3">
                        <i className="ri-briefcase-line text-indigo-500 text-lg"></i>

                        <span>
                          {job?.jobtype || "Not specified"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <i className="ri-map-pin-line text-indigo-500 text-lg"></i>

                        <span>
                          {job?.location || "Location not specified"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <i className="ri-money-rupee-circle-line text-indigo-500 text-lg"></i>

                        <span>
                          {job?.salary
                            ? `₹${job.salary}/month`
                            : "Salary not specified"}
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-6 pt-5 border-t flex items-center justify-between">

                      <Link
                        to={`/jobs/${job?._id}`}
                        className="inline-flex items-center gap-1 text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition"
                      >
                        View Details
                        <span>→</span>
                      </Link>

                      <button
                        onClick={() =>
                          handleRemove("job", job?._id)
                        }
                        disabled={!job?._id}
                        className="text-red-500 text-sm font-medium hover:text-red-700 hover:underline disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =====================================
            SAVED INTERNSHIPS
        ===================================== */}
        <section className="mt-16">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Saved Internships
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {internships.length} saved{" "}
                {internships.length === 1
                  ? "internship"
                  : "internships"}
              </p>
            </div>
          </div>

          {internships.length === 0 ? (
            <div className="bg-white border rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">
                🎓
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                No saved internships
              </h3>

              <p className="text-gray-500 mt-2">
                Internships you save will appear here.
              </p>

              <Link
                to="/internships"
                className="inline-block mt-5 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition"
              >
                Browse Internships
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {internships.map((internship, index) => (
                <div
                  key={
                    internship?._id ||
                    `saved-internship-${index}`
                  }
                  className="bg-white rounded-2xl border shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
                >

                  {/* HEADER */}
                  <div className="p-5 border-b">

                    <div className="flex justify-between items-start gap-4">

                      <div className="min-w-0">

                        <h3 className="text-lg font-bold text-gray-900 truncate">
                          {internship?.profile ||
                            "Internship Position"}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 truncate">
                          {internship?.employe
                            ?.organizationname ||
                            "Organization"}
                        </p>

                      </div>

                      {internship?.employe
                        ?.organizationLogo?.url ? (
                        <img
                          src={
                            internship.employe
                              .organizationLogo.url
                          }
                          alt={
                            internship?.employe
                              ?.organizationname ||
                            "Company"
                          }
                          className="h-12 w-12 rounded-xl object-contain border bg-white p-1 flex-shrink-0"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">
                          {internship?.employe
                            ?.organizationname
                            ?.charAt(0)
                            ?.toUpperCase() || "C"}
                        </div>
                      )}

                    </div>
                  </div>

                  {/* BODY */}
                  <div className="p-5">

                    <div className="space-y-3 text-sm text-gray-600">

                      <div className="flex items-center gap-3">
                        <i className="ri-briefcase-line text-indigo-500 text-lg"></i>

                        <span>
                          {internship?.internshiptype ||
                            "Internship"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <i className="ri-map-pin-line text-indigo-500 text-lg"></i>

                        <span>
                          {internship?.location ||
                            "Location not specified"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <i className="ri-money-rupee-circle-line text-indigo-500 text-lg"></i>

                        <span>
                          {internship?.stipend?.amount
                            ? `₹${internship.stipend.amount}/month`
                            : "Stipend not specified"}
                        </span>
                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="mt-6 pt-5 border-t flex items-center justify-between">

                      <Link
                        to={`/internships/${internship?._id}`}
                        className="inline-flex items-center gap-1 text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition"
                      >
                        View Details
                        <span>→</span>
                      </Link>

                      <button
                        onClick={() =>
                          handleRemove(
                            "internship",
                            internship?._id
                          )
                        }
                        disabled={!internship?._id}
                        className="text-red-500 text-sm font-medium hover:text-red-700 hover:underline disabled:opacity-50"
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default SavedItemsPage;