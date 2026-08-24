import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloaduser, studentResetPassword } from "../../store/userActions";
import { toast } from "react-toastify";
import Navbar from "../Navbar";

const ChangePasswordForm = () => {
  const dispatch = useDispatch();

  const studentId = useSelector((state) => state.user.user?._id);
  const isLoading = useSelector((state) => state.user.isLoading);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

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

    if (!studentId) {
      toast.error("Unable to identify your account");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await dispatch(
        studentResetPassword(studentId, formData.password)
      );

      toast.success("Password changed successfully");

      setFormData({
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Navbar />

      <main className="min-h-[calc(100vh-70px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* LEFT SIDE */}
          <div className="hidden lg:flex relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-10 text-white flex-col justify-between overflow-hidden">

            {/* Decorative circles */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full" />
            <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-white/10 rounded-full" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-8">
                <i className="ri-lock-password-line text-3xl"></i>
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                Keep your account
                <span className="block text-indigo-200">
                  secure.
                </span>
              </h1>

              <p className="text-indigo-100 mt-5 leading-relaxed max-w-md">
                Update your password regularly and use a strong,
                unique password to keep your account protected.
              </p>
            </div>

            <div className="relative z-10 space-y-4">

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  <i className="ri-shield-check-line"></i>
                </div>
                <span className="text-sm text-indigo-100">
                  Keep your account protected
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  <i className="ri-key-2-line"></i>
                </div>
                <span className="text-sm text-indigo-100">
                  Use a strong password
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  <i className="ri-user-settings-line"></i>
                </div>
                <span className="text-sm text-indigo-100">
                  Manage your account securely
                </span>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-6 sm:p-10 lg:p-12">

            {/* HEADER */}
            <div className="mb-8">

              <div className="lg:hidden w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-5">
                <i className="ri-lock-password-line text-3xl"></i>
              </div>

              <h2 className="text-3xl font-bold text-gray-900">
                Change Password
              </h2>

              <p className="text-gray-500 mt-2">
                Create a new password for your account.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NEW PASSWORD */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="ri-lock-line text-lg"></i>
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    placeholder="Enter new password"
                    className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
                  >
                    <i
                      className={
                        showPassword
                          ? "ri-eye-off-line text-lg"
                          : "ri-eye-line text-lg"
                      }
                    ></i>
                  </button>
                </div>

                {/* PASSWORD STRENGTH */}
                {formData.password && (
                  <div className="mt-3">

                    <div className="flex gap-1.5 h-1.5">
                      <div
                        className={`flex-1 rounded-full ${
                          formData.password.length >= 1
                            ? "bg-red-400"
                            : "bg-gray-200"
                        }`}
                      />

                      <div
                        className={`flex-1 rounded-full ${
                          formData.password.length >= 6
                            ? "bg-yellow-400"
                            : "bg-gray-200"
                        }`}
                      />

                      <div
                        className={`flex-1 rounded-full ${
                          formData.password.length >= 8
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      Use at least 8 characters for a stronger
                      password.
                    </p>
                  </div>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="ri-shield-keyhole-line text-lg"></i>
                  </div>

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    className={`w-full pl-11 pr-12 py-3.5 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:ring-4 ${
                      formData.confirmPassword &&
                      formData.password !==
                        formData.confirmPassword
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : formData.confirmPassword &&
                          formData.password ===
                            formData.confirmPassword
                        ? "border-green-300 focus:border-green-400 focus:ring-green-100"
                        : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
                  >
                    <i
                      className={
                        showConfirmPassword
                          ? "ri-eye-off-line text-lg"
                          : "ri-eye-line text-lg"
                      }
                    ></i>
                  </button>
                </div>

                {/* MATCH STATUS */}
                {formData.confirmPassword && (
                  <div className="mt-2">
                    {formData.password ===
                    formData.confirmPassword ? (
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <i className="ri-checkbox-circle-fill"></i>
                        Passwords match
                      </p>
                    ) : (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <i className="ri-error-warning-fill"></i>
                        Passwords do not match
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* SECURITY NOTE */}
              <div className="flex gap-3 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                <i className="ri-information-line text-indigo-600 text-xl mt-0.5"></i>

                <div>
                  <p className="text-sm font-semibold text-indigo-900">
                    Password security
                  </p>

                  <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
                    Avoid using your name, phone number,
                    birthday, or commonly used passwords.
                  </p>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !formData.password ||
                  !formData.confirmPassword ||
                  formData.password !==
                    formData.confirmPassword
                }
                className={`w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                  isLoading ||
                  !formData.password ||
                  !formData.confirmPassword ||
                  formData.password !==
                    formData.confirmPassword
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.99]"
                }`}
              >
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Updating Password...
                  </>
                ) : (
                  <>
                    <i className="ri-lock-unlock-line"></i>
                    Change Password
                  </>
                )}
              </button>
            </form>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <i className="ri-shield-check-line text-green-500"></i>
                Your account security matters to us
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ChangePasswordForm;