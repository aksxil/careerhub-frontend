import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  asyncloademploye,
  fetchJobDetails,
} from "../../store/userActions";

const RandomPost = () => {
  const dispatch = useDispatch();

  const { user, jobDetails } = useSelector(
    (state) => state.user
  );

  // Load employer profile
  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  // Fetch job details
  useEffect(() => {
    if (!user?.jobs?.length) return;

    user.jobs.forEach((jobId) => {
      if (!jobDetails?.[jobId]) {
        dispatch(fetchJobDetails(jobId));
      }
    });
  }, [dispatch, user?.jobs, jobDetails]);

  /* EMPTY STATE */
  if (!user?.jobs || user.jobs.length === 0) {
    return (
      <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">

        <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl">
          <i className="ri-briefcase-line"></i>
        </div>

        <h3 className="mt-5 text-lg font-semibold text-gray-800">
          No jobs posted yet
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          Start hiring by creating your first job listing.
        </p>
      </div>
    );
  }

  return (
    <section>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <i className="ri-briefcase-line"></i>
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Your Job Listings
            </h2>
          </div>

          <p className="text-sm text-gray-500 mt-2 ml-11">
            Manage and edit your posted jobs
          </p>
        </div>

        {/* COUNT */}
        <div className="self-start sm:self-auto bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
          {user.jobs.length}{" "}
          {user.jobs.length === 1 ? "Job" : "Jobs"}
        </div>
      </div>

      {/* JOB LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {user.jobs.map((jobId) => {
          const job = jobDetails?.[jobId]?.job;

          // While individual job is loading
          if (!job) {
            return (
              <div
                key={jobId}
                className="bg-white border border-gray-200 rounded-2xl p-5 animate-pulse"
              >
                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-xl bg-gray-200"></div>

                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mt-3"></div>
                  </div>

                </div>

                <div className="h-9 bg-gray-200 rounded-lg mt-5"></div>
              </div>
            );
          }

          return (
            <div
              key={jobId}
              className="group bg-white border border-gray-200 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-lg transition-all duration-300"
            >

              {/* TOP */}
              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-4 min-w-0">

                  {/* ICON */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
                    <i className="ri-briefcase-4-line"></i>
                  </div>

                  {/* TITLE */}
                  <div className="min-w-0">

                    <h3 className="text-lg font-bold text-gray-900 truncate">
                      {job.title || "Untitled Job"}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      <i className="ri-code-line mr-1"></i>
                      {job.skills || "Skills not specified"}
                    </p>

                  </div>
                </div>

                {/* STATUS */}
                <span className="flex-shrink-0 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
                  Active
                </span>

              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-gray-50 rounded-xl px-3 py-3">
                  <p className="text-xs text-gray-400">
                    Job Type
                  </p>

                  <p className="text-sm font-semibold text-gray-700 mt-1">
                    <i className="ri-building-line text-indigo-500 mr-1"></i>
                    {job.jobtype || "Not specified"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl px-3 py-3">
                  <p className="text-xs text-gray-400">
                    Location
                  </p>

                  <p className="text-sm font-semibold text-gray-700 mt-1 truncate">
                    <i className="ri-map-pin-line text-indigo-500 mr-1"></i>
                    {job.location || "Not specified"}
                  </p>
                </div>

              </div>

              {/* BOTTOM */}
              <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t">

                <div className="text-sm text-gray-500">
                  <i className="ri-user-line mr-1"></i>
                  {job.openings || 0}{" "}
                  {job.openings === 1 ? "Opening" : "Openings"}
                </div>

                <Link
                  to={`/view-job/${jobId}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
                >
                  View / Edit
                  <i className="ri-arrow-right-line"></i>
                </Link>

              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
};

export default RandomPost;