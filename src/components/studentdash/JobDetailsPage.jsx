import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobDetails,
  applyForJob,
  saveJobInternship,
} from "../../store/userActions";
import Navbar from "../Navbar";
import { toast } from "react-toastify";

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    jobDetails,
    isAuthenticated,
    user,
  } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const job = jobDetails?.[jobId]?.job;

  /* =====================================================
     FETCH JOB
  ====================================================== */

  useEffect(() => {
    const loadJob = async () => {
      try {
        await dispatch(fetchJobDetails(jobId));
      } catch (error) {
        console.error("Failed to load job:", error);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [dispatch, jobId]);

  /* =====================================================
     APPLY JOB
  ====================================================== */

  const handleApply = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to apply for this job");
      navigate("/signin");
      return;
    }

    if (isApplying) return;

    try {
      setIsApplying(true);

      await dispatch(applyForJob(jobId));

      toast.success("Application submitted successfully! 🎉");
    } catch (err) {
      toast.error(
        err?.message || "Failed to apply for this job"
      );
    } finally {
      setIsApplying(false);
    }
  };

  /* =====================================================
     SAVE JOB
  ====================================================== */

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to save this job");
      navigate("/signin");
      return;
    }

    if (isSaving || isSaved) return;

    try {
      setIsSaving(true);

      await dispatch(
        saveJobInternship(
          user._id,
          jobId,
          "job"
        )
      );

      setIsSaved(true);

      toast.success("Job saved successfully ❤️");
    } catch (err) {
      toast.error("Failed to save job");
    } finally {
      setIsSaving(false);
    }
  };

  /* =====================================================
     LOADING STATE
  ====================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex min-h-[75vh] items-center justify-center px-6">
          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
              <i className="ri-loader-4-line animate-spin text-3xl text-indigo-600" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-800">
              Loading job details
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Please wait while we fetch the opportunity...
            </p>

          </div>
        </div>
      </div>
    );
  }

  /* =====================================================
     JOB NOT FOUND
  ====================================================== */

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="flex min-h-[75vh] items-center justify-center px-6">
          <div className="max-w-md text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50">
              <i className="ri-file-warning-line text-4xl text-red-500" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-800">
              Job not found
            </h2>

            <p className="mt-2 text-slate-500">
              This job may have been removed or is no longer available.
            </p>

            <button
              onClick={() => navigate("/student/dashboard")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              <i className="ri-arrow-left-line" />
              Back to Opportunities
            </button>

          </div>
        </div>
      </div>
    );
  }

  const companyName =
    job.employe?.organizationname || "Company";

  const companyLogo =
    job.employe?.organizationLogo?.url;

  const skills = Array.isArray(job.skills)
    ? job.skills
    : job.skills
    ? String(job.skills)
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white">

        {/* Decorative elements */}
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-100 transition hover:text-white"
          >
            <i className="ri-arrow-left-line" />
            Back to Jobs
          </button>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Job Heading */}
            <div className="flex items-start gap-5">

              {/* Company Logo */}
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white shadow-xl">

                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt={`${companyName} logo`}
                    className="h-full w-full object-contain p-3"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-3xl font-extrabold text-indigo-600">
                    {companyName
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}

              </div>

              <div>

                {/* Hiring Badge */}
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Actively Hiring
                </div>

                <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {job.title}
                </h1>

                <p className="mt-2 text-lg font-medium text-indigo-100">
                  {companyName}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur">
                    <i className="ri-map-pin-line" />
                    {job.location || "Location not specified"}
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium capitalize backdrop-blur">
                    <i className="ri-briefcase-4-line" />
                    {job.jobtype || "Full Time"}
                  </span>

                </div>
              </div>

            </div>

            {/* Salary */}
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md lg:min-w-[210px]">

              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
                Monthly Salary
              </p>

              <p className="mt-1 text-2xl font-extrabold">
                ₹{job.salary || "Not disclosed"}
              </p>

              {job.salary && (
                <p className="mt-1 text-sm text-indigo-200">
                  per month
                </p>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* ===================================================
              LEFT CONTENT
          ==================================================== */}

          <div className="space-y-8 lg:col-span-2">

            {/* Overview */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <SectionHeader
                icon="ri-information-line"
                title="Job Overview"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <InfoCard
                  icon="ri-map-pin-2-line"
                  label="Location"
                  value={
                    job.location ||
                    "Not specified"
                  }
                  bg="bg-indigo-50"
                  color="text-indigo-600"
                />

                <InfoCard
                  icon="ri-briefcase-4-line"
                  label="Job Type"
                  value={
                    job.jobtype ||
                    "Not specified"
                  }
                  bg="bg-purple-50"
                  color="text-purple-600"
                />

                <InfoCard
                  icon="ri-money-rupee-circle-line"
                  label="Salary"
                  value={
                    job.salary
                      ? `₹${job.salary} / month`
                      : "Not disclosed"
                  }
                  bg="bg-emerald-50"
                  color="text-emerald-600"
                />

                <InfoCard
                  icon="ri-user-line"
                  label="Openings"
                  value={
                    job.openings ||
                    "Not specified"
                  }
                  bg="bg-orange-50"
                  color="text-orange-600"
                />

              </div>
            </section>

            {/* Description */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <SectionHeader
                icon="ri-file-text-line"
                title="About the Job"
              />

              <p className="whitespace-pre-line text-[15px] leading-8 text-slate-600">
                {job.description ||
                  "No description provided."}
              </p>

            </section>

            {/* Skills */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <SectionHeader
                icon="ri-code-s-slash-line"
                title="Required Skills"
              />

              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">

                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600"
                    >
                      {skill}
                    </span>
                  ))}

                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No specific skills mentioned.
                </p>
              )}

            </section>

            {/* Preferences */}
            {job.preferences && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <SectionHeader
                  icon="ri-user-settings-line"
                  title="Candidate Preferences"
                />

                <p className="whitespace-pre-line text-[15px] leading-8 text-slate-600">
                  {job.preferences}
                </p>

              </section>
            )}

            {/* Responsibilities */}
            {job.responsibility && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <SectionHeader
                  icon="ri-task-line"
                  title="Responsibilities"
                />

                <p className="whitespace-pre-line text-[15px] leading-8 text-slate-600">
                  {job.responsibility}
                </p>

              </section>
            )}

            {/* Assessment */}
            {job.assesments && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <SectionHeader
                  icon="ri-survey-line"
                  title="Assessment Process"
                />

                <p className="whitespace-pre-line text-[15px] leading-8 text-slate-600">
                  {job.assesments}
                </p>

              </section>
            )}

          </div>

          {/* ===================================================
              RIGHT SIDEBAR
          ==================================================== */}

          <aside className="lg:col-span-1">

            <div className="sticky top-28 space-y-5">

              {/* Apply Card */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">

                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white">

                  <h3 className="text-xl font-bold">
                    Interested in this job?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-indigo-100">
                    Take the next step and submit your application.
                  </p>

                </div>

                <div className="p-5">

                  {/* Apply */}
                  <button
                    onClick={handleApply}
                    disabled={isApplying}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >

                    {isApplying ? (
                      <>
                        <i className="ri-loader-4-line animate-spin text-lg" />
                        Applying...
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-fill text-lg" />
                        Apply Now
                      </>
                    )}

                  </button>

                  {/* Save */}
                  <button
                    onClick={handleSave}
                    disabled={isSaving || isSaved}
                    className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-bold transition ${
                      isSaved
                        ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                        : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >

                    {isSaving ? (
                      <>
                        <i className="ri-loader-4-line animate-spin text-lg" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <i
                          className={
                            isSaved
                              ? "ri-bookmark-fill text-lg"
                              : "ri-bookmark-line text-lg"
                          }
                        />

                        {isSaved
                          ? "Job Saved"
                          : "Save Job"}
                      </>
                    )}

                  </button>

                  {!isAuthenticated && (
                    <p className="mt-4 text-center text-xs text-slate-400">
                      Login required to apply or save this job.
                    </p>
                  )}

                </div>
              </div>

              {/* Job Snapshot */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h3 className="text-lg font-bold text-slate-900">
                  Job Snapshot
                </h3>

                <div className="mt-5 space-y-4">

                  <SnapshotRow
                    icon="ri-briefcase-line"
                    label="Job Type"
                    value={job.jobtype}
                  />

                  <SnapshotRow
                    icon="ri-map-pin-line"
                    label="Location"
                    value={job.location}
                  />

                  <SnapshotRow
                    icon="ri-money-rupee-circle-line"
                    label="Salary"
                    value={
                      job.salary
                        ? `₹${job.salary}/month`
                        : "Not disclosed"
                    }
                  />

                  <SnapshotRow
                    icon="ri-user-line"
                    label="Openings"
                    value={job.openings}
                  />

                </div>
              </div>

              {/* Safety */}
              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">

                <div className="flex gap-3">

                  <i className="ri-shield-check-line mt-0.5 text-xl text-amber-600" />

                  <div>
                    <h4 className="text-sm font-bold text-amber-800">
                      Stay safe while applying
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-amber-700">
                      Never share your passwords, OTPs or sensitive banking information with recruiters.
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

/* =========================================================
   SECTION HEADER
========================================================= */

const SectionHeader = ({ icon, title }) => {
  return (
    <div className="mb-6 flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <i className={`${icon} text-xl`} />
      </div>

      <h2 className="text-xl font-bold text-slate-900">
        {title}
      </h2>

    </div>
  );
};

/* =========================================================
   INFO CARD
========================================================= */

const InfoCard = ({
  icon,
  label,
  value,
  bg,
  color,
}) => {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">

      <div
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${bg} ${color}`}
      >
        <i className={`${icon} text-xl`} />
      </div>

      <div className="min-w-0">

        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-bold text-slate-700">
          {value || "Not specified"}
        </p>

      </div>

    </div>
  );
};

/* =========================================================
   SNAPSHOT ROW
========================================================= */

const SnapshotRow = ({
  icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
        <i className={`${icon} text-lg`} />
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="truncate text-sm font-semibold text-slate-700">
          {value || "Not specified"}
        </p>

      </div>

    </div>
  );
};

export default JobDetailsPage;