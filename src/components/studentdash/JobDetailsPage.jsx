import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  applyForJob,
  fetchJobDetailsStu,
  asyncloaduser,
  saveJobInternship,
} from "../../store/userActions";
import Navbar from "../Navbar";

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();

  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const userState = useSelector((state) => state.user);
  const job = useSelector((state) => state.user.jobDetails[jobId]);

  useEffect(() => {
    dispatch(asyncloaduser());
  }, [dispatch]);

  useEffect(() => {
    if (jobId && !job) {
      dispatch(fetchJobDetailsStu(jobId));
    }
  }, [dispatch, jobId, job]);

  useEffect(() => {
    if (job?.data && userState.user) {
      setIsAlreadyApplied(
        job.data.students?.includes(userState.user._id)
      );

      setIsSaved(
        userState.user.savedJobs?.includes(jobId)
      );
    }
  }, [job, userState, jobId]);

  const handleApply = () => {
    dispatch(applyForJob(jobId)).then(() => {
      setIsAlreadyApplied(true);
      toast.success("Applied successfully");
    });
  };

  const handleSave = () => {
    dispatch(saveJobInternship(userState.user._id, jobId, "job"))
      .then(() => {
        setIsSaved(true);
        toast.success("Job saved");
      })
      .catch(() => toast.error("Unable to save job"));
  };

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="h-[80vh] flex items-center justify-center">
          <p className="text-gray-500">Loading job details...</p>
        </div>
      </>
    );
  }

  const {
    title,
    description,
    jobtype,
    salary,
    perks,
    openings,
    preferences,
    skills,
    responsibility,
    assesments,
  } = job.data;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT: JOB DETAILS */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
              {jobtype}
            </span>
            <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full">
              ₹{salary} / month
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {openings} openings
            </span>
          </div>

          <section className="mt-8">
            <h2 className="section-title">Job Description</h2>
            <p className="section-text">{description}</p>
          </section>

          <section className="mt-6">
            <h2 className="section-title">Responsibilities</h2>
            <p className="section-text">{responsibility}</p>
          </section>

          <section className="mt-6">
            <h2 className="section-title">Skills Required</h2>
            <p className="section-text text-indigo-600 font-medium">
              {skills}
            </p>
          </section>

          <section className="mt-6">
            <h2 className="section-title">Preferences</h2>
            <p className="section-text">{preferences}</p>
          </section>

          <section className="mt-6">
            <h2 className="section-title">Perks</h2>
            <p className="section-text">{perks}</p>
          </section>

          <section className="mt-6">
            <h2 className="section-title">Assessments</h2>
            <p className="section-text">{assesments}</p>
          </section>
        </div>

        {/* RIGHT: ACTION PANEL */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-24">
          {userState.isAuthenticated ? (
            <>
              {!isAlreadyApplied ? (
                <button
                  onClick={handleApply}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                >
                  Apply Now
                </button>
              ) : (
                <p className="text-green-600 font-semibold text-center">
                  ✔ Already Applied
                </p>
              )}

              {!isSaved ? (
                <button
                  onClick={handleSave}
                  className="w-full mt-4 border border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
                >
                  Save Job
                </button>
              ) : (
                <p className="mt-4 text-center text-indigo-600 font-semibold">
                  ★ Job Saved
                </p>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">
              Please log in to apply or save this job
            </p>
          )}
        </div>
      </div>

      {/* Tailwind helpers */}
      <style>
        {`
          .section-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #111827;
          }
          .section-text {
            color: #4b5563;
            line-height: 1.7;
          }
        `}
      </style>
    </div>
  );
};

export default JobDetailsPage;
