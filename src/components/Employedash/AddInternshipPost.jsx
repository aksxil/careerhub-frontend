import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  addInternshipPost,
  asyncloademploye,
} from "../../store/userActions";

const AddInternshipPost = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    profile: "",
    skill: "",
    internshiptype: "In office",
    openings: 1,
    from: "",
    to: "",
    duration: "",
    responsibility: "",
    preferences: "",
    stipendStatus: "Fixed",
    stipendAmount: "",
    perks: "",
    assesments: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.profile ||
      !formData.duration ||
      !formData.responsibility
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (
      formData.stipendStatus !== "Unpaid" &&
      (!formData.stipendAmount ||
        Number(formData.stipendAmount) <= 0)
    ) {
      toast.error("Please enter a valid stipend amount");
      return;
    }

    setLoading(true);

    const { stipendStatus, stipendAmount, ...rest } = formData;

    const postData = {
      ...rest,
      stipend: {
        status: stipendStatus,
        amount:
          stipendStatus === "Unpaid"
            ? 0
            : Number(stipendAmount),
      },
    };

    try {
      await dispatch(addInternshipPost(postData));

      toast.success("Internship posted successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to post internship");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl">

        {/* HEADER */}
        <div className="sticky top-0 z-10 bg-white border-b px-6 py-5 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Post New Internship
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Find the right candidate for your internship
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center text-xl transition"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          {/* BASIC INFORMATION */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <i className="ri-information-line"></i>
              </div>

              <h3 className="font-semibold text-gray-800">
                Basic Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* PROFILE */}
              <div className="relative">
                <i className="ri-briefcase-line input-icon"></i>

                <input
                  name="profile"
                  placeholder="Internship Profile *"
                  value={formData.profile}
                  onChange={handleChange}
                  className="input icon-input"
                />
              </div>

              {/* SKILLS */}
              <div className="relative">
                <i className="ri-code-s-slash-line input-icon"></i>

                <input
                  name="skill"
                  placeholder="Required Skills"
                  value={formData.skill}
                  onChange={handleChange}
                  className="input icon-input"
                />
              </div>

              {/* TYPE */}
              <div className="relative">
                <i className="ri-building-line input-icon"></i>

                <select
                  name="internshiptype"
                  value={formData.internshiptype}
                  onChange={handleChange}
                  className="input icon-input appearance-none"
                >
                  <option>In office</option>
                  <option>Remote</option>
                </select>

                <i className="ri-arrow-down-s-line select-icon"></i>
              </div>

              {/* LOCATION */}
              <div className="relative">
                <i className="ri-map-pin-line input-icon"></i>

                <input
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input icon-input"
                />
              </div>
            </div>
          </div>

          {/* RESPONSIBILITIES */}
          <div>
            <label className="label">
              Responsibilities *
            </label>

            <div className="relative">
              <i className="ri-file-text-line textarea-icon"></i>

              <textarea
                name="responsibility"
                placeholder="Describe the responsibilities and day-to-day work..."
                value={formData.responsibility}
                onChange={handleChange}
                className="textarea textarea-with-icon"
                rows="3"
              />
            </div>
          </div>

          {/* PREFERENCES */}
          <div>
            <label className="label">
              Candidate Preferences
            </label>

            <div className="relative">
              <i className="ri-user-search-line textarea-icon"></i>

              <textarea
                name="preferences"
                placeholder="Mention eligibility, qualifications or preferred candidates..."
                value={formData.preferences}
                onChange={handleChange}
                className="textarea textarea-with-icon"
                rows="3"
              />
            </div>
          </div>

          {/* INTERNSHIP DETAILS */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <i className="ri-settings-3-line"></i>
              </div>

              <h3 className="font-semibold text-gray-800">
                Internship Details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* OPENINGS */}
              <div className="relative">
                <i className="ri-group-line input-icon"></i>

                <input
                  name="openings"
                  type="number"
                  min="1"
                  placeholder="Number of Openings"
                  value={formData.openings}
                  onChange={handleChange}
                  className="input icon-input"
                />
              </div>

              {/* DURATION */}
              <div className="relative">
                <i className="ri-time-line input-icon"></i>

                <input
                  name="duration"
                  placeholder="Duration (e.g. 3 months) *"
                  value={formData.duration}
                  onChange={handleChange}
                  className="input icon-input"
                />
              </div>
            </div>
          </div>

          {/* STIPEND */}
          <div>
            <label className="label">
              Stipend
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* STATUS */}
              <div className="relative">
                <i className="ri-money-rupee-circle-line input-icon"></i>

                <select
                  name="stipendStatus"
                  value={formData.stipendStatus}
                  onChange={handleChange}
                  className="input icon-input appearance-none"
                >
                  <option>Fixed</option>
                  <option>Negotiable</option>
                  <option>Performance Based</option>
                  <option>Unpaid</option>
                </select>

                <i className="ri-arrow-down-s-line select-icon"></i>
              </div>

              {/* AMOUNT */}
              {formData.stipendStatus !== "Unpaid" ? (
                <div className="relative">
                  <i className="ri-money-rupee-circle-line input-icon"></i>

                  <input
                    name="stipendAmount"
                    type="number"
                    min="1"
                    placeholder="Stipend Amount / Month"
                    value={formData.stipendAmount}
                    onChange={handleChange}
                    className="input icon-input"
                  />
                </div>
              ) : (
                <div className="flex items-center px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 text-sm">
                  <i className="ri-information-line mr-2"></i>
                  This internship is unpaid
                </div>
              )}
            </div>
          </div>

          {/* PERKS */}
          <div>
            <label className="label">
              Perks & Benefits
            </label>

            <div className="relative">
              <i className="ri-gift-line textarea-icon"></i>

              <textarea
                name="perks"
                placeholder="Mention perks, certificates, flexible timings, etc."
                value={formData.perks}
                onChange={handleChange}
                className="textarea textarea-with-icon"
                rows="2"
              />
            </div>
          </div>

          {/* ASSESSMENTS */}
          <div>
            <label className="label">
              Assessment
            </label>

            <div className="relative">
              <i className="ri-task-line textarea-icon"></i>

              <textarea
                name="assesments"
                placeholder="Mention any test, assignment or interview process..."
                value={formData.assesments}
                onChange={handleChange}
                className="textarea textarea-with-icon"
                rows="2"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2 border-t">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-1/3 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  Posting...
                </>
              ) : (
                <>
                  <i className="ri-send-plane-fill"></i>
                  Post Internship
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* STYLES */}
      <style>
        {`
          .input {
            width: 100%;
            height: 48px;
            padding: 0 14px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            background: #f9fafb;
            color: #111827;
            outline: none;
            transition: all 0.2s ease;
          }

          .input::placeholder,
          .textarea::placeholder {
            color: #9ca3af;
          }

          .input:focus,
          .textarea:focus {
            border-color: #6366f1;
            background: #ffffff;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          }

          .icon-input {
            padding-left: 42px;
          }

          .input-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
            font-size: 18px;
            pointer-events: none;
            z-index: 2;
          }

          .select-icon {
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
            pointer-events: none;
          }

          .textarea {
            width: 100%;
            padding: 13px 14px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            background: #f9fafb;
            color: #111827;
            outline: none;
            resize: vertical;
            transition: all 0.2s ease;
          }

          .textarea-with-icon {
            padding-left: 42px;
          }

          .textarea-icon {
            position: absolute;
            left: 14px;
            top: 15px;
            color: #9ca3af;
            font-size: 18px;
            pointer-events: none;
            z-index: 2;
          }

          .label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 600;
            color: #374151;
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
        `}
      </style>
    </div>
  );
};

export default AddInternshipPost;