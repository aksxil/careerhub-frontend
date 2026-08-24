import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../Navbar";

const ResetPasswordPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password strength
  const getPasswordStrength = () => {
    if (!password) return null;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      return {
        label: "Weak",
        width: "w-1/3",
        color: "bg-red-500",
      };
    }

    if (score <= 4) {
      return {
        label: "Medium",
        width: "w-2/3",
        color: "bg-yellow-500",
      };
    }

    return {
      label: "Strong",
      width: "w-full",
      color: "bg-green-500",
    };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:3000/student/forget-link/${id}`,
        {
          password,
        }
      );

      toast.success("Password reset successfully");

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/signin");
      }, 1200);
    } catch (error) {
      console.error("Reset password error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Invalid or expired reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <main className="min-h-[calc(100vh-70px)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">

          {/* CARD */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

            {/* TOP GRADIENT */}
            <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <div className="p-7 sm:p-9">

              {/* ICON */}
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <i className="ri-lock-password-line text-3xl text-indigo-600"></i>
                </div>
              </div>

              {/* HEADER */}
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Reset Password
                </h1>

                <p className="text-sm text-gray-500 mt-2 leading-6">
                  Create a new password to secure your account.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* NEW PASSWORD */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>

                  <div className="relative">
                    <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                      className="w-full h-12 pl-11 pr-12 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
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
                  {strength && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-gray-500">
                          Password strength
                        </span>

                        <span
                          className={`text-xs font-semibold ${
                            strength.label === "Strong"
                              ? "text-green-600"
                              : strength.label === "Medium"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {strength.label}
                        </span>
                      </div>

                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.width} ${strength.color} rounded-full transition-all duration-300`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <i className="ri-shield-check-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      placeholder="Confirm your password"
                      required
                      className={`w-full h-12 pl-11 pr-12 border rounded-xl bg-gray-50 focus:bg-white focus:ring-4 outline-none transition ${
                        confirmPassword
                          ? password === confirmPassword
                            ? "border-green-400 focus:border-green-500 focus:ring-green-100"
                            : "border-red-400 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
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
                  {confirmPassword && (
                    <div className="mt-2">
                      {password === confirmPassword ? (
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

                {/* PASSWORD REQUIREMENTS */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Password should contain:
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <PasswordRequirement
                      valid={password.length >= 8}
                      text="8+ characters"
                    />

                    <PasswordRequirement
                      valid={/[A-Z]/.test(password)}
                      text="Uppercase letter"
                    />

                    <PasswordRequirement
                      valid={/[0-9]/.test(password)}
                      text="Number"
                    />

                    <PasswordRequirement
                      valid={/[^A-Za-z0-9]/.test(password)}
                      text="Special character"
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full h-12 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-lg ${
                    loading
                      ? "bg-indigo-300 cursor-not-allowed shadow-none"
                      : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-[0.98]"
                  }`}
                >
                  {loading ? (
                    <>
                      <i className="ri-loader-4-line animate-spin text-lg"></i>
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      <i className="ri-lock-unlock-line text-lg"></i>
                      Reset Password
                    </>
                  )}
                </button>
              </form>

              {/* FOOTER */}
              <div className="mt-7 pt-6 border-t border-gray-100 text-center">
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="text-sm text-gray-500 hover:text-indigo-600 transition"
                >
                  <i className="ri-arrow-left-line mr-1"></i>
                  Back to Sign In
                </button>
              </div>
            </div>
          </div>

          {/* SECURITY NOTE */}
          <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-400">
            <i className="ri-shield-check-line"></i>
            Your password is encrypted and secure
          </div>
        </div>
      </main>
    </div>
  );
};

/* PASSWORD REQUIREMENT */
const PasswordRequirement = ({ valid, text }) => {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <i
        className={
          valid
            ? "ri-checkbox-circle-fill text-green-500"
            : "ri-checkbox-blank-circle-line text-gray-300"
        }
      ></i>

      <span
        className={
          valid ? "text-green-600" : "text-gray-500"
        }
      >
        {text}
      </span>
    </div>
  );
};

export default ResetPasswordPage;