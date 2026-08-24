import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncloaduser, addProject } from "../../store/userActions";

const AddProject = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    present: false,
    description: "",
    projectLink: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user when component mounts
  useEffect(() => {
    dispatch(asyncloaduser());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);

      await dispatch(addProject(formData));

      onClose();
    } catch (error) {
      console.error("Error adding project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
      
      {/* HEADER */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-6 sm:px-8 py-7 text-white">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <i className="ri-folder-5-line text-2xl"></i>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Add Project
            </h2>
            <p className="text-sm text-white/80 mt-1">
              Showcase your work and achievements
            </p>
          </div>
        </div>

        {/* CLOSE */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
          aria-label="Close"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">

        {/* PROJECT TITLE */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
            <i className="ri-edit-2-line text-indigo-600"></i>
            Project Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            placeholder="e.g. E-commerce Website"
          />
        </div>

        {/* DATES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

          {/* START DATE */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
              <i className="ri-calendar-line text-indigo-600"></i>
              Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* END DATE */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
              <i className="ri-calendar-check-line text-indigo-600"></i>
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              disabled={formData.present}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition
                ${
                  formData.present
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                    : "bg-gray-50 border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                }`}
            />
          </div>
        </div>

        {/* CURRENTLY WORKING */}
        <div className="mb-6">
          <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-200 transition cursor-pointer">
            <input
              type="checkbox"
              name="present"
              checked={formData.present}
              onChange={handleChange}
              className="h-5 w-5 accent-indigo-600 cursor-pointer"
            />

            <div>
              <p className="text-sm font-semibold text-gray-800">
                I am currently working on this project
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Select this if the project is still ongoing
              </p>
            </div>
          </label>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
            <i className="ri-file-text-line text-indigo-600"></i>
            Project Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none resize-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            placeholder="Describe what you built, the technologies you used, and your contribution..."
          />

          <p className="text-xs text-gray-400 mt-2">
            Tip: Mention your role, technologies, features and key achievements.
          </p>
        </div>

        {/* PROJECT LINK */}
        <div className="mb-8">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
            <i className="ri-link text-indigo-600"></i>
            Project Link
            <span className="text-xs font-normal text-gray-400">
              (Optional)
            </span>
          </label>

          <div className="relative">
            <i className="ri-global-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="url"
              name="projectLink"
              value={formData.projectLink}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              placeholder="https://github.com/username/project"
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-5 border-t border-gray-100">

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-[1.01] transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>
                Adding...
              </>
            ) : (
              <>
                <i className="ri-add-line"></i>
                Add Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;