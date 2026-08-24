import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncsignin } from "../../store/userActions";
import { toast } from "react-toastify";
import Navbar from "../Navbar";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // -----------------------------
  // INPUT CHANGE
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // -----------------------------
  // LOGIN
  // -----------------------------
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      await dispatch(asyncsignin(formData));
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // -----------------------------
  // SUCCESS
  // -----------------------------
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful");
      navigate("/student/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // -----------------------------
  // ERROR
  // -----------------------------
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <main className="min-h-[calc(100vh-70px)] flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-5xl">

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

            <div className="grid md:grid-cols-2">

              {/* ==================================
                  LEFT SIDE
              ================================== */}
              <div className="hidden md:flex relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-10 text-white overflow-hidden">

                {/* Decorative circles */}
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />

                <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-purple-400/20" />

                <div className="relative z-10 flex flex-col justify-center">

                  <div className="mb-8">

                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-6">
                      <i className="ri-graduation-cap-line text-3xl"></i>
                    </div>

                    <h1 className="text-4xl font-bold leading-tight">
                      Build Your
                      <br />
                      <span className="text-indigo-200">
                        Career Journey
                      </span>
                    </h1>

                    <p className="mt-5 text-indigo-100 leading-relaxed">
                      Find the right jobs, internships and opportunities
                      to take your career to the next level.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-5">

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <i className="ri-briefcase-line text-xl"></i>
                      </div>

                      <div>
                        <p className="font-semibold">
                          Find Opportunities
                        </p>
                        <p className="text-sm text-indigo-200">
                          Discover jobs & internships
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <i className="ri-file-user-line text-xl"></i>
                      </div>

                      <div>
                        <p className="font-semibold">
                          Build Your Profile
                        </p>
                        <p className="text-sm text-indigo-200">
                          Showcase your skills & projects
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <i className="ri-rocket-line text-xl"></i>
                      </div>

                      <div>
                        <p className="font-semibold">
                          Grow Your Career
                        </p>
                        <p className="text-sm text-indigo-200">
                          Connect with great companies
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* ==================================
                  RIGHT SIDE
              ================================== */}
              <div className="p-7 sm:p-10 md:p-12">

                {/* Header */}
                <div className="mb-8">

                  <div className="md:hidden w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-5">
                    <i className="ri-graduation-cap-line text-2xl text-indigo-600"></i>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900">
                    Welcome Back 👋
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Sign in to continue to your account
                  </p>
                </div>

                {/* FORM */}
                <form
                  onSubmit={submitHandler}
                  className="space-y-5"
                >

                  {/* EMAIL */}
                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>

                    <div className="relative">

                      <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                      <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className="
                          w-full
                          h-12
                          pl-11
                          pr-4
                          rounded-xl
                          border border-gray-200
                          bg-gray-50
                          text-gray-900
                          placeholder-gray-400
                          outline-none
                          transition
                          focus:bg-white
                          focus:border-indigo-500
                          focus:ring-4
                          focus:ring-indigo-100
                        "
                      />

                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>

                    <div className="flex items-center justify-between mb-2">

                      <label className="block text-sm font-semibold text-gray-700">
                        Password
                      </label>

                      <Link
                        to="/send-mail"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        Forgot password?
                      </Link>

                    </div>

                    <div className="relative">

                      <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>

                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="current-password"
                        className="
                          w-full
                          h-12
                          pl-11
                          pr-12
                          rounded-xl
                          border border-gray-200
                          bg-gray-50
                          text-gray-900
                          placeholder-gray-400
                          outline-none
                          transition
                          focus:bg-white
                          focus:border-indigo-500
                          focus:ring-4
                          focus:ring-indigo-100
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => !prev)
                        }
                        className="
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          text-gray-400
                          hover:text-gray-600
                        "
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
                  </div>

                  {/* LOGIN BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full
                      h-12
                      rounded-xl
                      bg-indigo-600
                      hover:bg-indigo-700
                      active:scale-[0.99]
                      text-white
                      font-semibold
                      transition
                      shadow-lg
                      shadow-indigo-200
                      disabled:bg-indigo-300
                      disabled:cursor-not-allowed
                      disabled:shadow-none
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >

                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                        Logging in...
                      </>
                    ) : (
                      <>
                        Login
                        <i className="ri-arrow-right-line text-lg"></i>
                      </>
                    )}

                  </button>

                </form>

                {/* DIVIDER */}
                <div className="flex items-center gap-4 my-7">

                  <div className="h-px bg-gray-200 flex-1"></div>

                  <span className="text-sm text-gray-400">
                    New here?
                  </span>

                  <div className="h-px bg-gray-200 flex-1"></div>

                </div>

                {/* SIGN UP */}
                <Link
                  to="/signup"
                  className="
                    w-full
                    h-12
                    rounded-xl
                    border-2
                    border-gray-200
                    hover:border-indigo-500
                    hover:bg-indigo-50
                    text-gray-700
                    hover:text-indigo-600
                    font-semibold
                    transition
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  Create an Account
                  <i className="ri-user-add-line"></i>
                </Link>

                {/* FOOTER */}
                <p className="text-xs text-gray-400 text-center mt-7">
                  By continuing, you agree to our Terms &
                  Privacy Policy.
                </p>

              </div>

            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Signin;