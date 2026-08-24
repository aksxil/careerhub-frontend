import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import {
  fetchMyApplications,
  asyncloaduser,
} from "../../store/userActions";

const MyApplications = () => {
  const dispatch = useDispatch();

  const {
    jobDetails,
    internshipDetails,
    user,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(asyncloaduser());
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const appliedJobs = Object.values(jobDetails || {});
  const appliedInternships = Object.values(internshipDetails || {});

  const studentId = user?._id;

  const totalApplications =
    appliedJobs.length + appliedInternships.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* HERO */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm mb-5">
              <i className="ri-file-list-3-line"></i>
              Application Tracker
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              My Applications
            </h1>

            <p className="mt-4 text-indigo-100 text-base sm:text-lg max-w-2xl">
              Track all the jobs and internships you've applied for
              and check your application status.
            </p>

            {/* STATS */}
            <div className="flex flex-wrap gap-3 mt-8">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3">
                <p className="text-2xl font-bold">
                  {totalApplications}
                </p>
                <p className="text-xs text-indigo-100">
                  Total Applications
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3">
                <p className="text-2xl font-bold">
                  {appliedJobs.length}
                </p>
                <p className="text-xs text-indigo-100">
                  Jobs
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-3">
                <p className="text-2xl font-bold">
                  {appliedInternships.length}
                </p>
                <p className="text-xs text-indigo-100">
                  Internships
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-12">

        {/* ================= INTERNSHIPS ================= */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
                  <i className="ri-graduation-cap-line text-xl"></i>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Applied Internships
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {appliedInternships.length}{" "}
                    {appliedInternships.length === 1
                      ? "application"
                      : "applications"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {appliedInternships.length === 0 ? (
            <EmptyState
              icon="ri-graduation-cap-line"
              title="No internship applications"
              description="You haven't applied to any internships yet."
              buttonText="Find Internships"
              buttonLink="/internships"
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {appliedInternships.map((internship) => {
                const shortlisted =
                  internship.shortlistedStudents?.includes(studentId);

                return (
                  <ApplicationCard
                    key={internship._id}
                    type="internship"
                    title={internship.profile}
                    company={
                      internship.employe?.organizationname ||
                      "Company"
                    }
                    logo={
                      internship.employe?.organizationLogo?.url
                    }
                    location={internship.location}
                    workType={internship.internshiptype}
                    applicants={internship.students?.length || 0}
                    shortlisted={shortlisted}
                    id={internship._id}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* DIVIDER */}
        <div className="my-12 border-t border-gray-200"></div>

        {/* ================= JOBS ================= */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <i className="ri-briefcase-4-line text-xl"></i>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Applied Jobs
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {appliedJobs.length}{" "}
                    {appliedJobs.length === 1
                      ? "application"
                      : "applications"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {appliedJobs.length === 0 ? (
            <EmptyState
              icon="ri-briefcase-4-line"
              title="No job applications"
              description="You haven't applied to any jobs yet."
              buttonText="Find Jobs"
              buttonLink="/jobs"
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {appliedJobs.map((job) => {
                const shortlisted =
                  job.shortlistedStudents?.includes(studentId);

                return (
                  <ApplicationCard
                    key={job._id}
                    type="job"
                    title={job.title}
                    company={
                      job.employe?.organizationname ||
                      "Company"
                    }
                    logo={
                      job.employe?.organizationLogo?.url
                    }
                    location={job.location}
                    workType={job.jobtype}
                    salary={job.salary}
                    applicants={job.students?.length || 0}
                    shortlisted={shortlisted}
                    id={job._id}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

/* =========================================================
   APPLICATION CARD
========================================================= */

const ApplicationCard = ({
  type,
  title,
  company,
  logo,
  location,
  workType,
  salary,
  applicants,
  shortlisted,
  id,
}) => {
  const isInternship = type === "internship";

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300">

      {/* TOP */}
      <div className="flex items-start justify-between gap-4">

        <div className="flex items-start gap-4 min-w-0">

          {/* COMPANY LOGO */}
          <div className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
            {logo ? (
              <img
                src={logo}
                alt={company}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-indigo-50 text-indigo-600">
                <i className="ri-building-4-line text-2xl"></i>
              </div>
            )}
          </div>

          {/* TITLE */}
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate group-hover:text-indigo-600 transition">
              {title || "Untitled Position"}
            </h3>

            <p className="text-sm text-gray-500 mt-1 truncate">
              {company}
            </p>
          </div>
        </div>

        {/* TYPE */}
        <span
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${
            isInternship
              ? "bg-violet-50 text-violet-600"
              : "bg-indigo-50 text-indigo-600"
          }`}
        >
          {isInternship ? "Internship" : "Job"}
        </span>
      </div>

      {/* META */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">

        {location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
              <i className="ri-map-pin-line"></i>
            </div>
            <span className="truncate">
              {location}
            </span>
          </div>
        )}

        {workType && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
              <i className="ri-briefcase-line"></i>
            </div>
            <span className="truncate">
              {workType}
            </span>
          </div>
        )}

        {salary && !isInternship && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
              <i className="ri-money-rupee-circle-line"></i>
            </div>
            <span>
              ₹{salary}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
            <i className="ri-group-line"></i>
          </div>
          <span>
            {applicants}{" "}
            {applicants === 1 ? "applicant" : "applicants"}
          </span>
        </div>
      </div>

      {/* STATUS */}
      <div className="mt-5 pt-5 border-t border-gray-100">

        {shortlisted ? (
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
            <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <i className="ri-check-double-line text-lg"></i>
            </div>

            <div>
              <p className="text-sm font-bold text-emerald-700">
                Congratulations! 🎉
              </p>
              <p className="text-xs text-emerald-600 mt-0.5">
                You have been shortlisted for this position.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-indigo-50 border border-indigo-100">
            <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <i className="ri-time-line text-lg"></i>
            </div>

            <div>
              <p className="text-sm font-bold text-indigo-700">
                Application Under Review
              </p>
              <p className="text-xs text-indigo-600 mt-0.5">
                The employer is reviewing your application.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-5">

        <span className="flex items-center gap-2 text-xs text-gray-400">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          Application submitted
        </span>

        <Link
          to={
            isInternship
              ? `/internships/${id}`
              : `/jobs/${id}`
          }
          className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700 group/link"
        >
          View Details
          <i className="ri-arrow-right-line transition-transform group-hover/link:translate-x-1"></i>
        </Link>
      </div>
    </div>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = ({
  icon,
  title,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="bg-white border border-dashed border-gray-300 rounded-2xl py-14 px-6 text-center">

      <div className="mx-auto h-16 w-16 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center">
        <i className={`${icon} text-3xl`}></i>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mt-5">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
        {description}
      </p>

      <Link
        to={buttonLink}
        className="inline-flex items-center gap-2 mt-6 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition shadow-sm"
      >
        {buttonText}
        <i className="ri-arrow-right-line"></i>
      </Link>
    </div>
  );
};

export default MyApplications;