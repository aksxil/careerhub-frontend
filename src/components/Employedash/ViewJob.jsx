import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmNavbar from "../EmNavbar";

import {
  asyncloademploye,
  fetchJobDetails,
  deleteJobPost,
  fetchStudentDetails,
  addShortlistedStudent,
} from "../../store/userActions";

import EditJobPost from "./EditJobPost";

const ViewJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobId } = useParams();

  const jobDetails = useSelector(
    (state) => state.user.jobDetails[jobId]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});
  const [shortlisted, setShortlisted] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  /* =====================================================
     LOAD JOB
  ====================================================== */
  useEffect(() => {
    dispatch(asyncloademploye());
    dispatch(fetchJobDetails(jobId));
  }, [dispatch, jobId]);

  /* =====================================================
     LOAD STUDENTS
  ====================================================== */
  useEffect(() => {
    if (!jobDetails?.job?.students) return;

    jobDetails.job.students.forEach((id) => {
      if (!studentDetails[id]) {
        dispatch(fetchStudentDetails(id)).then((res) => {
          if (res) {
            setStudentDetails((prev) => ({
              ...prev,
              [id]: res,
            }));
          }
        });
      }
    });
  }, [dispatch, jobDetails?.job?.students]);

  /* =====================================================
     SYNC SHORTLISTED
  ====================================================== */
  useEffect(() => {
    if (jobDetails?.job?.shortlistedStudents) {
      setShortlisted(jobDetails.job.shortlistedStudents);
    }
  }, [jobDetails]);

  /* =====================================================
     DELETE JOB
  ====================================================== */
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job post?"
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      await dispatch(deleteJobPost(jobId));

      toast.success("Job deleted successfully");

      navigate("/employe/dashboard");
    } catch (error) {
      toast.error("Failed to delete job");
      setIsDeleting(false);
    }
  };

  /* =====================================================
     SHORTLIST STUDENT
  ====================================================== */
  const handleShortlist = async (studentId) => {
    if (shortlisted.includes(studentId)) return;

    try {
      await dispatch(addShortlistedStudent(jobId, studentId));

      setShortlisted((prev) => [...prev, studentId]);

      toast.success("Student shortlisted successfully");
    } catch (error) {
      toast.error("Failed to shortlist student");
    }
  };

  /* =====================================================
     LOADING
  ====================================================== */
  if (!jobDetails) {
    return (
      <div className="min-h-screen bg-slate-50">
        <EmNavbar />

        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
              <i className="ri-loader-4-line animate-spin text-2xl text-indigo-600" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-800">
              Loading job details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Please wait while we fetch the job information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const job = jobDetails.job;

  const applicantsCount = job.students?.length || 0;
  const shortlistedCount = shortlisted.length || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <EmNavbar />

      {/* =====================================================
          HEADER
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white">

        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">

          {/* Back */}
          <Link
            to="/employe/dashboard"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-indigo-100 transition hover:text-white"
          >
            <i className="ri-arrow-left-line" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div className="max-w-3xl">

              {/* Status */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Active Job Post
              </div>

              {/* Title */}
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                {job.title}
              </h1>

              {/* Job Type */}
              <div className="mt-4 flex flex-wrap items-center gap-3">

                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                  <i className="ri-briefcase-4-line" />
                  {job.jobtype || "Full Time"}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                  <i className="ri-map-pin-line" />
                  {job.location || "Location not specified"}
                </span>

              </div>
            </div>

            {/* Header Actions */}
            <div className="flex flex-wrap gap-3">

              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
              >
                <i className="ri-edit-line text-lg" />
                Edit Job
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-red-500/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <i
                  className={
                    isDeleting
                      ? "ri-loader-4-line animate-spin text-lg"
                      : "ri-delete-bin-6-line text-lg"
                  }
                />

                {isDeleting ? "Deleting..." : "Delete"}
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* =====================================================
            QUICK STATS
        ====================================================== */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Salary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <i className="ri-money-rupee-circle-line text-2xl" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Monthly Salary
                </p>

                <p className="mt-1 text-xl font-bold text-slate-800">
                  ₹{job.salary || "N/A"}
                </p>
              </div>

            </div>
          </div>

          {/* Applicants */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <i className="ri-group-line text-2xl" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Applicants
                </p>

                <p className="mt-1 text-xl font-bold text-slate-800">
                  {applicantsCount}
                </p>
              </div>

            </div>
          </div>

          {/* Shortlisted */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <i className="ri-user-star-line text-2xl" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Shortlisted
                </p>

                <p className="mt-1 text-xl font-bold text-slate-800">
                  {shortlistedCount}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* =====================================================
            TWO COLUMN LAYOUT
        ====================================================== */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* ===================================================
              JOB INFORMATION
          ==================================================== */}
          <div className="lg:col-span-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-7">
                <h2 className="text-2xl font-bold text-slate-900">
                  Job Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Details about this job opportunity.
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <InfoCard
                  icon="ri-map-pin-2-line"
                  iconBg="bg-indigo-50"
                  iconColor="text-indigo-600"
                  label="Location"
                  value={job.location}
                />

                <InfoCard
                  icon="ri-money-rupee-circle-line"
                  iconBg="bg-emerald-50"
                  iconColor="text-emerald-600"
                  label="Salary"
                  value={`₹${job.salary || "Not disclosed"} / month`}
                />

                <InfoCard
                  icon="ri-briefcase-4-line"
                  iconBg="bg-purple-50"
                  iconColor="text-purple-600"
                  label="Job Type"
                  value={job.jobtype}
                />

                <InfoCard
                  icon="ri-user-search-line"
                  iconBg="bg-orange-50"
                  iconColor="text-orange-600"
                  label="Openings"
                  value={job.openings}
                />

              </div>

              {/* Skills */}
              <ContentSection
                icon="ri-code-s-slash-line"
                title="Required Skills"
              >
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(job.skills) ? (
                    job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm leading-7 text-slate-600">
                      {job.skills || "No skills specified"}
                    </p>
                  )}
                </div>
              </ContentSection>

              {/* Preferences */}
              <ContentSection
                icon="ri-user-settings-line"
                title="Candidate Preferences"
              >
                <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                  {job.preferences || "No preferences specified"}
                </p>
              </ContentSection>

              {/* Responsibility */}
              <ContentSection
                icon="ri-task-line"
                title="Responsibilities"
              >
                <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                  {job.responsibility || "No responsibilities specified"}
                </p>
              </ContentSection>

              {/* Description */}
              <ContentSection
                icon="ri-file-text-line"
                title="Job Description"
              >
                <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                  {job.description || "No description provided"}
                </p>
              </ContentSection>

              {/* Assessments */}
              <ContentSection
                icon="ri-survey-line"
                title="Assessment"
                last
              >
                <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                  {job.assesments || "No assessment details provided"}
                </p>
              </ContentSection>

            </div>
          </div>

          {/* ===================================================
              APPLICANTS
          ==================================================== */}
          <div className="lg:col-span-1">

            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* Applicants Header */}
              <div className="border-b border-slate-100 p-6">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Applicants
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {applicantsCount} candidate
                      {applicantsCount !== 1 ? "s" : ""} applied
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <i className="ri-group-line text-xl" />
                  </div>

                </div>
              </div>

              {/* Applicants List */}
              <div className="max-h-[600px] overflow-y-auto p-4">

                {applicantsCount === 0 ? (
                  <div className="px-4 py-12 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                      <i className="ri-user-search-line text-2xl text-slate-400" />
                    </div>

                    <h3 className="mt-4 font-semibold text-slate-700">
                      No applicants yet
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      Applicants will appear here once they apply.
                    </p>

                  </div>
                ) : (
                  <div className="space-y-3">

                    {job.students.map((id) => {

                      const student = studentDetails[id];
                      const isShortlisted =
                        shortlisted.includes(id);

                      return (
                        <div
                          key={id}
                          className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/40"
                        >

                          <div className="flex items-center gap-3">

                            {/* Avatar */}
                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">

                              {student?.avatar?.url ? (
                                <img
                                  src={student.avatar.url}
                                  alt="Student"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <>
                                  {student?.firstname
                                    ?.charAt(0)
                                    ?.toUpperCase() || "U"}
                                </>
                              )}

                            </div>

                            {/* Student */}
                            <div className="min-w-0 flex-1">

                              <Link
                                to={`/viewJobApplicant/${id}`}
                                className="block truncate text-sm font-bold text-slate-800 transition hover:text-indigo-600"
                              >
                                {student
                                  ? `${student.firstname || ""} ${
                                      student.lastname || ""
                                    }`
                                  : "Loading applicant..."}
                              </Link>

                              <p className="mt-0.5 text-xs text-slate-400">
                                Candidate
                              </p>

                            </div>

                          </div>

                          {/* Shortlist Button */}
                          <button
                            onClick={() =>
                              handleShortlist(id)
                            }
                            disabled={isShortlisted}
                            className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition ${
                              isShortlisted
                                ? "cursor-default bg-emerald-100 text-emerald-600"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                          >
                            <i
                              className={
                                isShortlisted
                                  ? "ri-check-line"
                                  : "ri-user-add-line"
                              }
                            />

                            {isShortlisted
                              ? "Shortlisted"
                              : "Shortlist Candidate"}
                          </button>

                        </div>
                      );
                    })}

                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =====================================================
          EDIT MODAL
      ====================================================== */}
      {isEditing && (
        <EditJobPost
          jobId={jobId}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

/* =========================================================
   INFO CARD
========================================================= */

const InfoCard = ({
  icon,
  iconBg,
  iconColor,
  label,
  value,
}) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">

      <div
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
      >
        <i className={`${icon} text-xl`} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-bold capitalize text-slate-700">
          {value || "Not specified"}
        </p>
      </div>

    </div>
  );
};

/* =========================================================
   CONTENT SECTION
========================================================= */

const ContentSection = ({
  icon,
  title,
  children,
  last = false,
}) => {
  return (
    <section
      className={`mt-8 ${
        !last ? "border-b border-slate-100 pb-8" : ""
      }`}
    >
      <div className="mb-3 flex items-center gap-2">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <i className={`${icon} text-base`} />
        </div>

        <h3 className="font-bold text-slate-800">
          {title}
        </h3>

      </div>

      {children}
    </section>
  );
};

export default ViewJob;