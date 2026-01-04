import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  applyForInternship,
  asyncloaduser,
  fetchInternDetailsStu,
  saveJobInternship,
} from "../../store/userActions";
import Navbar from "../Navbar";

const InternDetailsPage = () => {
  const { internshipId } = useParams();
  const dispatch = useDispatch();

  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const userState = useSelector((state) => state.user);
  const internship = useSelector(
    (state) => state.user.internshipDetails[internshipId]
  );

  useEffect(() => {
    dispatch(asyncloaduser());
  }, [dispatch]);

  useEffect(() => {
    if (internshipId && !internship) {
      dispatch(fetchInternDetailsStu(internshipId));
    }
  }, [dispatch, internshipId, internship]);

  useEffect(() => {
    if (internship?.data && userState.user) {
      setIsAlreadyApplied(
        internship.data.students?.includes(userState.user._id)
      );

      setIsSaved(
        userState.user.savedInternships?.includes(internshipId)
      );
    }
  }, [internship, userState, internshipId]);

  const handleApply = () => {
    dispatch(applyForInternship(internshipId)).then(() => {
      setIsAlreadyApplied(true);
      toast.success("Applied successfully");
    });
  };

  const handleSave = () => {
    dispatch(
      saveJobInternship(userState.user._id, internshipId, "internship")
    )
      .then(() => {
        setIsSaved(true);
        toast.success("Internship saved");
      })
      .catch(() => toast.error("Unable to save internship"));
  };

  if (!internship) {
    return (
      <>
        <Navbar />
        <div className="h-[80vh] flex items-center justify-center">
          <p className="text-gray-500">Loading internship details...</p>
        </div>
      </>
    );
  }

  const {
    profile,
    internshiptype,
    stipend,
    duration,
    skill,
    preferences,
    responsibility,
    assesments,
  } = internship.data;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT: INTERNSHIP DETAILS */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {profile}
          </h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
              {internshiptype}
            </span>
            <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full">
              ₹{stipend?.amount} / month
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {duration}
            </span>
          </div>

          <section className="mt-8">
            <h2 className="section-title">Responsibilities</h2>
            <p className="section-text">{responsibility}</p>
          </section>

          <section className="mt-6">
            <h2 className="section-title">Skills Required</h2>
            <p className="section-text text-indigo-600 font-medium">
              {skill}
            </p>
          </section>

          <section className="mt-6">
            <h2 className="section-title">Preferences</h2>
            <p className="section-text">{preferences}</p>
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
                  Save Internship
                </button>
              ) : (
                <p className="mt-4 text-center text-indigo-600 font-semibold">
                  ★ Internship Saved
                </p>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500">
              Please log in to apply or save this internship
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

export default InternDetailsPage;
