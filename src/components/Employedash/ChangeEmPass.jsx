import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  employeResetPassword,
  asyncloademploye,
} from "../../store/userActions";
import { toast } from "react-toastify";
import EmNavbar from "../EmNavbar";
import { Eye, EyeOff, LockKeyhole, ShieldCheck } from "lucide-react";

const ChangePasswordEm = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg px-8 py-7 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
            <LockKeyhole className="w-6 h-6 text-indigo-600" />
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            Please login to continue
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            You need to be logged in to change your password.
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await dispatch(
        employeResetPassword(user._id, formData.password)
      );

      toast.success("Password changed successfully");

      setFormData({
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(
        err?.response?.data?.error || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <EmNavbar />

      {/* MAIN */}
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">

          {/* CARD */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-indigo-100/40 p-6 sm:p-8">

            {/* HEADER */}
            <div className="text-center mb-7">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-indigo-600" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Change Password
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Create a strong new password for your employer account.
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
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input pl-11 pr-12"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Password must contain at least 6 characters.
                </p>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input pl-11 pr-12"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-gray-400 hover:text-indigo-600 transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* PASSWORD MATCH */}
              {formData.confirmPassword && (
                <div
                  className={`text-sm font-medium ${
                    formData.password ===
                    formData.confirmPassword
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {formData.password ===
                  formData.confirmPassword
                    ? "✓ Passwords match"
                    : "✕ Passwords do not match"}
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-md shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>

            {/* SECURITY NOTE */}
            <div className="mt-6 p-3.5 rounded-xl bg-indigo-50 border border-indigo-100">
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />

                <p className="text-xs leading-5 text-indigo-700">
                  Keep your password private and avoid using easily
                  guessable information such as your name or phone number.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* INPUT STYLES */}
      <style>{`
        .input {
          width: 100%;
          height: 48px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          outline: none;
          font-size: 14px;
          color: #111827;
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

        input::-ms-reveal,
        input::-ms-clear {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ChangePasswordEm;