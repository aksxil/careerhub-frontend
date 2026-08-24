import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncsignup } from "../../store/userActions";
import Navbar from "../Navbar";

const Signup = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    email: "",
    city: "",
    gender: "",
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
    await dispatch(asyncsignup(formData));
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/student/dashboard");
    }
  }, [user.isAuthenticated, navigate]);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      {/* MAIN */}
      <div className="h-[calc(100vh-64px)] flex items-center justify-center px-4">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-100 px-8 py-6">

          {/* HEADER */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white mb-2 shadow-md">
              <i className="ri-user-add-line text-2xl"></i>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Create Student Account
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Start your journey with{" "}
              <span className="font-semibold text-indigo-600">
                CareerHub
              </span>
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={submitHandler} className="space-y-3">

            {/* NAME */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* FIRST NAME */}
              <div className="relative">
                <i className="ri-user-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>

                <input
                  className="input pl-10"
                  name="firstname"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* LAST NAME */}
              <div className="relative">
                <i className="ri-user-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>

                <input
                  className="input pl-10"
                  name="lastname"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* CONTACT + EMAIL */}
            <div className="grid grid-cols-2 gap-4">

              {/* CONTACT */}
              <div className="relative">
                <i className="ri-phone-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>

                <input
                  className="input pl-10"
                  name="contact"
                  type="tel"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="relative">
                <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>

                <input
                  className="input pl-10"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* CITY + PASSWORD */}
            <div className="grid grid-cols-2 gap-4">

              {/* CITY */}
              <div className="relative">
                <i className="ri-map-pin-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>

                <input
                  className="input pl-10"
                  name="city"
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <i className="ri-lock-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>

                <input
                  className="input pl-10"
                  name="password"
                  type="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* GENDER */}
            <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">

              <span className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <i className="ri-genderless-line text-indigo-600 text-lg"></i>
                Gender
              </span>

              <div className="flex gap-6">

                {["Male", "Female", "Other"].map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-2 cursor-pointer text-sm text-gray-600"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      required
                      className="accent-indigo-600 w-4 h-4"
                    />

                    <span>{g}</span>
                  </label>
                ))}

              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white py-2.5 rounded-xl font-semibold transition duration-200 shadow-md shadow-indigo-200"
            >
              <span className="flex items-center justify-center gap-2">
                Create Account
                <i className="ri-arrow-right-line"></i>
              </span>
            </button>

            {/* FOOTER */}
            <p className="text-center text-gray-500 text-sm pt-1">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>

          </form>
        </div>
      </div>

      {/* INPUT STYLES */}
      <style>{`
        .input {
          width: 100%;
          height: 44px;
          padding: 0 14px;
          border-radius: 11px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          outline: none;
          font-size: 14px;
          color: #374151;
          transition: all 0.2s ease;
        }

        .input::placeholder {
          color: #9ca3af;
        }

        .input:hover {
          border-color: #c7d2fe;
        }

        .input:focus {
          border-color: #6366f1;
          background: white;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.10);
        }

        @media (max-width: 640px) {
          .input {
            height: 42px;
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;