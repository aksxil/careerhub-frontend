import React, { useState } from "react";

import AddGraduationForm from "./AddGraduationForm";
import AddSeniorSecondaryForm from "./AddSeniorSecondaryForm";
import AddSecondary from "./AddSecondary";
import AddDiploma from "./AddDiploma";

const AddEducationForm = ({ onClose }) => {
  const [educationType, setEducationType] = useState("");

  const handleAddEducation = (type) => {
    setEducationType(type);
  };

  const handleBack = () => {
    setEducationType("");
  };

  const renderEducationForm = () => {
    switch (educationType) {
      case "graduation":
        return <GraduationForm onClose={onClose} />;

      case "senior_secondary":
        return <SeniorSecondaryForm onClose={onClose} />;

      case "secondary":
        return <SecondaryForm onClose={onClose} />;

      case "diploma":
        return <DiplomaForm onClose={onClose} />;

      case "phd":
        return <PhdForm onClose={onClose} />;

      default:
        return null;
    }
  };

  const educationOptions = [
    {
      type: "graduation",
      icon: "ri-graduation-cap-line",
      title: "Graduation / Post Graduation",
      description: "Add your Bachelor's, Master's or equivalent degree",
    },
    {
      type: "senior_secondary",
      icon: "ri-school-line",
      title: "Senior Secondary (XII)",
      description: "Add your Class 12th academic details",
    },
    {
      type: "secondary",
      icon: "ri-book-open-line",
      title: "Secondary (X)",
      description: "Add your Class 10th academic details",
    },
    {
      type: "diploma",
      icon: "ri-award-line",
      title: "Diploma",
      description: "Add your diploma or technical qualification",
    },
    {
      type: "phd",
      icon: "ri-flask-line",
      title: "PhD",
      description: "Add your doctoral degree details",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-6 sm:px-8 py-7 text-white">
        <div className="flex items-start justify-between gap-4">

          <div>
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4">
              <i className="ri-graduation-cap-line text-2xl"></i>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold">
              Add Education
            </h2>

            <p className="text-sm sm:text-base text-indigo-100 mt-2 max-w-xl">
              Showcase your educational background and qualifications
              to make your profile stronger.
            </p>
          </div>

          {/* CLOSE */}
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            aria-label="Close"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 sm:p-8">

        {/* BACK BUTTON */}
        {educationType && (
          <button
            type="button"
            onClick={handleBack}
            className="mb-6 flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
          >
            <i className="ri-arrow-left-line"></i>
            Back to education types
          </button>
        )}

        {!educationType ? (
          <>
            {/* TITLE */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">
                What would you like to add?
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Select your highest or relevant qualification.
              </p>
            </div>

            {/* EDUCATION OPTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {educationOptions.map((option) => (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => handleAddEducation(option.type)}
                  className="group text-left p-5 rounded-2xl border border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start gap-4">

                    {/* ICON */}
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
                      <i className={`${option.icon} text-xl`}></i>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-semibold text-gray-900 group-hover:text-indigo-700 transition">
                          {option.title}
                        </h4>

                        <i className="ri-arrow-right-line text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-transform"></i>
                      </div>

                      <p className="text-sm text-gray-500 mt-1 leading-5">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* TIP */}
            <div className="mt-7 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex gap-3">
                <i className="ri-lightbulb-line text-indigo-600 text-xl"></i>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    Resume tip
                  </h4>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-5">
                    Keep your education details accurate and include your
                    institution, degree, field of study and relevant dates.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* SELECTED FORM */
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3 sm:p-5">
            {renderEducationForm()}
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================
   GRADUATION
========================================================= */

const GraduationForm = ({ onClose }) => {
  return (
    <AddGraduationForm
      onClose={onClose}
    />
  );
};

/* =========================================================
   SENIOR SECONDARY
========================================================= */

const SeniorSecondaryForm = ({ onClose }) => {
  return (
    <AddSeniorSecondaryForm
      onClose={onClose}
    />
  );
};

/* =========================================================
   SECONDARY
========================================================= */

const SecondaryForm = ({ onClose }) => {
  return (
    <AddSecondary
      onClose={onClose}
    />
  );
};

/* =========================================================
   DIPLOMA
========================================================= */

const DiplomaForm = ({ onClose }) => {
  return (
    <AddDiploma
      onClose={onClose}
    />
  );
};

/* =========================================================
   PHD
========================================================= */

const PhdForm = ({ onClose }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <i className="ri-flask-line text-xl"></i>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Add PhD
          </h3>

          <p className="text-sm text-gray-500">
            Add your doctoral qualification.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
        <p className="text-sm text-amber-700">
          PhD form is not implemented yet.
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-5 w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
      >
        Close
      </button>
    </div>
  );
};

export default AddEducationForm;