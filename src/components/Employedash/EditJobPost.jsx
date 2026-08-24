import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  fetchJobDetails,
  updateJobPost,
} from "../../store/userActions";

const EditJobPost = ({ onClose }) => {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  const job = useSelector(
    (state) => state.user.jobDetails[jobId]?.job
  );

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    skills: "",
    jobtype: "In office",
    openings: 1,
    description: "",
    preferences: "",
    salary: "",
    perks: "",
    responsibility: "",
    assesments: "",
    location: "",
  });

  // FETCH JOB
  useEffect(() => {
    if (jobId) {
      dispatch(fetchJobDetails(jobId));
    }
  }, [dispatch, jobId]);

  // SET JOB DATA
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        skills: job.skills || "",
        jobtype: job.jobtype || "In office",
        openings: job.openings || 1,
        description: job.description || "",
        preferences: job.preferences || "",
        salary: job.salary || "",
        perks: job.perks || "",
        responsibility: job.responsibility || "",
        assesments: job.assesments || "",
        location: job.location || "",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.salary
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (Number(formData.salary) <= 0) {
      toast.error("Please enter a valid salary");
      return;
    }

    if (Number(formData.openings) <= 0) {
      toast.error("Openings must be at least 1");
      return;
    }

    setLoading(true);

    try {
      await dispatch(updateJobPost(jobId, formData));

      toast.success("Job updated successfully");

      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast.error(
        error?.message || "Failed to update job"
      );
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (!job) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl px-8 py-6 text-center">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>

          <p className="text-gray-600 font-medium">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">

      {/* MODAL */}
      <div className="bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl relative">

        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-white border-b px-6 md:px-8 py-5 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Edit Job Post
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update your job listing details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 flex items-center justify-center text-lg transition disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-8 space-y-6"
        >

          {/* BASIC INFORMATION */}
          <div>
            <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-4">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* JOB TITLE */}
              <div>
                <label className="label">
                  Job Title <span className="text-red-500">*</span>
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  className="input"
                  required
                />
              </div>

              {/* SKILLS */}
              <div>
                <label className="label">
                  Required Skills
                </label>

                <input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                  className="input"
                />
              </div>

              {/* JOB TYPE */}
              <div>
                <label className="label">
                  Work Type
                </label>

                <select
                  name="jobtype"
                  value={formData.jobtype}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="In office">
                    In Office
                  </option>

                  <option value="Remote">
                    Remote
                  </option>
                </select>
              </div>

              {/* LOCATION */}
              <div>
                <label className="label">
                  Location
                </label>

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bhopal, Madhya Pradesh"
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* JOB DETAILS */}
          <div>
            <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-4">
              Job Details
            </h3>

            {/* DESCRIPTION */}
            <div className="mb-4">
              <label className="label">
                Job Description{" "}
                <span className="text-red-500">*</span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, company requirements and what the candidate will work on..."
                className="textarea"
                rows={4}
                required
              />
            </div>

            {/* RESPONSIBILITIES */}
            <div className="mb-4">
              <label className="label">
                Responsibilities
              </label>

              <textarea
                name="responsibility"
                value={formData.responsibility}
                onChange={handleChange}
                placeholder="Mention the main responsibilities of this role..."
                className="textarea"
                rows={4}
              />
            </div>

            {/* PREFERENCES */}
            <div>
              <label className="label">
                Candidate Preferences
              </label>

              <textarea
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
                placeholder="Mention experience, education or other preferences..."
                className="textarea"
                rows={3}
              />
            </div>
          </div>

          {/* JOB OFFER */}
          <div>
            <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-4">
              Job Offer
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* OPENINGS */}
              <div>
                <label className="label">
                  Number of Openings
                </label>

                <input
                  name="openings"
                  type="number"
                  min="1"
                  value={formData.openings}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* SALARY */}
              <div>
                <label className="label">
                  Monthly Salary{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>

                  <input
                    name="salary"
                    type="number"
                    min="1"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="30000"
                    className="input pl-9"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* EXTRA INFORMATION */}
          <div>
            <h3 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-4">
              Additional Information
            </h3>

            {/* PERKS */}
            <div className="mb-4">
              <label className="label">
                Perks & Benefits
              </label>

              <textarea
                name="perks"
                value={formData.perks}
                onChange={handleChange}
                placeholder="Work from home, flexible hours, bonuses, etc."
                className="textarea"
                rows={3}
              />
            </div>

            {/* ASSESSMENTS */}
            <div>
              <label className="label">
                Assessments
              </label>

              <textarea
                name="assesments"
                value={formData.assesments}
                onChange={handleChange}
                placeholder="Mention any test, assignment or interview assessment..."
                className="textarea"
                rows={3}
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto sm:min-w-[130px] px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                  Updating...
                </span>
              ) : (
                "Update Job"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* STYLES */}
      <style>
        {`
          .label {
            display: block;
            font-size: 0.875rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 0.4rem;
          }

          .input {
            width: 100%;
            padding: 11px 14px;
            border-radius: 10px;
            border: 1px solid #d1d5db;
            background: #fff;
            outline: none;
            font-size: 0.95rem;
            color: #1f2937;
            transition: all 0.2s ease;
          }

          .input::placeholder,
          .textarea::placeholder {
            color: #9ca3af;
          }

          .input:focus,
          .textarea:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          }

          .textarea {
            width: 100%;
            padding: 12px 14px;
            border-radius: 10px;
            border: 1px solid #d1d5db;
            background: #fff;
            outline: none;
            resize: vertical;
            min-height: 90px;
            font-size: 0.95rem;
            color: #1f2937;
            transition: all 0.2s ease;
          }

          @media (max-width: 640px) {
            .input {
              padding: 10px 12px;
            }

            .textarea {
              padding: 10px 12px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default EditJobPost;