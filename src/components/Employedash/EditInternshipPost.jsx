import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  fetchInternshipDetails,
  updateInternshipPost,
} from "../../store/userActions";

const EditInternshipPost = ({ onClose }) => {
  const dispatch = useDispatch();
  const { internshipId } = useParams();

  const internship = useSelector(
    (state) => state.user.internshipDetails[internshipId]
  );

  const [loading, setLoading] = useState(false);

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
    perks: "",
    stipendStatus: "Fixed",
    stipendAmount: "",
    assesments: "",
    location: "",
  });

  // FETCH INTERNSHIP
  useEffect(() => {
    if (internshipId) {
      dispatch(fetchInternshipDetails(internshipId));
    }
  }, [dispatch, internshipId]);

  // SET EXISTING DATA
  useEffect(() => {
    if (internship) {
      setFormData({
        profile: internship.profile || "",
        skill: internship.skill || "",
        internshiptype: internship.internshiptype || "In office",
        openings: internship.openings || 1,
        from: internship.from || "",
        to: internship.to || "",
        duration: internship.duration || "",
        responsibility: internship.responsibility || "",
        preferences: internship.preferences || "",
        perks: internship.perks || "",
        stipendStatus: internship.stipend?.status || "Fixed",
        stipendAmount: internship.stipend?.amount || "",
        assesments: internship.assesments || "",
        location: internship.location || "",
      });
    }
  }, [internship]);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.profile.trim() ||
      !formData.duration.trim() ||
      !formData.responsibility.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (Number(formData.openings) < 1) {
      toast.error("Openings must be at least 1");
      return;
    }

    if (
      formData.stipendStatus !== "Unpaid" &&
      Number(formData.stipendAmount) <= 0
    ) {
      toast.error("Please enter a valid stipend amount");
      return;
    }

    const updatedData = {
      ...formData,
      openings: Number(formData.openings),
      stipend: {
        status: formData.stipendStatus,
        amount:
          formData.stipendStatus === "Unpaid"
            ? 0
            : Number(formData.stipendAmount),
      },
    };

    setLoading(true);

    try {
      await dispatch(
        updateInternshipPost(internshipId, updatedData)
      );

      toast.success("Internship updated successfully");
      onClose();
    } catch (error) {
      console.error("Update internship error:", error);
      toast.error("Failed to update internship");
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (!internship) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl px-8 py-6 shadow-xl text-center">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3" />

          <p className="text-gray-600 font-medium">
            Loading internship...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">

        {/* ================= HEADER ================= */}
        <div className="px-6 sm:px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Edit Internship
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update your internship posting details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition disabled:opacity-50"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        {/* ================= FORM CONTENT ================= */}
        <div className="overflow-y-auto px-6 sm:px-8 py-6">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ================= BASIC INFORMATION ================= */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  1
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Basic Information
                  </h3>

                  <p className="text-xs text-gray-500">
                    Tell candidates about the internship
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* PROFILE */}
                <div>
                  <label className="label">
                    Internship Profile <span>*</span>
                  </label>

                  <input
                    name="profile"
                    value={formData.profile}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Developer Intern"
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
                    name="skill"
                    value={formData.skill}
                    onChange={handleChange}
                    placeholder="e.g. React, JavaScript, CSS"
                    className="input"
                  />
                </div>

                {/* TYPE */}
                <div>
                  <label className="label">
                    Internship Type
                  </label>

                  <select
                    name="internshiptype"
                    value={formData.internshiptype}
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
                    placeholder="e.g. Bhopal, MP"
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* ================= INTERNSHIP DETAILS ================= */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  2
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Internship Details
                  </h3>

                  <p className="text-xs text-gray-500">
                    Define the internship requirements
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                {/* RESPONSIBILITY */}
                <div>
                  <label className="label">
                    Responsibilities <span>*</span>
                  </label>

                  <textarea
                    name="responsibility"
                    value={formData.responsibility}
                    onChange={handleChange}
                    placeholder="Describe the responsibilities and daily tasks..."
                    className="input textarea"
                    rows="4"
                    required
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
                    placeholder="Mention education, experience or candidate requirements..."
                    className="input textarea"
                    rows="3"
                  />
                </div>

                {/* PERKS */}
                <div>
                  <label className="label">
                    Perks & Benefits
                  </label>

                  <textarea
                    name="perks"
                    value={formData.perks}
                    onChange={handleChange}
                    placeholder="e.g. Certificate, Flexible hours, Work from home..."
                    className="input textarea"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            {/* ================= DURATION & OPENINGS ================= */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  3
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Duration & Openings
                  </h3>

                  <p className="text-xs text-gray-500">
                    Set internship timeline and availability
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

                {/* OPENINGS */}
                <div>
                  <label className="label">
                    Openings
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

                {/* FROM */}
                <div>
                  <label className="label">
                    Start Date
                  </label>

                  <input
                    name="from"
                    type="date"
                    value={formData.from}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                {/* TO */}
                <div>
                  <label className="label">
                    End Date
                  </label>

                  <input
                    name="to"
                    type="date"
                    value={formData.to}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                {/* DURATION */}
                <div>
                  <label className="label">
                    Duration <span>*</span>
                  </label>

                  <input
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 3 Months"
                    className="input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* ================= STIPEND ================= */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  4
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Stipend
                  </h3>

                  <p className="text-xs text-gray-500">
                    Configure the internship compensation
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* STATUS */}
                <div>
                  <label className="label">
                    Stipend Type
                  </label>

                  <select
                    name="stipendStatus"
                    value={formData.stipendStatus}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="Fixed">
                      Fixed
                    </option>

                    <option value="Negotiable">
                      Negotiable
                    </option>

                    <option value="Performance Based">
                      Performance Based
                    </option>

                    <option value="Unpaid">
                      Unpaid
                    </option>
                  </select>
                </div>

                {/* AMOUNT */}
                {formData.stipendStatus !== "Unpaid" && (
                  <div>
                    <label className="label">
                      Stipend Amount <span>*</span>
                    </label>

                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                        ₹
                      </span>

                      <input
                        name="stipendAmount"
                        type="number"
                        min="1"
                        value={formData.stipendAmount}
                        onChange={handleChange}
                        placeholder="Monthly stipend"
                        className="input pl-9"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ================= ASSESSMENTS ================= */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  5
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Assessment
                  </h3>

                  <p className="text-xs text-gray-500">
                    Add any assessment or selection process
                  </p>
                </div>
              </div>

              <textarea
                name="assesments"
                value={formData.assesments}
                onChange={handleChange}
                placeholder="e.g. Technical interview, coding test, assignment..."
                className="input textarea"
                rows="3"
              />
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="pt-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto min-w-[180px] bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Internship"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ================= STYLES ================= */}
      <style>
        {`
          .label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 7px;
          }

          .label span {
            color: #ef4444;
          }

          .input {
            width: 100%;
            padding: 11px 13px;
            border-radius: 11px;
            border: 1px solid #e5e7eb;
            background: #f9fafb;
            color: #111827;
            outline: none;
            font-size: 14px;
            transition: all 0.2s ease;
          }

          .input:hover {
            border-color: #c7d2fe;
          }

          .input:focus {
            border-color: #6366f1;
            background: #ffffff;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.10);
          }

          .input::placeholder {
            color: #9ca3af;
          }

          .textarea {
            resize: vertical;
            min-height: 90px;
            line-height: 1.5;
          }

          select.input {
            cursor: pointer;
          }

          input[type="date"].input {
            color-scheme: light;
          }

          /* Scrollbar */
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }

          .overflow-y-auto::-webkit-scrollbar-track {
            background: #f9fafb;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 10px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }

          @media (max-width: 640px) {
            .textarea {
              min-height: 80px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default EditInternshipPost;