import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInternshipDetails,
  applyForInternship,
  saveJobInternship,
} from "../../store/userActions";
import Navbar from "../Navbar";
import { toast } from "react-toastify";

const InternDetailsPage = () => {
  const { internshipId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { internshipDetails, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [applying, setApplying] = useState(false);
  const [saving, setSaving] = useState(false);

  const internship =
    internshipDetails?.[internshipId]?.internship;

  /* =========================
     FETCH INTERNSHIP
  ========================= */
  useEffect(() => {
    const loadInternship = async () => {
      try {
        setLoading(true);
        await dispatch(fetchInternshipDetails(internshipId));
      } catch (error) {
        console.error("Failed to load internship:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInternship();
  }, [dispatch, internshipId]);

  /* =========================
     APPLY
  ========================= */
  const handleApply = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to apply");
      navigate("/signin");
      return;
    }

    try {
      setApplying(true);

      await dispatch(applyForInternship(internshipId));

      toast.success("Application submitted successfully! 🎉");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.message || "Failed to apply for this internship"
      );
    } finally {
      setApplying(false);
    }
  };

  /* =========================
     SAVE
  ========================= */
  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to save internships");
      navigate("/signin");
      return;
    }

    if (isSaved) return;

    try {
      setSaving(true);

      await dispatch(
        saveJobInternship(
          user._id,
          internshipId,
          "internship"
        )
      );

      setIsSaved(true);
      toast.success("Internship saved ❤️");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save internship");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-6xl mx-auto px-6 py-10 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-8"></div>

          <div className="bg-white rounded-3xl border border-gray-100 p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-20 h-20 bg-gray-200 rounded-2xl"></div>

              <div className="flex-1">
                <div className="h-8 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mt-4"></div>

                <div className="flex gap-3 mt-6">
                  <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-28 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 bg-white rounded-3xl p-8">
              <div className="h-6 bg-gray-200 rounded w-40"></div>

              <div className="space-y-4 mt-6">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 h-64"></div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     NOT FOUND
  ========================= */
  if (!internship) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="min-h-[70vh] flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-red-50 flex items-center justify-center">
              <i className="ri-error-warning-line text-4xl text-red-500"></i>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-6">
              Internship not found
            </h2>

            <p className="text-gray-500 mt-2">
              This internship may have been removed or is no longer
              available.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const companyName =
    internship.employe?.organizationname || "Company";

  const companyLogo =
    internship.employe?.organizationLogo?.url;

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <Navbar />

      {/* =========================
          PAGE
      ========================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition mb-6"
        >
          <i className="ri-arrow-left-line text-lg group-hover:-translate-x-1 transition"></i>
          Back to internships
        </button>

        {/* =========================
            HERO CARD
        ========================= */}
        <section className="relative overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-sm">

          {/* Decorative background */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-100/60 rounded-full blur-3xl"></div>

          <div className="relative p-6 sm:p-8 md:p-10">

            <div className="flex flex-col md:flex-row md:items-start gap-6">

              {/* COMPANY LOGO */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt={companyName}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <span className="text-3xl font-bold text-indigo-600">
                    {companyName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* TITLE */}
              <div className="flex-1">

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Actively Hiring
                  </span>

                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">
                    Internship
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                  {internship.profile}
                </h1>

                <p className="flex items-center gap-2 mt-3 text-gray-600">
                  <i className="ri-building-line text-indigo-500"></i>
                  {companyName}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">

                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600">
                    <i className="ri-map-pin-line text-indigo-500"></i>
                    {internship.location || "Location not specified"}
                  </span>

                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600">
                    <i className="ri-time-line text-indigo-500"></i>
                    {internship.duration || "Flexible duration"}
                  </span>

                  {internship.internshiptype && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm text-gray-600">
                      <i className="ri-briefcase-line text-indigo-500"></i>
                      {internship.internshiptype}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            CONTENT GRID
        ========================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

          {/* =====================
              LEFT CONTENT
          ===================== */}
          <div className="lg:col-span-2 space-y-6">

            {/* QUICK DETAILS */}
            <section className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Internship Overview
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                {/* LOCATION */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <i className="ri-map-pin-line text-xl text-indigo-600"></i>
                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    Location
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {internship.location || "Not specified"}
                  </p>
                </div>

                {/* DURATION */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                    <i className="ri-calendar-line text-xl text-purple-600"></i>
                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    Duration
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {internship.duration || "Not specified"}
                  </p>
                </div>

                {/* STIPEND */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <i className="ri-money-rupee-circle-line text-xl text-green-600"></i>
                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    Stipend
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {typeof internship.stipend === "object"
                      ? `₹${internship.stipend?.amount || 0}`
                      : internship.stipend
                      ? `₹${internship.stipend}`
                      : "Not specified"}
                    {internship.stipend && (
                      <span className="text-xs font-normal text-gray-500">
                        {" "}
                        / month
                      </span>
                    )}
                  </p>
                </div>

                {/* TYPE */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                    <i className="ri-briefcase-4-line text-xl text-orange-500"></i>
                  </div>

                  <p className="text-xs text-gray-500 mt-3">
                    Work Type
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {internship.internshiptype || "Internship"}
                  </p>
                </div>

              </div>
            </section>

            {/* DESCRIPTION */}
            <section className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <i className="ri-file-text-line text-indigo-600"></i>
                About the Internship
              </h2>

              <div className="mt-5 text-gray-600 leading-7 whitespace-pre-line">
                {internship.description || (
                  <span className="text-gray-400">
                    No description provided.
                  </span>
                )}
              </div>
            </section>

            {/* SKILLS */}
            {internship.skill && (
              <section className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">

                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-tools-line text-indigo-600"></i>
                  Skills Required
                </h2>

                <div className="flex flex-wrap gap-2 mt-5">
                  {Array.isArray(internship.skill)
                    ? internship.skill.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))
                    : String(internship.skill)
                        .split(",")
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium"
                          >
                            {skill.trim()}
                          </span>
                        ))}
                </div>
              </section>
            )}

            {/* WHY APPLY */}
            <section className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white overflow-hidden relative">

              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>

              <div className="relative">
                <h2 className="text-xl font-bold">
                  Why apply through CareerHub?
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mt-6">

                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <i className="ri-check-line"></i>
                    </div>
                    <div>
                      <p className="font-semibold">
                        Easy Application
                      </p>
                      <p className="text-sm text-white/70 mt-1">
                        Apply quickly using your profile.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <i className="ri-shield-check-line"></i>
                    </div>
                    <div>
                      <p className="font-semibold">
                        Trusted Opportunities
                      </p>
                      <p className="text-sm text-white/70 mt-1">
                        Discover opportunities from employers.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>

          {/* =====================
              RIGHT SIDEBAR
          ===================== */}
          <aside className="lg:col-span-1">

            <div className="lg:sticky lg:top-28">

              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">

                <p className="text-sm text-gray-500">
                  Monthly Stipend
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-1">
                  {typeof internship.stipend === "object"
                    ? `₹${internship.stipend?.amount || 0}`
                    : internship.stipend
                    ? `₹${internship.stipend}`
                    : "Not specified"}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  per month
                </p>

                <div className="h-px bg-gray-100 my-6"></div>

                {/* APPLY */}
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition ${
                    applying
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200"
                  }`}
                >
                  {applying ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      Applying...
                    </>
                  ) : (
                    <>
                      Apply Now
                      <i className="ri-arrow-right-line"></i>
                    </>
                  )}
                </button>

                {/* SAVE */}
                <button
                  onClick={handleSave}
                  disabled={saving || isSaved}
                  className={`w-full mt-3 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 border transition ${
                    isSaved
                      ? "border-green-200 bg-green-50 text-green-600"
                      : "border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  {saving ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      Saving...
                    </>
                  ) : isSaved ? (
                    <>
                      <i className="ri-bookmark-fill"></i>
                      Saved
                    </>
                  ) : (
                    <>
                      <i className="ri-bookmark-line"></i>
                      Save Internship
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center mt-5">
                  Make sure your profile and resume are updated before
                  applying.
                </p>
              </div>

              {/* COMPANY CARD */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mt-6">

                <h3 className="font-bold text-gray-900">
                  About the Company
                </h3>

                <div className="flex items-center gap-3 mt-5">

                  <div className="w-12 h-12 rounded-xl border bg-gray-50 flex items-center justify-center overflow-hidden">
                    {companyLogo ? (
                      <img
                        src={companyLogo}
                        alt={companyName}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <span className="font-bold text-indigo-600">
                        {companyName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {companyName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Employer on CareerHub
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

export default InternDetailsPage;