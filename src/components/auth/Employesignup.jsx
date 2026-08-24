import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
import { asyncempsignup } from "../../store/userActions";

const Employesignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    organizationname: "",
    contact: "",
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

    const res = await dispatch(asyncempsignup(formData));

    if (res?.error) {
      toast.error(res.error.message || "Signup failed");
    } else {
      toast.success("Employer account created successfully");
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
        <div className="w-full max-w-xl">

          {/* CARD */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-indigo-100/40 px-7 py-6 sm:px-9">

            {/* HEADER */}
            <div className="text-center mb-5">
              <div className="mx-auto mb-3 w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
                <i className="ri-building-4-line text-white text-xl"></i>
              </div>

              <h1 className="text-2xl font-bold text-gray-800">
                Create Employer Account
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Join CareerHub and start hiring talented candidates
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={submitHandler}
              className="space-y-3.5"
            >

              {/* FIRST + LAST NAME */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <i className="ri-user-line input-icon"></i>

                  <input
                    name="firstname"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>

                <div className="relative">
                  <i className="ri-user-line input-icon"></i>

                  <input
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>
              </div>

              {/* ORGANIZATION */}
              <div className="relative">
                <i className="ri-building-line input-icon"></i>

                <input
                  name="organizationname"
                  type="text"
                  placeholder="Organization Name"
                  value={formData.organizationname}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>

              {/* CONTACT */}
              <div className="relative">
                <i className="ri-phone-line input-icon"></i>

                <input
                  name="contact"
                  type="tel"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>

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
                  className="input"
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <i className="ri-lock-line input-icon"></i>

                <input
                  name="password"
                  type="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="input"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 mt-1 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white rounded-xl font-semibold transition-all duration-200 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <i className="ri-user-add-line"></i>
                    Create Account
                  </>
                )}
              </button>

              {/* LOGIN */}
              <p className="text-sm text-center text-gray-500 pt-1">
                Already have an account?{" "}
                <Link
                  to="/employe/signin"
                  className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>

            {/* FOOTER */}
            <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
              <i className="ri-shield-check-line"></i>
              Your information is safe and secure
            </div>
          </div>
        </div>
      </main>

      {/* INPUT STYLES */}
      <style>{`
        .input {
          width: 100%;
          height: 43px;
          padding: 0 14px 0 42px;
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

        .input:focus + .input-icon {
          color: #6366f1;
        }

        @media (max-height: 700px) {
          .input {
            height: 39px;
          }
        }
      `}</style>
    </div>
  );
};

export default Employesignup;