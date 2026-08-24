import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmNavbar from "../EmNavbar";
import {
  asyncloademploye,
  fetchInternshipDetails,
  deleteInternshipPost,
  fetchStudentDetails,
  addShortlistedStudentInternship,
} from "../../store/userActions";
import EditInternshipPost from "./EditInternshipPost";

const ViewInternship = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { internshipId } = useParams();

  const internship = useSelector(
    (state) => state.user.internshipDetails[internshipId]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});
  const [shortlisted, setShortlisted] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [shortlisting, setShortlisting] = useState({});

  // LOAD INTERNSHIP
  useEffect(() => {
    dispatch(asyncloademploye());
    dispatch(fetchInternshipDetails(internshipId));
  }, [dispatch, internshipId]);

  // LOAD STUDENT DETAILS
  useEffect(() => {
    if (!internship?.students?.length) return;

    internship.students.forEach((id) => {
      if (!studentDetails[id]) {
        dispatch(fetchStudentDetails(id)).then((res) => {
          if (res) {
            setStudentDetails((prev) => ({
              ...prev,
              [id]: res,
            }));
          }
        });
      }
    });
  }, [dispatch, internship?.students]);

  // SYNC SHORTLISTED STUDENTS
  useEffect(() => {
    if (internship?.shortlistedStudents) {
      setShortlisted(internship.shortlistedStudents);
    }
  }, [internship]);

  // DELETE INTERNSHIP
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this internship?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await dispatch(deleteInternshipPost(internshipId));

      toast.success("Internship deleted successfully");
      navigate("/employe/dashboard");
    } catch (error) {
      toast.error("Failed to delete internship");
    } finally {
      setDeleting(false);
    }
  };

  // SHORTLIST STUDENT
  const handleShortlist = async (studentId) => {
    if (shortlisted.includes(studentId)) return;

    try {
      setShortlisting((prev) => ({
        ...prev,
        [studentId]: true,
      }));

      await dispatch(
        addShortlistedStudentInternship(
          internshipId,
          studentId
        )
      );

      setShortlisted((prev) => [...prev, studentId]);

      toast.success("Student shortlisted successfully");
    } catch (error) {
      toast.error("Failed to shortlist student");
    } finally {
      setShortlisting((prev) => ({
        ...prev,
        [studentId]: false,
      }));
    }
  };

  // LOADING
  if (!internship) {
    return (
      <div className="min-h-screen bg-gray-50">
        <EmNavbar />

        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>

            <p className="text-gray-600 font-medium">
              Loading internship...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const students = internship.students || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <EmNavbar />

      {/* HEADER */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

          {/* BACK */}
          <button
            onClick={() => navigate("/employe/dashboard")}
            className="text-sm text-gray-500 hover:text-indigo-600 mb-5 transition"
          >
            ← Back to Dashboard
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">

                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">
                  Internship
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    internship.internshiptype?.toLowerCase() ===
                    "remote"
                      ? "bg-green-50 text-green-700"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {internship.internshiptype || "In office"}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {internship.profile}
              </h1>

              <p className="text-gray-500 mt-2">
                Manage your internship posting and applicants
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3">

              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Edit Internship
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Internship"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* INTERNSHIP OVERVIEW */}
            <div className="bg-white rounded-2xl border shadow-sm p-6">

              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Internship Overview
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* LOCATION */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Location
                  </p>

                  <p className="font-semibold text-gray-800">
                    {internship.location || "Not specified"}
                  </p>
                </div>

                {/* STIPEND */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Stipend
                  </p>

                  <p className="font-semibold text-gray-800">
                    {internship.stipend?.status === "Unpaid"
                      ? "Unpaid"
                      : `₹${internship.stipend?.amount || 0}/month`}
                  </p>

                  {internship.stipend?.status &&
                    internship.stipend.status !== "Fixed" && (
                      <p className="text-xs text-gray-500 mt-1">
                        {internship.stipend.status}
                      </p>
                    )}
                </div>

                {/* DURATION */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Duration
                  </p>

                  <p className="font-semibold text-gray-800">
                    {internship.duration || "Not specified"}
                  </p>
                </div>

                {/* OPENINGS */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    Openings
                  </p>

                  <p className="font-semibold text-gray-800">
                    {internship.openings || 0}
                  </p>
                </div>

                {/* SKILLS */}
                <div className="sm:col-span-2 bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Required Skills
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {internship.skill ? (
                      internship.skill
                        .split(",")
                        .map((skill, index) => (
                          <span
                            key={`${skill.trim()}-${index}`}
                            className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium"
                          >
                            {skill.trim()}
                          </span>
                        ))
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No skills specified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RESPONSIBILITIES */}
            {internship.responsibility && (
              <div className="bg-white rounded-2xl border shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Responsibilities
                </h2>

                <p className="text-gray-600 whitespace-pre-line leading-7">
                  {internship.responsibility}
                </p>
              </div>
            )}

            {/* PREFERENCES */}
            {internship.preferences && (
              <div className="bg-white rounded-2xl border shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Candidate Preferences
                </h2>

                <p className="text-gray-600 whitespace-pre-line leading-7">
                  {internship.preferences}
                </p>
              </div>
            )}

            {/* PERKS */}
            {internship.perks && (
              <div className="bg-white rounded-2xl border shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Perks & Benefits
                </h2>

                <p className="text-gray-600 whitespace-pre-line leading-7">
                  {internship.perks}
                </p>
              </div>
            )}

            {/* ASSESSMENTS */}
            {internship.assesments && (
              <div className="bg-white rounded-2xl border shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Assessments
                </h2>

                <p className="text-gray-600 whitespace-pre-line leading-7">
                  {internship.assesments}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div>
            <div className="bg-white rounded-2xl border shadow-sm p-6 lg:sticky lg:top-24">

              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Applicants
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Students who applied
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  {students.length}
                </div>
              </div>

              {students.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-2xl">
                    👤
                  </div>

                  <p className="font-medium text-gray-700">
                    No applicants yet
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Applicants will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">

                  {students.map((id) => {
                    const student = studentDetails[id];
                    const isShortlisted =
                      shortlisted.includes(id);
                    const isShortlisting =
                      shortlisting[id];

                    return (
                      <div
                        key={id}
                        className="border rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition"
                      >
                        <div className="flex items-center justify-between gap-3">

                          <Link
                            to={`/viewJobApplicant/${id}`}
                            className="min-w-0"
                          >
                            <p className="font-semibold text-gray-800 hover:text-indigo-600 truncate">
                              {student
                                ? `${student.firstname || ""} ${
                                    student.lastname || ""
                                  }`
                                : "Loading..."}
                            </p>

                            {student?.email && (
                              <p className="text-xs text-gray-500 truncate mt-1">
                                {student.email}
                              </p>
                            )}
                          </Link>

                          <button
                            onClick={() =>
                              handleShortlist(id)
                            }
                            disabled={
                              isShortlisted ||
                              isShortlisting
                            }
                            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                              isShortlisted
                                ? "bg-green-100 text-green-700 cursor-default"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                          >
                            {isShortlisting
                              ? "..."
                              : isShortlisted
                              ? "Shortlisted"
                              : "Shortlist"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* EDIT MODAL */}
      {isEditing && (
        <EditInternshipPost
          internshipId={internshipId}
          onClose={() => {
            setIsEditing(false);

            // Refresh internship after edit
            dispatch(fetchInternshipDetails(internshipId));
          }}
        />
      )}
    </div>
  );
};

export default ViewInternship;