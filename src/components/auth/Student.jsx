import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncloaduser,
  fetchRandomJobs,
  fetchRandomInternships,
} from "../../store/userActions";

import Navbar from "../Navbar";
import JobCard from "../JobCard";
import InternCard from "../InternCard";
import FilteredJobsAndInternships from "../studentdash/Filtered";

const Student = () => {
  const dispatch = useDispatch();

  const {
    isAuthenticated,
    user,
    randomJobs,
    randomInternships,
    isLoading,
  } = useSelector((state) => state.user);

  // ✅ Load user + jobs + internships
  useEffect(() => {
    dispatch(asyncloaduser());
    dispatch(fetchRandomJobs());
    dispatch(fetchRandomInternships());
  }, [dispatch]);

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="h-[80vh] flex items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-600">
            Please log in to view your dashboard
          </h2>
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* WELCOME */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold">
            Hi, {user?.firstname} 👋
          </h1>
          <p className="mt-2 text-lg opacity-90">
            Let’s help you land your dream career
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        <FilteredJobsAndInternships />
      </section>

      {/* JOBS */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <h2 className="text-3xl font-semibold text-center">
          Recommended Jobs
        </h2>

        {isLoading && (
          <p className="text-center mt-6 text-gray-500">Loading jobs...</p>
        )}

        {!isLoading && randomJobs?.data?.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No jobs found
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {randomJobs?.data?.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </section>

      {/* INTERNSHIPS */}
      <section className="max-w-7xl mx-auto px-6 mt-16 pb-16">
        <h2 className="text-3xl font-semibold text-center">
          Trending Internships
        </h2>

        {isLoading && (
          <p className="text-center mt-6 text-gray-500">
            Loading internships...
          </p>
        )}

        {!isLoading && randomInternships?.data?.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No internships found
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {randomInternships?.data?.map((internship) => (
            <InternCard
              key={internship._id}
              internship={internship}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Student;
