import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncloaduser, addPortfolio } from "../../store/userActions";

const AddPortfolio = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    blogLink: "",
    githubProfile: "",
    playStoreDevAccount: "",
    behancePortfolio: "",
    otherWorkSample: "",
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

    try {
      setIsSubmitting(true);

      await dispatch(addPortfolio(formData));

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error adding portfolio:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const portfolioFields = [
    {
      name: "blogLink",
      label: "Blog / Articles",
      placeholder: "https://yourblog.com",
      icon: "ri-article-line",
      description: "Share your personal blog or technical articles.",
    },
    {
      name: "githubProfile",
      label: "GitHub Profile",
      placeholder: "https://github.com/username",
      icon: "ri-github-line",
      description: "Showcase your open-source projects and code.",
    },
    {
      name: "playStoreDevAccount",
      label: "Play Store Developer Account",
      placeholder: "https://play.google.com/store/apps/dev?id=...",
      icon: "ri-google-play-line",
      description: "Add your published Android apps.",
    },
    {
      name: "behancePortfolio",
      label: "Behance Portfolio",
      placeholder: "https://behance.net/username",
      icon: "ri-behance-line",
      description: "Perfect for UI/UX and creative work.",
    },
    {
      name: "otherWorkSample",
      label: "Other Work Sample",
      placeholder: "https://yourportfolio.com",
      icon: "ri-links-line",
      description: "Add any other relevant work or portfolio link.",
    },
  ];

  const hasLinks = Object.values(formData).some(
    (value) => value.trim() !== ""
  );

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-6 sm:px-8 py-7 text-white">

        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <i className="ri-links-line text-2xl"></i>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Add Portfolio
            </h2>

            <p className="text-sm text-white/80 mt-1">
              Showcase your work, projects and online presence
            </p>
          </div>
        </div>

        {/* CLOSE */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center"
            aria-label="Close"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        )}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">

        {/* INTRO */}
        <div className="mb-7 p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex gap-3">

          <div className="h-9 w-9 shrink-0 rounded-xl bg-indigo-100 flex items-center justify-center">
            <i className="ri-lightbulb-line text-indigo-600"></i>
          </div>

          <div>
            <p className="text-sm font-semibold text-indigo-900">
              Make your profile stand out
            </p>

            <p className="text-xs text-indigo-600 mt-1">
              Add links to your projects, GitHub, apps, articles or other
              professional work. You can leave any field empty.
            </p>
          </div>
        </div>

        {/* PORTFOLIO FIELDS */}
        <div className="space-y-5">

          {portfolioFields.map((field) => (
            <div key={field.name}>

              <label
                htmlFor={field.name}
                className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2"
              >
                <i className={`${field.icon} text-indigo-600 text-base`}></i>
                {field.label}
              </label>

              <div className="relative">
                <i
                  className={`${field.icon} absolute left-4 top-1/2 -translate-y-1/2 text-gray-400`}
                ></i>

                <input
                  id={field.name}
                  type="url"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <p className="text-xs text-gray-400 mt-2 ml-1">
                {field.description}
              </p>
            </div>
          ))}
        </div>

        {/* PREVIEW */}
        {hasLinks && (
          <div className="mt-8 p-5 rounded-2xl border border-gray-200 bg-gray-50">

            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Portfolio Preview
                </p>

                <p className="text-sm font-semibold text-gray-800 mt-1">
                  Your professional links
                </p>
              </div>

              <div className="h-9 w-9 rounded-xl bg-indigo-100 flex items-center justify-center">
                <i className="ri-eye-line text-indigo-600"></i>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {portfolioFields
                .filter((field) => formData[field.name].trim() !== "")
                .map((field) => (
                  <a
                    key={field.name}
                    href={formData[field.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-sm transition group"
                  >
                    <div className="h-9 w-9 shrink-0 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <i
                        className={`${field.icon} text-indigo-600`}
                      ></i>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {field.label}
                      </p>

                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {formData[field.name]}
                      </p>
                    </div>

                    <i className="ri-external-link-line text-gray-400 group-hover:text-indigo-600 transition"></i>
                  </a>
                ))}
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 mt-8 border-t border-gray-100">

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-[1.01] transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>
                Saving...
              </>
            ) : (
              <>
                <i className="ri-save-3-line"></i>
                Save Portfolio
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPortfolio;