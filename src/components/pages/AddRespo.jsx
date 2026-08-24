import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addResponsibility, asyncloaduser } from "../../store/userActions";
import { toast } from "react-toastify";

const AddResponsibility = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_LENGTH = 1000;

  useEffect(() => {
    dispatch(asyncloaduser());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value.length <= MAX_LENGTH) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const description = formData.description.trim();

    if (!description) {
      toast.error("Please enter a responsibility.");
      return;
    }

    if (description.length < 10) {
      toast.error("Responsibility should contain at least 10 characters.");
      return;
    }

    try {
      setIsSubmitting(true);

      await dispatch(
        addResponsibility({
          description,
        })
      );

      toast.success("Responsibility added successfully!");

      setTimeout(() => {
        onClose();
      }, 400);
    } catch (error) {
      console.error("Error adding responsibility:", error);
      toast.error("Failed to add responsibility. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      
      {/* HEADER */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 px-6 py-6 text-white">
        <div className="flex items-start justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <i className="ri-briefcase-4-line text-2xl"></i>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Add Responsibility
              </h2>

              <p className="text-sm text-indigo-100 mt-1">
                Highlight what you were responsible for
              </p>
            </div>
          </div>

          {/* CLOSE BUTTON */}
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

      {/* BODY */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-7">
        
        {/* INFO */}
        <div className="flex gap-3 bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
          <div className="flex-shrink-0">
            <i className="ri-information-line text-indigo-600 text-xl"></i>
          </div>

          <div>
            <p className="text-sm font-semibold text-indigo-900">
              Make it meaningful
            </p>

            <p className="text-sm text-indigo-700 mt-1 leading-relaxed">
              Describe your responsibilities, contributions, tools you used,
              or the work you handled.
            </p>
          </div>
        </div>

        {/* TEXTAREA */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-gray-800"
            >
              Responsibility Description
            </label>

            <span
              className={`text-xs font-medium ${
                formData.description.length >= MAX_LENGTH
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              {formData.description.length}/{MAX_LENGTH}
            </span>
          </div>

          <div className="relative">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={7}
              maxLength={MAX_LENGTH}
              placeholder="Example: Developed responsive web interfaces using React.js and Tailwind CSS, collaborated with the backend team, fixed UI issues, and optimized application performance..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />

            {/* TEXTAREA ICON */}
            <div className="absolute right-4 top-4 pointer-events-none">
              <i className="ri-edit-2-line text-gray-300 text-lg"></i>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <i className="ri-lightbulb-line text-amber-500"></i>
            <span>
              Start with an action word like Developed, Managed, Created,
              Led, Designed, or Improved.
            </span>
          </div>
        </div>

        {/* EXAMPLE */}
        <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <i className="ri-sparkling-2-line text-indigo-500"></i>

            <p className="text-sm font-semibold text-gray-800">
              Good example
            </p>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            "Developed responsive React.js components, integrated REST APIs,
            collaborated with designers, and improved the overall user
            experience across mobile and desktop devices."
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7">
          
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting || !formData.description.trim()}
            className="w-full sm:w-auto min-w-[170px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line animate-spin text-lg"></i>
                Adding...
              </>
            ) : (
              <>
                <i className="ri-add-line text-lg"></i>
                Add Responsibility
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddResponsibility;