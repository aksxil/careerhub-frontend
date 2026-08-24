import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addJobPost, asyncloademploye } from "../../store/userActions";

const AddJobPost = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: "",
    skills: "",
    jobtype: "In office",
    openings: 1,
    location: "",
    salary: "",
    description: "",
    responsibility: "",
    preferences: "",
    perks: "",
    assesments: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.salary) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      await dispatch(addJobPost(formData));

      toast.success("Job posted successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

      {/* MODAL */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">

        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 sm:px-8 py-5 rounded-t-3xl">

          <div className="flex items-center justify-between">

            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <i className="ri-briefcase-4-line text-xl text-indigo-600"></i>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Post a New Job
                  </h2>

                  <p className="text-sm text-gray-500 mt-0.5">
                    Find the right candidate for your team
                  </p>
                </div>
              </div>
            </div>

            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>

          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">

          {/* BASIC INFORMATION */}
          <div className="mb-8">

            <div className="flex items-center gap-2 mb-5">
              <i className="ri-information-line text-indigo-600 text-lg"></i>

              <h3 className="text-lg font-semibold text-gray-900">
                Basic Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* JOB TITLE */}
              <div>
                <label className="form-label">
                  Job Title <span className="text-red-500">*</span>
                </label>

                <div className="input-wrapper">
                  <i className="ri-briefcase-line input-icon"></i>

                  <input
                    name="title"
                    type="text"
                    placeholder="e.g. Frontend Developer"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              {/* SKILLS */}
              <div>
                <label className="form-label">
                  Required Skills
                </label>

                <div className="input-wrapper">
                  <i className="ri-code-s-slash-line input-icon"></i>

                  <input
                    name="skills"
                    type="text"
                    placeholder="React, JavaScript, Node.js..."
                    value={formData.skills}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              {/* JOB TYPE */}
              <div>
                <label className="form-label">
                  Work Type
                </label>

                <div className="input-wrapper">
                  <i className="ri-building-line input-icon"></i>

                  <select
                    name="jobtype"
                    value={formData.jobtype}
                    onChange={handleChange}
                    className="form-input appearance-none cursor-pointer"
                  >
                    <option value="In office">In Office</option>
                    <option value="Remote">Remote</option>
                  </select>

                  <i className="ri-arrow-down-s-line absolute right-4 text-gray-400 pointer-events-none"></i>
                </div>
              </div>

              {/* LOCATION */}
              <div>
                <label className="form-label">
                  Location
                </label>

                <div className="input-wrapper">
                  <i className="ri-map-pin-line input-icon"></i>

                  <input
                    name="location"
                    type="text"
                    placeholder="e.g. Indore, Madhya Pradesh"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* JOB DETAILS */}
          <div className="mb-8">

            <div className="flex items-center gap-2 mb-5">
              <i className="ri-file-text-line text-indigo-600 text-lg"></i>

              <h3 className="text-lg font-semibold text-gray-900">
                Job Details
              </h3>
            </div>

            <div className="space-y-5">

              {/* DESCRIPTION */}
              <div>
                <label className="form-label">
                  Job Description <span className="text-red-500">*</span>
                </label>

                <div className="textarea-wrapper">
                  <i className="ri-file-text-line textarea-icon"></i>

                  <textarea
                    name="description"
                    placeholder="Describe the role, company, and what the candidate will be working on..."
                    value={formData.description}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="4"
                  />
                </div>
              </div>

              {/* RESPONSIBILITIES */}
              <div>
                <label className="form-label">
                  Responsibilities
                </label>

                <div className="textarea-wrapper">
                  <i className="ri-task-line textarea-icon"></i>

                  <textarea
                    name="responsibility"
                    placeholder="Mention the key responsibilities and day-to-day tasks..."
                    value={formData.responsibility}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="4"
                  />
                </div>
              </div>

              {/* PREFERENCES */}
              <div>
                <label className="form-label">
                  Candidate Preferences
                </label>

                <div className="textarea-wrapper">
                  <i className="ri-user-search-line textarea-icon"></i>

                  <textarea
                    name="preferences"
                    placeholder="Mention experience, education, qualifications or other preferences..."
                    value={formData.preferences}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="3"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* JOB OFFER */}
          <div className="mb-8">

            <div className="flex items-center gap-2 mb-5">
              <i className="ri-money-rupee-circle-line text-indigo-600 text-lg"></i>

              <h3 className="text-lg font-semibold text-gray-900">
                Job Offer
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* OPENINGS */}
              <div>
                <label className="form-label">
                  Number of Openings
                </label>

                <div className="input-wrapper">
                  <i className="ri-group-line input-icon"></i>

                  <input
                    name="openings"
                    type="number"
                    min="1"
                    placeholder="e.g. 2"
                    value={formData.openings}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              {/* SALARY */}
              <div>
                <label className="form-label">
                  Salary / Month <span className="text-red-500">*</span>
                </label>

                <div className="input-wrapper">
                  <i className="ri-money-rupee-circle-line input-icon"></i>

                  <input
                    name="salary"
                    type="number"
                    min="0"
                    placeholder="e.g. 35000"
                    value={formData.salary}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* EXTRA INFORMATION */}
          <div className="mb-8">

            <div className="flex items-center gap-2 mb-5">
              <i className="ri-add-circle-line text-indigo-600 text-lg"></i>

              <h3 className="text-lg font-semibold text-gray-900">
                Additional Information
              </h3>
            </div>

            <div className="space-y-5">

              {/* PERKS */}
              <div>
                <label className="form-label">
                  Perks & Benefits
                </label>

                <div className="textarea-wrapper">
                  <i className="ri-gift-line textarea-icon"></i>

                  <textarea
                    name="perks"
                    placeholder="e.g. Work from home, flexible hours, health insurance..."
                    value={formData.perks}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="3"
                  />
                </div>
              </div>

              {/* ASSESSMENTS */}
              <div>
                <label className="form-label">
                  Assessments
                </label>

                <div className="textarea-wrapper">
                  <i className="ri-checkbox-circle-line textarea-icon"></i>

                  <textarea
                    name="assesments"
                    placeholder="Mention any assessment, test or interview process..."
                    value={formData.assesments}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="3"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* FOOTER BUTTONS */}
          <div className="border-t border-gray-100 pt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  Posting...
                </>
              ) : (
                <>
                  <i className="ri-send-plane-line"></i>
                  Post Job
                </>
              )}
            </button>

          </div>

        </form>
      </div>

      {/* CUSTOM STYLES */}
      <style>{`

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 15px;
          font-size: 18px;
          color: #9ca3af;
          pointer-events: none;
          z-index: 1;
        }

        .form-input {
          width: 100%;
          height: 48px;
          padding: 0 15px 0 44px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #f9fafb;
          color: #111827;
          outline: none;
          transition: all 0.2s ease;
        }

        .form-input::placeholder {
          color: #9ca3af;
        }

        .form-input:focus {
          border-color: #6366f1;
          background: white;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .textarea-wrapper {
          position: relative;
        }

        .textarea-icon {
          position: absolute;
          top: 15px;
          left: 15px;
          font-size: 18px;
          color: #9ca3af;
          pointer-events: none;
          z-index: 1;
        }

        .form-textarea {
          width: 100%;
          padding: 13px 15px 13px 44px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #f9fafb;
          color: #111827;
          outline: none;
          resize: vertical;
          min-height: 90px;
          transition: all 0.2s ease;
        }

        .form-textarea::placeholder {
          color: #9ca3af;
        }

        .form-textarea:focus {
          border-color: #6366f1;
          background: white;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        /* Scrollbar */
        .max-h-\\\\[92vh\\\\]::-webkit-scrollbar {
          width: 6px;
        }

        .max-h-\\\\[92vh\\\\]::-webkit-scrollbar-track {
          background: transparent;
        }

        .max-h-\\\\[92vh\\\\]::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }

        .max-h-\\\\[92vh\\\\]::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        @media (max-width: 640px) {
          .form-input {
            height: 46px;
          }
        }

      `}</style>
    </div>
  );
};

export default AddJobPost;