import React from "react";
import { Link } from "react-router-dom";

const InternCard = ({ internship }) => {
  const {
    profile,
    stipend,
    internshiptype,
    employe,
    _id,
    location,
  } = internship || {};

  const companyName =
    employe?.organizationname || "Company";

  const companyLogo =
    employe?.organizationLogo?.url;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-100/60">

      {/* =====================================================
          TOP ACCENT
      ====================================================== */}
      <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 transition-all duration-500 group-hover:w-full" />

      <div className="flex h-full flex-col p-5 sm:p-6">

        {/* =====================================================
            TOP ROW
        ====================================================== */}
        <div className="flex items-center justify-between gap-2">

          {/* Actively Hiring */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            Actively Hiring
          </div>

          {/* Internship Type */}
          <span className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold capitalize text-purple-600">
            {internshiptype || "Internship"}
          </span>
        </div>

        {/* =====================================================
            INTERNSHIP / COMPANY
        ====================================================== */}
        <div className="mt-5 flex items-start gap-4">

          {/* Company Logo */}
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition duration-300 group-hover:border-purple-200 group-hover:bg-purple-50">

            {companyLogo ? (
              <img
                src={companyLogo}
                alt={`${companyName} logo`}
                className="h-full w-full object-contain p-2"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <span className="text-xl font-extrabold text-purple-600">
                {companyName.charAt(0).toUpperCase()}
              </span>
            )}

          </div>

          {/* Internship Title + Company */}
          <div className="min-w-0 flex-1">

            <h2 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-purple-600">
              {profile || "Internship Opportunity"}
            </h2>

            <p className="mt-1.5 truncate text-sm font-medium text-slate-500">
              {companyName}
            </p>

          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ====================================================== */}
        <div className="my-5 h-px bg-slate-100" />

        {/* =====================================================
            INTERNSHIP INFORMATION
        ====================================================== */}
        <div className="space-y-3">

          {/* Internship Type */}
          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <i className="ri-briefcase-4-line text-lg" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Internship Type
              </p>

              <p className="truncate text-sm font-semibold capitalize text-slate-700">
                {internshiptype || "Not specified"}
              </p>
            </div>

          </div>

          {/* Location */}
          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <i className="ri-map-pin-2-line text-lg" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Location
              </p>

              <p className="truncate text-sm font-semibold text-slate-700">
                {location || "Location not specified"}
              </p>
            </div>

          </div>

          {/* Stipend */}
          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <i className="ri-money-rupee-circle-line text-lg" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Stipend
              </p>

              <p className="truncate text-sm font-bold text-slate-800">
                {stipend?.amount ? (
                  <>
                    ₹{stipend.amount}
                    <span className="ml-1 font-medium text-slate-400">
                      / month
                    </span>
                  </>
                ) : (
                  "Not disclosed"
                )}
              </p>
            </div>

          </div>

        </div>

        {/* =====================================================
            SPACER
        ====================================================== */}
        <div className="flex-1" />

        {/* =====================================================
            FOOTER
        ====================================================== */}
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">

          {/* Internship Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-600">
            <i className="ri-graduation-cap-line" />
            Internship
          </span>

          {/* View Details */}
          <Link
            to={`/internships/${_id}`}
            className="group/button inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-purple-200 transition-all duration-300 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-200"
          >
            View Details

            <i className="ri-arrow-right-line text-base transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>

        </div>
      </div>
    </article>
  );
};

export default InternCard;