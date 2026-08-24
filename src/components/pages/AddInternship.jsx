import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addInternship, asyncloaduser } from "../../store/userActions";

const AddInternship = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    profile: "",
    organization: "",
    location: "",
    remoteOrOffice: "",
    startDate: "",
    endDate: "",
    description: "",
    type: "Internship",
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

    if (
      !formData.profile ||
      !formData.organization ||
      !formData.location ||
      !formData.remoteOrOffice ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.description
    ) {
      return;
    }

    try {
      setIsSubmitting(true);

      await dispatch(addInternship(formData));

      onClose();
    } catch (error) {
      console.error("Failed to add internship:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* HEADER */}
        <div className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur-md px-6 sm:px-8 py-5 rounded-t-3xl">
          <div className="flex items-start justify-between gap-4">

            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
                  <i className="ri-briefcase-4-line text-2xl text-indigo-600"></i>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Add Internship
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Add your internship experience to your profile.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
              aria-label="Close"
            >
              <i className="ri-close-line text-xl"></i>
            </button>

          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-7">

          {/* SECTION TITLE */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-gray-900">
              Internship Details
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Tell recruiters about your internship experience.
            </p>
          </div>

          {/* PROFILE + ORGANIZATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* PROFILE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Internship Profile
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">
                <i className="ri-user-star-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                <input
                  type="text"
                  name="profile"
                  value={formData.profile}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer Intern"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* ORGANIZATION */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Organization
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">
                <i className="ri-building-4-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="e.g. Google"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

          </div>

          {/* LOCATION */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Location
              <span className="text-red-500 ml-1">*</span>
            </label>

            <div className="relative">
              <i className="ri-map-pin-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bhopal, Madhya Pradesh"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* WORK MODE */}
          <div className="mt-6">
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              Work Mode
              <span className="text-red-500 ml-1">*</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* REMOTE */}
              <label
                className={`relative flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
                  formData.remoteOrOffice === "Remote"
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                    : "border-gray-200 bg-gray-50 hover:border-indigo-300"
                }`}
              >
                <input
                  type="radio"
                  name="remoteOrOffice"
                  value="Remote"
                  checked={formData.remoteOrOffice === "Remote"}
                  onChange={handleChange}
                  className="sr-only"
                />

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    formData.remoteOrOffice === "Remote"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-500"
                  }`}
                >
                  <i className="ri-home-office-line text-xl"></i>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    Remote
                  </p>
                  <p className="text-xs text-gray-500">
                    Work remotely
                  </p>
                </div>

                {formData.remoteOrOffice === "Remote" && (
                  <i className="ri-checkbox-circle-fill absolute right-4 top-4 text-xl text-indigo-600"></i>
                )}
              </label>

              {/* OFFICE */}
              <label
                className={`relative flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
                  formData.remoteOrOffice === "In Office"
                    ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                    : "border-gray-200 bg-gray-50 hover:border-indigo-300"
                }`}
              >
                <input
                  type="radio"
                  name="remoteOrOffice"
                  value="In Office"
                  checked={formData.remoteOrOffice === "In Office"}
                  onChange={handleChange}
                  className="sr-only"
                />

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    formData.remoteOrOffice === "In Office"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-500"
                  }`}
                >
                  <i className="ri-building-line text-xl"></i>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    In Office
                  </p>
                  <p className="text-xs text-gray-500">
                    Work from office
                  </p>
                </div>

                {formData.remoteOrOffice === "In Office" && (
                  <i className="ri-checkbox-circle-fill absolute right-4 top-4 text-xl text-indigo-600"></i>
                )}
              </label>

            </div>
          </div>

          {/* DATES */}
          <div className="mt-6">
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              Internship Duration
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* START DATE */}
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-500">
                  Start Date
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <div className="relative">
                  <i className="ri-calendar-event-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                  <input
                    type="text"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    placeholder="e.g. Jan 2024"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              {/* END DATE */}
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-500">
                  End Date
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <div className="relative">
                  <i className="ri-calendar-check-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                  <input
                    type="text"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    placeholder="e.g. Jun 2024"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Description
              <span className="text-red-500 ml-1">*</span>
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your responsibilities, projects, technologies used and achievements..."
              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />

            <p className="mt-2 text-xs text-gray-400">
              Tip: Mention the technologies you used and the impact of your
              work.
            </p>
          </div>

          {/* FOOTER */}
          <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 border-t pt-6">

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-loader-4-line animate-spin text-lg"></i>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-add-line text-lg"></i>
                  Add Internship
                </span>
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInternship;