import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncloaduser, addSkill } from "../../store/userActions";

const AddSkills = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    skillName: "",
    proficiency: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user when component mounts
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

    if (!formData.skillName.trim() || !formData.proficiency) {
      return;
    }

    try {
      setIsSubmitting(true);

      await dispatch(addSkill(formData));

      onClose();
    } catch (error) {
      console.error("Error adding skill:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const proficiencyInfo = {
    Beginner: "I have basic knowledge and understanding.",
    Intermediate: "I can work independently on most tasks.",
    Advanced: "I have strong expertise and can handle complex tasks.",
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-6 sm:px-8 py-7 text-white">

        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <i className="ri-code-s-slash-line text-2xl"></i>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Add a Skill
            </h2>

            <p className="text-sm text-white/80 mt-1">
              Highlight your technical and professional abilities
            </p>
          </div>
        </div>

        {/* CLOSE BUTTON */}
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

        {/* SKILL NAME */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
            <i className="ri-tools-line text-indigo-600"></i>
            Skill Name
          </label>

          <div className="relative">
            <i className="ri-terminal-box-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="text"
              name="skillName"
              value={formData.skillName}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              placeholder="e.g. React.js, Node.js, MongoDB"
            />
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Add a skill that represents your experience or expertise.
          </p>
        </div>

        {/* PROFICIENCY */}
        <div className="mb-8">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
            <i className="ri-bar-chart-box-line text-indigo-600"></i>
            Proficiency Level
          </label>

          <select
            name="proficiency"
            value={formData.proficiency}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 cursor-pointer"
          >
            <option value="">
              Select your proficiency
            </option>

            <option value="Beginner">
              Beginner
            </option>

            <option value="Intermediate">
              Intermediate
            </option>

            <option value="Advanced">
              Advanced
            </option>
          </select>

          {/* PROFICIENCY DESCRIPTION */}
          {formData.proficiency && (
            <div className="mt-3 flex gap-3 items-start p-4 rounded-xl bg-indigo-50 border border-indigo-100">

              <div className="h-8 w-8 shrink-0 rounded-lg bg-indigo-100 flex items-center justify-center">
                <i className="ri-information-line text-indigo-600"></i>
              </div>

              <div>
                <p className="text-sm font-semibold text-indigo-800">
                  {formData.proficiency}
                </p>

                <p className="text-xs text-indigo-600 mt-1">
                  {proficiencyInfo[formData.proficiency]}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SKILL PREVIEW */}
        {formData.skillName && (
          <div className="mb-8 p-5 rounded-2xl border border-gray-200 bg-gray-50">

            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Skill Preview
            </p>

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3 min-w-0">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <i className="ri-code-box-line text-xl text-indigo-600"></i>
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 truncate">
                    {formData.skillName}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {formData.proficiency || "Proficiency not selected"}
                  </p>
                </div>
              </div>

              {formData.proficiency && (
                <span
                  className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      formData.proficiency === "Beginner"
                        ? "bg-yellow-100 text-yellow-700"
                        : formData.proficiency === "Intermediate"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {formData.proficiency}
                </span>
              )}
            </div>
          </div>
        )}

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
            disabled={
              isSubmitting ||
              !formData.skillName.trim() ||
              !formData.proficiency
            }
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
                Add Skill
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSkills;