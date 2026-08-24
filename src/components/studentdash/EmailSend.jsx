import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendForgotPasswordLink } from "../../store/userActions";
import { toast } from "react-toastify";
import Navbar from "../Navbar";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(sendForgotPasswordLink(email));

      toast.success("Password reset link sent to your email");
      setEmail("");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <Navbar />

      <main className="min-h-[calc(100vh-70px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid lg:grid-cols-2">

          {/* ================= LEFT PANEL ================= */}
          <div className="hidden lg:flex relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-10 text-white flex-col justify-between overflow-hidden">

            {/* Decorative circles */}
            <div className="absolute -top-28 -right-28 w-80 h-80 bg-white/10 rounded-full" />
            <div className="absolute -bottom-36 -left-24 w-96 h-96 bg-white/10 rounded-full" />

            <div className="relative z-10">

              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-8">
                <i className="ri-lock-unlock-line text-3xl"></i>
              </div>

              <h1 className="text-4xl font-bold leading-tight">
                Forgot your
                <span className="block text-indigo-200">
                  password?
                </span>
              </h1>

              <p className="text-indigo-100 mt-5 leading-relaxed max-w-md">
                Don't worry. Enter your registered email address
                and we'll send you a secure link to reset your
                password.
              </p>
            </div>

            {/* Steps */}
            <div className="relative z-10 space-y-5">

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <span className="text-sm font-bold">1</span>
                </div>

                <div>
                  <p className="font-medium">
                    Enter your email
                  </p>
                  <p className="text-xs text-indigo-200">
                    Use your registered email address
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <span className="text-sm font-bold">2</span>
                </div>

                <div>
                  <p className="font-medium">
                    Check your inbox
                  </p>
                  <p className="text-xs text-indigo-200">
                    Open the password reset email
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <span className="text-sm font-bold">3</span>
                </div>

                <div>
                  <p className="font-medium">
                    Create a new password
                  </p>
                  <p className="text-xs text-indigo-200">
                    Set a strong password for your account
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="p-6 sm:p-10 lg:p-12">

            {/* Mobile Icon */}
            <div className="lg:hidden w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
              <i className="ri-lock-unlock-line text-3xl"></i>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Forgot Password
              </h2>

              <p className="text-gray-500 mt-2 leading-relaxed">
                Enter your registered email and we'll send
                you a password reset link.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 p-4 mb-6 bg-red-50 border border-red-100 rounded-xl">
                <i className="ri-error-warning-line text-red-500 text-xl"></i>

                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Unable to send reset link
                  </p>

                  <p className="text-xs text-red-600 mt-1">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="ri-mail-line text-lg"></i>
                  </div>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                </div>
              </div>

              {/* Info */}
              <div className="flex items-start gap-3 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">

                <i className="ri-information-line text-indigo-600 text-xl mt-0.5"></i>

                <div>
                  <p className="text-sm font-semibold text-indigo-900">
                    Check your email
                  </p>

                  <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
                    After submitting, check your inbox and
                    spam folder for the password reset email.
                  </p>
                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || !email}
                className={`w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                  isLoading || !email
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.99]"
                }`}
              >

                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin text-lg"></i>
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    <i className="ri-mail-send-line text-lg"></i>
                    Send Reset Link
                  </>
                )}

              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-gray-200 flex-1"></div>

              <span className="text-xs text-gray-400">
                OR
              </span>

              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Login */}
            <div className="text-center">

              <p className="text-sm text-gray-500">
                Remembered your password?
              </p>

              <Link
                to="/signin"
                className="inline-flex items-center gap-1.5 mt-2 text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition"
              >
                <i className="ri-arrow-left-line"></i>
                Back to Login
              </Link>

            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
                <i className="ri-shield-check-line text-green-500"></i>
                Your account security is our priority
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordForm;