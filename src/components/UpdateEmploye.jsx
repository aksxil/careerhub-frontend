import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncloademploye,
  updateEmployeDetails,
  uploadOrganizationLogo,
} from "../store/userActions";
import { toast } from "react-toastify";
import EmNavbar from "./EmNavbar";
import {
  User,
  Mail,
  Phone,
  Building2,
  Upload,
  Camera,
  Save,
  Image as ImageIcon,
} from "lucide-react";

const UpdateEmploye = () => {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    organizationname: "",
  });

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  /* Load user data */
  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        contact: user.contact || "",
        organizationname: user.organizationname || "",
      });

      setPreview(user.organizationLogo?.url || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* Logo selection */
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Logo size should be less than 5MB");
      return;
    }

    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  /* Update profile */
  const handleProfileUpdate = async () => {
    if (
      !formData.firstname.trim() ||
      !formData.lastname.trim() ||
      !formData.email.trim() ||
      !formData.organizationname.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await dispatch(updateEmployeDetails(user._id, formData));
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  /* Upload logo */
  const handleLogoUpload = async () => {
    if (!logo) {
      toast.error("Please select a new logo first");
      return;
    }

    const data = new FormData();
    data.append("organizationLogo", logo);

    try {
      await dispatch(uploadOrganizationLogo(user._id, data));

      toast.success("Organization logo updated");

      setLogo(null);
    } catch {
      toast.error("Failed to upload logo");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <EmNavbar />

        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />

            <p className="text-gray-500 text-sm">
              Loading profile...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <EmNavbar />

      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-5xl">

          {/* MAIN CARD */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-indigo-100/40 overflow-hidden">

            {/* HEADER */}
            <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Employer Profile
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    Update your personal and organization details
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">

              {/* TOP SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

                {/* LOGO CARD */}
                <div className="border border-gray-100 bg-slate-50 rounded-2xl p-5">

                  <div className="flex items-center gap-2 mb-4">
                    <ImageIcon className="w-5 h-5 text-indigo-600" />

                    <h2 className="font-semibold text-gray-800">
                      Organization Logo
                    </h2>
                  </div>

                  {/* LOGO PREVIEW */}
                  <div className="flex justify-center mb-5">
                    <div className="relative group">

                      <div className="h-32 w-32 rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden flex items-center justify-center">
                        <img
                          src={preview || "/company.png"}
                          alt="Organization logo"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <label
                        htmlFor="logo-upload"
                        className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-indigo-700 transition"
                      >
                        <Camera className="w-4 h-4" />

                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* FILE INPUT */}
                  <label
                    htmlFor="logo-upload-main"
                    className="flex items-center justify-center gap-2 w-full border border-dashed border-indigo-300 bg-white text-indigo-600 rounded-xl py-2.5 text-sm font-medium cursor-pointer hover:bg-indigo-50 transition"
                  >
                    <Upload className="w-4 h-4" />

                    {logo ? "Change Logo" : "Choose Logo"}

                    <input
                      id="logo-upload-main"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>

                  {/* UPLOAD BUTTON */}
                  <button
                    type="button"
                    onClick={handleLogoUpload}
                    disabled={!logo}
                    className="w-full mt-3 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />

                    Upload Logo
                  </button>

                  <p className="text-[11px] text-gray-400 text-center mt-3">
                    PNG, JPG or WEBP • Max 5MB
                  </p>
                </div>

                {/* PROFILE FORM */}
                <div>
                  <div className="mb-5">
                    <h2 className="text-lg font-bold text-gray-800">
                      Personal Information
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Keep your account information up to date.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* FIRST NAME */}
                    <div>
                      <label className="label">
                        First Name
                      </label>

                      <div className="relative">
                        <User className="icon" />

                        <input
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleChange}
                          placeholder="First Name"
                          className="input pl-11"
                        />
                      </div>
                    </div>

                    {/* LAST NAME */}
                    <div>
                      <label className="label">
                        Last Name
                      </label>

                      <div className="relative">
                        <User className="icon" />

                        <input
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleChange}
                          placeholder="Last Name"
                          className="input pl-11"
                        />
                      </div>
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label className="label">
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail className="icon" />

                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          className="input pl-11"
                        />
                      </div>
                    </div>

                    {/* CONTACT */}
                    <div>
                      <label className="label">
                        Contact Number
                      </label>

                      <div className="relative">
                        <Phone className="icon" />

                        <input
                          name="contact"
                          value={formData.contact}
                          onChange={handleChange}
                          placeholder="Contact Number"
                          className="input pl-11"
                        />
                      </div>
                    </div>

                    {/* ORGANIZATION */}
                    <div className="md:col-span-2">
                      <label className="label">
                        Organization Name
                      </label>

                      <div className="relative">
                        <Building2 className="icon" />

                        <input
                          name="organizationname"
                          value={formData.organizationname}
                          onChange={handleChange}
                          placeholder="Organization Name"
                          className="input pl-11"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="border-t border-gray-100 my-7" />

              {/* FOOTER */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Save your profile changes
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Your updated information will be reflected across your account.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleProfileUpdate}
                  disabled={isLoading}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-md shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* INPUT STYLES */}
      <style>{`
        .label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 7px;
        }

        .input {
          width: 100%;
          height: 46px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          outline: none;
          color: #111827;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .input::placeholder {
          color: #9ca3af;
        }

        .input:hover {
          border-color: #c7d2fe;
          background: #ffffff;
        }

        .input:focus {
          border-color: #6366f1;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default UpdateEmploye;