import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncloaduser, addAccom } from "../../store/userActions";

const AddAcom = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    accom: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(asyncloaduser());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.accom.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);

      await dispatch(
        addAccom({
          accom: formData.accom.trim(),
        })
      );

      onClose();
    } catch (error) {
      console.error("Failed to add accomplishment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      
      {/* HEADER */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-6 py-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4">
              <i className="ri-trophy-line text-2xl"></i>
            </div>

            <h2 className="text-2xl font-bold">
              Add Accomplishment
            </h2>

            <p className="text-sm text-indigo-100 mt-1">
              Highlight an achievement that makes your profile stand out.
            </p>
          </div>

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition"
            aria-label="Close"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="p-6">
        
        {/* LABEL */}
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="accom"
            className="text-sm font-semibold text-gray-800"
          >
            Your Accomplishment
          </label>

          <span className="text-xs text-gray-400">
            Keep it concise
          </span>
        </div>

        {/* INPUT */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500">
            <i className="ri-medal-line text-xl"></i>
          </div>

          <input
            id="accom"
            type="text"
            name="accom"
            value={formData.accom}
            onChange={handleChange}
            placeholder="e.g. Won 1st prize in a coding competition"
            maxLength={200}
            autoFocus
            className="w-full h-14 pl-12 pr-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        {/* CHARACTER COUNT */}
        <div className="flex justify-end mt-2">
          <span className="text-xs text-gray-400">
            {formData.accom.length}/200
          </span>
        </div>

        {/* TIP */}
        <div className="mt-5 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
          <div className="flex gap-3">
            <div className="text-indigo-600 mt-0.5">
              <i className="ri-lightbulb-line text-lg"></i>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-indigo-900">
                Make it impactful
              </h4>

              <p className="text-xs text-indigo-700 mt-1 leading-5">
                Mention achievements, awards, certifications, competitions,
                projects or anything that demonstrates your skills.
              </p>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!formData.accom.trim() || isSubmitting}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>
                Adding...
              </>
            ) : (
              <>
                <i className="ri-add-line"></i>
                Add Accomplishment
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAcom;