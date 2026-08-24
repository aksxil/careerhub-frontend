import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncloaduser, addTraining } from "../../store/userActions";
import { toast } from "react-toastify";

const AddTraining = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    program: "",
    organization: "",
    locationType: "",
    startDate: "",
    endDate: "",
    description: "",
    location: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_DESCRIPTION_LENGTH = 1000;

  useEffect(() => {
    dispatch(asyncloaduser());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "description" &&
      value.length > MAX_DESCRIPTION_LENGTH
    ) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.program.trim()) {
      toast.error("Please enter the training program.");
      return;
    }

    if (!formData.organization.trim()) {
      toast.error("Please enter the organization.");
      return;
    }

    if (!formData.locationType) {
      toast.error("Please select a location type.");
      return;
    }

    if (
      formData.locationType === "Location" &&
      !formData.location.trim()
    ) {
      toast.error("Please enter the training location.");
      return;
    }

    if (!formData.startDate) {
      toast.error("Please select a start date.");
      return;
    }

    if (!formData.endDate) {
      toast.error("Please select an end date.");
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error("End date cannot be before start date.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please add a description.");
      return;
    }

    try {
      setIsSubmitting(true);

      await dispatch(
        addTraining({
          ...formData,
          program: formData.program.trim(),
          organization: formData.organization.trim(),
          location:
            formData.locationType === "Online"
              ? ""
              : formData.location.trim(),
          description: formData.description.trim(),
        })
      );

      toast.success("Training/Course added successfully!");

      setTimeout(() => {
        onClose();
      }, 400);
    } catch (error) {
      console.error("Error adding training:", error);
      toast.error("Failed to add training. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 px-6 py-6 text-white">
        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <i className="ri-graduation-cap-line text-2xl"></i>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Add Training / Course
              </h2>

              <p className="text-sm text-indigo-100 mt-1">
                Showcase courses, certifications and professional training
              </p>
            </div>
          </div>

          {/* CLOSE */}
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition disabled:opacity-50"
            aria-label="Close"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
      </div>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-7"
      >

        {/* INFO BOX */}
        <div className="flex gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-7">
          <div className="flex-shrink-0">
            <i className="ri-information-line text-indigo-600 text-xl"></i>
          </div>

          <div>
            <p className="text-sm font-semibold text-indigo-900">
              Add relevant learning experiences
            </p>

            <p className="text-sm text-indigo-700 mt-1 leading-relaxed">
              Include professional courses, bootcamps, certifications,
              workshops or other training that strengthens your profile.
            </p>
          </div>
        </div>

        {/* ================= PROGRAM + ORGANIZATION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* PROGRAM */}
          <div>
            <label
              htmlFor="program"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Training Program
            </label>

            <div className="relative">
              <i className="ri-book-open-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                id="program"
                type="text"
                name="program"
                value={formData.program}
                onChange={handleChange}
                placeholder="e.g. MERN Stack Development"
                className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* ORGANIZATION */}
          <div>
            <label
              htmlFor="organization"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Organization
            </label>

            <div className="relative">
              <i className="ri-building-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                id="organization"
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="e.g. Sheryians Coding School"
                className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>

        {/* ================= LOCATION ================= */}
        <div className="mt-5">
          <label
            htmlFor="locationType"
            className="block text-sm font-semibold text-gray-800 mb-2"
          >
            Training Mode
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* ONLINE */}
            <label
              className={`relative cursor-pointer rounded-xl border p-4 transition ${
                formData.locationType === "Online"
                  ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                  : "border-gray-200 bg-gray-50 hover:border-indigo-300"
              }`}
            >
              <input
                type="radio"
                name="locationType"
                value="Online"
                checked={formData.locationType === "Online"}
                onChange={handleChange}
                className="sr-only"
              />

              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    formData.locationType === "Online"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-500"
                  }`}
                >
                  <i className="ri-global-line text-xl"></i>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    Online
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Remote / Online training
                  </p>
                </div>
              </div>
            </label>

            {/* LOCATION */}
            <label
              className={`relative cursor-pointer rounded-xl border p-4 transition ${
                formData.locationType === "Location"
                  ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                  : "border-gray-200 bg-gray-50 hover:border-indigo-300"
              }`}
            >
              <input
                type="radio"
                name="locationType"
                value="Location"
                checked={formData.locationType === "Location"}
                onChange={handleChange}
                className="sr-only"
              />

              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    formData.locationType === "Location"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-500"
                  }`}
                >
                  <i className="ri-map-pin-line text-xl"></i>
                </div>

                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    In Person
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Physical training location
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* LOCATION INPUT */}
        {formData.locationType === "Location" && (
          <div className="mt-5">
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Training Location
            </label>

            <div className="relative">
              <i className="ri-map-pin-2-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bhopal, Madhya Pradesh"
                className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>
        )}

        {/* ================= DATES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

          {/* START DATE */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Start Date
            </label>

            <div className="relative">
              <i className="ri-calendar-event-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>

              <input
                id="startDate"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* END DATE */}
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              End Date
            </label>

            <div className="relative">
              <i className="ri-calendar-check-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>

              <input
                id="endDate"
                type="date"
                name="endDate"
                value={formData.endDate}
                min={formData.startDate || undefined}
                onChange={handleChange}
                className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-gray-800"
            >
              Description
            </label>

            <span
              className={`text-xs font-medium ${
                formData.description.length >= MAX_DESCRIPTION_LENGTH
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {formData.description.length}/{MAX_DESCRIPTION_LENGTH}
            </span>
          </div>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            maxLength={MAX_DESCRIPTION_LENGTH}
            placeholder="Describe what you learned, technologies covered, projects completed, certifications earned, etc."
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />

          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <i className="ri-lightbulb-line text-amber-500"></i>

            <span>
              Mention important skills, technologies and outcomes from
              your training.
            </span>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7 pt-5 border-t border-gray-100">

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[190px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line animate-spin text-lg"></i>
                Adding...
              </>
            ) : (
              <>
                <i className="ri-add-line text-lg"></i>
                Add Training
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTraining;