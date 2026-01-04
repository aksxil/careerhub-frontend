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

  const { isAuthenticated, user, randomJobs, randomInternships } =
    useSelector((state) => state.user);

  useEffect(() => {
    dispatch(asyncloaduser());
    if (!randomJobs?.data) dispatch(fetchRandomJobs());
    if (!randomInternships?.data) dispatch(fetchRandomInternships());
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

      {/* WELCOME SECTION */}
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

      {/* FILTER SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        <FilteredJobsAndInternships />
      </section>

      {/* RECOMMENDED JOBS */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">
            Recommended for you
          </h2>
          <p className="text-gray-600 mt-1">
            Based on your <span className="text-indigo-600 font-medium">preferences</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {randomJobs?.data?.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </section>

      {/* INTERNSHIPS */}
      <section className="max-w-7xl mx-auto px-6 mt-16 pb-16">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">
            Trending Internships
          </h2>
          <p className="text-gray-600 mt-1">
            Gain experience with top companies
          </p>
        </div>

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
