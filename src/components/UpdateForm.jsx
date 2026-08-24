import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncloaduser,
  updateUserDetails,
  uploadAvatar,
} from "../store/userActions";

const UpdateForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const { user, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [profileLoading, setProfileLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    city: "",
    gender: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  // ================= LOAD USER =================

  useEffect(() => {
    dispatch(asyncloaduser());
  }, [dispatch]);

  // ================= SET USER DATA =================

  useEffect(() => {
    if (!user) return;

    setFormData({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
      contact: user.contact || "",
      city: user.city || "",
      gender: user.gender || "",
    });

    setPreview(user.avatar?.url || "");
  }, [user]);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= AVATAR CHANGE =================

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Optional size validation
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Remove previous preview URL
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setAvatar(file);

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  // ================= PROFILE UPDATE =================

  const handleProfileUpdate = async () => {
    if (!user?._id) {
      toast.error("User information not found");
      return;
    }

    if (!formData.firstname.trim()) {
      toast.error("First name is required");
      return;
    }

    if (!formData.lastname.trim()) {
      toast.error("Last name is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    setProfileLoading(true);

    try {
      await dispatch(updateUserDetails(user._id, formData));

      toast.success("Profile updated successfully");

      // Refresh user data
      await dispatch(asyncloaduser());

      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "Failed to update profile"
      );
    } finally {
      setProfileLoading(false);
    }
  };

  // ================= AVATAR UPLOAD =================

  const handleAvatarUpload = async () => {
    if (!user?._id) {
      toast.error("User information not found");
      return;
    }

    if (!avatar) {
      toast.error("Please select an avatar first");
      return;
    }

    const data = new FormData();
    data.append("avatar", avatar);

    setAvatarLoading(true);

    try {
      await dispatch(uploadAvatar(user._id, data));

      toast.success("Avatar updated successfully");

      // Refresh user data
      await dispatch(asyncloaduser());

      setAvatar(null);

      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "Failed to upload avatar"
      );
    } finally {
      setAvatarLoading(false);
    }
  };

  // ================= LOADING =================

  if (loading && !user) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl px-6 py-4 shadow-lg">
          Loading profile...
        </div>
      </div>
    );
  }

  // ================= AUTH CHECK =================

  if (!isAuthenticated || !user) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl px-6 py-4 shadow-lg">
          Please login to continue
        </div>
      </div>
    );
  }

  // ================= UI =================

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 relative my-8">

        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          disabled={profileLoading || avatarLoading}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl disabled:opacity-50"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold mb-6">
          Update Profile
        </h2>

        {/* ================= AVATAR ================= */}

        <div className="flex items-center gap-5 mb-7">
          <img
            src={preview || "/avatar.png"}
            alt="Profile avatar"
            className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
          />

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </p>

            <label className="inline-block cursor-pointer px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
              {avatar ? "Change Avatar" : "Select Avatar"}

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleAvatarChange}
                className="hidden"
                disabled={avatarLoading}
              />
            </label>

            {avatar && (
              <p className="text-xs text-gray-500 mt-2 max-w-[220px] truncate">
                {avatar.name}
              </p>
            )}

            {avatar && (
              <button
                type="button"
                onClick={handleAvatarUpload}
                disabled={avatarLoading || profileLoading}
                className="mt-3 block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {avatarLoading ? "Uploading..." : "Upload Avatar"}
              </button>
            )}
          </div>
        </div>

        {/* ================= PROFILE FORM ================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* FIRST NAME */}
          <div>
            <label className="label">
              First Name
            </label>

            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First Name"
              className="input"
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="label">
              Last Name
            </label>

            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              className="input"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="label">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input"
            />
          </div>

          {/* CONTACT */}
          <div>
            <label className="label">
              Contact
            </label>

            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact"
              className="input"
            />
          </div>

          {/* CITY */}
          <div>
            <label className="label">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="input"
            />
          </div>

          {/* GENDER */}
          <div>
            <label className="label">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input"
            >
              <option value="">
                Select Gender
              </option>

              <option value="male">
                Male
              </option>

              <option value="female">
                Female
              </option>
            </select>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}

        <div className="flex justify-end gap-3 mt-7">

          <button
            type="button"
            onClick={onClose}
            disabled={profileLoading || avatarLoading}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleProfileUpdate}
            disabled={profileLoading || avatarLoading}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {profileLoading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ================= STYLES ================= */}

      <style>
        {`
          .input {
            width: 100%;
            padding: 11px 12px;
            border: 1px solid #d1d5db;
            border-radius: 9px;
            outline: none;
            background: white;
            transition: 0.2s;
          }

          .input:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
          }

          .input:disabled {
            background: #f3f4f6;
            cursor: not-allowed;
          }

          .label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 6px;
          }
        `}
      </style>
    </div>
  );
};

export default UpdateForm;