import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncempsignin } from "../../store/userActions";
import { toast } from "react-toastify";
import Navbar from "../Navbar";

const Employesignin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await dispatch(asyncempsignin(formData));

    if (res?.error) {
      toast.error(res.error.message || "Invalid email or password");
    } else {
      toast.success("Employer login successful");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/employe/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 overflow-hidden">
      <Navbar />

      {/* MAIN */}
      <main className="h-[calc(100vh-64px)] flex items-center justify-center px-4">
        <div className="w-full max-w-md">

          {/* LOGIN CARD */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-indigo-100/40 px-7 py-7 sm:px-9">

            {/* HEADER */}
            <div className="text-center mb-6">

              <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
                <i className="ri-building-4-line text-white text-xl"></i>
              </div>

              <h1 className="text-2xl font-bold text-gray-800">
                Employer Login
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Welcome back! Sign in to manage your hiring
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={submitHandler}
              className="space-y-4"
            >

              {/* EMAIL */}
              <div className="relative">
                <i className="ri-mail-line input-icon"></i>

                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="input"
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <i className="ri-lock-line input-icon"></i>

                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="input"
                />
              </div>

              {/* FORGOT PASSWORD */}
              <div className="flex justify-end -mt-1">
                <Link
                  to="/employe/send-mail"
                  className="text-sm text-indigo-600 font-medium hover:text-indigo-700 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white rounded-xl font-semibold transition-all duration-200 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Logging in...
                  </>
                ) : (
                  <>
                    <i className="ri-login-box-line"></i>
                    Login
                  </>
                )}
              </button>

              {/* SIGNUP */}
              <p className="text-sm text-center text-gray-500 pt-1">
                Don’t have an account?{" "}
                <Link
                  to="/employe/signup"
                  className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>

            {/* SECURITY FOOTER */}
            <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-gray-400">
              <i className="ri-shield-check-line"></i>
              Your account is protected and secure
            </div>
          </div>
        </div>
      </main>

      {/* INPUT STYLES */}
      <style>{`
        .input {
          width: 100%;
          height: 44px;
          padding: 0 14px 0 43px;
          border-radius: 11px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          color: #1f2937;
          font-size: 14px;
          outline: none;
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
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.10);
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 17px;
          pointer-events: none;
          z-index: 1;
        }

        .input:focus ~ .input-icon {
          color: #6366f1;
        }

        @media (max-height: 700px) {
          .input {
            height: 40px;
          }

          .input-icon {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Employesignin;