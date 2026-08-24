import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../JobCard";
import InternCard from "../InternCard";
import {
  fetchRandomInternships,
  fetchRandomJobs,
} from "../../store/userActions";

const FilteredJobsAndInternships = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const { randomJobs = [], randomInternships = [] } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchRandomJobs());
    dispatch(fetchRandomInternships());
  }, [dispatch]);

  /*
   * FILTER
   * Supports:
   * - Search by job title
   * - Search by internship profile
   * - Search by company
   * - Search by location
   * - Remote / In Office
   */
  const filterItems = (items = []) => {
    const query = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      const company =
        item.employe?.organizationname?.toLowerCase() || "";

      const title =
        item.title?.toLowerCase() ||
        item.profile?.toLowerCase() ||
        "";

      const location =
        item.location?.toLowerCase() || "";

      const type =
        item.jobtype?.toLowerCase() ||
        item.internshiptype?.toLowerCase() ||
        item.remoteOrOffice?.toLowerCase() ||
        "";

      const searchMatches =
        !query ||
        title.includes(query) ||
        company.includes(query) ||
        location.includes(query) ||
        type.includes(query);

      const locationMatches =
        !locationFilter ||
        type === locationFilter.toLowerCase();

      return searchMatches && locationMatches;
    });
  };

  const filteredJobs = useMemo(
    () => filterItems(randomJobs),
    [randomJobs, searchQuery, locationFilter]
  );

  const filteredInternships = useMemo(
    () => filterItems(randomInternships),
    [randomInternships, searchQuery, locationFilter]
  );

  const totalResults =
    filteredJobs.length + filteredInternships.length;

  const hasFilters = searchQuery || locationFilter;

  const clearFilters = () => {
    setSearchQuery("");
    setLocationFilter("");
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 px-6 sm:px-8 py-8">

        {/* Decorative circles */}
        <div className="absolute -right-16 -top-20 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute right-20 -bottom-24 w-40 h-40 rounded-full bg-white/5" />

        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-8 w-8 rounded-lg bg-white/15 flex items-center justify-center">
                  <i className="ri-briefcase-4-line text-white"></i>
                </span>

                <span className="text-indigo-100 text-sm font-medium">
                  Career Opportunities
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Find your next opportunity
              </h1>

              <p className="text-indigo-100 text-sm mt-2 max-w-xl">
                Explore jobs and internships that match your
                skills, interests and career goals.
              </p>
            </div>

            {/* RESULT COUNT */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-4 min-w-[150px]">
              <p className="text-indigo-100 text-xs">
                Matching opportunities
              </p>

              <p className="text-3xl font-bold text-white mt-1">
                {totalResults}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FILTER AREA ================= */}
      <div className="p-5 sm:p-7 border-b border-gray-100">

        <div className="flex flex-col lg:flex-row gap-4">

          {/* SEARCH */}
          <div className="relative flex-1">

            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>

            <input
              type="text"
              placeholder="Search by role, company, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-11 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <i className="ri-close-circle-fill text-lg"></i>
              </button>
            )}
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100 w-fit">

            {[
              {
                value: "",
                label: "All",
                icon: "ri-apps-line",
              },
              {
                value: "remote",
                label: "Remote",
                icon: "ri-home-office-line",
              },
              {
                value: "in office",
                label: "In Office",
                icon: "ri-building-line",
              },
            ].map((filter) => (
              <button
                key={filter.value || "all"}
                type="button"
                onClick={() => setLocationFilter(filter.value)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                  locationFilter === filter.value
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-800 hover:bg-white/70"
                }`}
              >
                <i className={filter.icon}></i>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE FILTERS */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4">

            <span className="text-xs text-gray-500">
              Active filters:
            </span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full text-xs font-medium">
                <i className="ri-search-line"></i>
                {searchQuery}

                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="hover:text-indigo-900"
                >
                  <i className="ri-close-line"></i>
                </button>
              </span>
            )}

            {locationFilter && (
              <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full text-xs font-medium">
                <i className="ri-map-pin-line"></i>
                {locationFilter === "remote"
                  ? "Remote"
                  : "In Office"}

                <button
                  type="button"
                  onClick={() => setLocationFilter("")}
                  className="hover:text-purple-900"
                >
                  <i className="ri-close-line"></i>
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-semibold text-red-500 hover:text-red-600 ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5 sm:p-7">

        {/* ================= JOBS ================= */}
        <section>

          <div className="flex items-center justify-between mb-5">

            <div>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <i className="ri-briefcase-line text-indigo-600"></i>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Jobs
                </h2>
              </div>

              <p className="text-sm text-gray-500 mt-1 ml-11">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1
                  ? "opportunity"
                  : "opportunities"}{" "}
                available
              </p>
            </div>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="ri-briefcase-line"
              title="No jobs found"
              description={
                hasFilters
                  ? "Try changing your search or filters to find more opportunities."
                  : "There are no job opportunities available right now."
              }
              onClear={hasFilters ? clearFilters : null}
            />
          )}
        </section>

        {/* ================= DIVIDER ================= */}
        <div className="my-12 border-t border-gray-100" />

        {/* ================= INTERNSHIPS ================= */}
        <section>

          <div className="flex items-center justify-between mb-5">

            <div>
              <div className="flex items-center gap-2">

                <div className="h-9 w-9 rounded-xl bg-green-50 flex items-center justify-center">
                  <i className="ri-graduation-cap-line text-green-600"></i>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Internships
                </h2>
              </div>

              <p className="text-sm text-gray-500 mt-1 ml-11">
                {filteredInternships.length}{" "}
                {filteredInternships.length === 1
                  ? "opportunity"
                  : "opportunities"}{" "}
                available
              </p>
            </div>
          </div>

          {filteredInternships.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredInternships.map((internship) => (
                <InternCard
                  key={internship._id}
                  internship={internship}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="ri-graduation-cap-line"
              title="No internships found"
              description={
                hasFilters
                  ? "Try changing your search or filters to find more internships."
                  : "There are no internship opportunities available right now."
              }
              onClear={hasFilters ? clearFilters : null}
            />
          )}
        </section>
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
  onClear,
}) => {
  return (
    <div className="border border-dashed border-gray-200 rounded-2xl bg-gray-50/70 py-14 px-6 text-center">

      <div className="mx-auto h-14 w-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center">
        <i className={`${icon} text-2xl text-gray-400`}></i>
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mt-4">
        {title}
      </h3>

      <p className="text-sm text-gray-500 max-w-md mx-auto mt-2">
        {description}
      </p>

      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          <i className="ri-refresh-line"></i>
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilteredJobsAndInternships;