import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "remixicon/fonts/remixicon.css";

import {
  asyncloaduser,
  asyncloademploye,
} from "./store/userActions";

// ================= AUTH =================
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Employesignin from "./components/auth/Employesignin";
import Employesignup from "./components/auth/Employesignup";
import Student from "./components/auth/Student";
import Employedash from "./components/auth/Employedash";

// ================= STUDENT =================
import Myresume from "./components/pages/Myresume";
import JobDetailsPage from "./components/studentdash/JobDetailsPage";
import InternDetailsPage from "./components/studentdash/InternDetailsPage";
import MyApplications from "./components/studentdash/MyApplications";
import SavedItemsPage from "./components/studentdash/Saved";
import ChangePasswordForm from "./components/studentdash/ChangePass";
import EmailSend from "./components/studentdash/EmailSend";
import ResetPasswordPage from "./components/studentdash/ResetPassword";

// ================= EMPLOYER =================
import UpdateEmploye from "./components/UpdateEmploye";
import ViewJob from "./components/Employedash/ViewJob";
import ViewInternship from "./components/Employedash/ViewInternship";
import ViewJobApplicant from "./components/Employedash/ViewJobApplicant";
import ChangePasswordEm from "./components/Employedash/ChangeEmPass";
import EmEmailSend from "./components/Employedash/EmEmailSend";
import ResetPasswordPageEm from "./components/Employedash/ResetPassEm";

// ================= COMMON =================
import Home from "./components/Home";

const App = () => {
  const dispatch = useDispatch();

  const {
    isAuthenticated,
    user,
    loading,
  } = useSelector((state) => state.user);

  // ================= LOAD AUTH =================
  useEffect(() => {
    dispatch(asyncloaduser());
    dispatch(asyncloademploye());
  }, [dispatch]);

  // ================= GLOBAL LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-600 font-medium">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // ================= STUDENT PROTECTION =================
  const studentRoute = (element) => {
    return isAuthenticated && user ? element : <Signin />;
  };

  // ================= EMPLOYER PROTECTION =================
  const employerRoute = (element) => {
    return isAuthenticated && user ? element : <Employesignin />;
  };

  return (
    <div className="w-full min-h-screen bg-zinc-50 text-black">

      {/* ================= TOAST ================= */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <Routes>

        {/* ================================================= */}
        {/*                       PUBLIC                      */}
        {/* ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/signup"
          element={
            isAuthenticated
              ? <Navigate to="/student/dashboard" replace />
              : <Signup />
          }
        />

        <Route
          path="/signin"
          element={
            isAuthenticated
              ? <Navigate to="/student/dashboard" replace />
              : <Signin />
          }
        />

        <Route
          path="/send-mail"
          element={<EmailSend />}
        />

        <Route
          path="/student/forget-link/:id"
          element={<ResetPasswordPage />}
        />

        {/* ================================================= */}
        {/*                  EMPLOYER AUTH                    */}
        {/* ================================================= */}

        <Route
          path="/employe/signup"
          element={<Employesignup />}
        />

        <Route
          path="/employe/signin"
          element={<Employesignin />}
        />

        <Route
          path="/employe/send-mail"
          element={<EmEmailSend />}
        />

        <Route
          path="/employe/forget-link/:id"
          element={<ResetPasswordPageEm />}
        />

        {/* ================================================= */}
        {/*                 STUDENT DASHBOARD                 */}
        {/* ================================================= */}

        <Route
          path="/student/dashboard"
          element={studentRoute(<Student />)}
        />

        <Route
          path="/resume"
          element={studentRoute(<Myresume />)}
        />

        <Route
          path="/myapplications"
          element={studentRoute(<MyApplications />)}
        />

        <Route
          path="/saved"
          element={studentRoute(<SavedItemsPage />)}
        />

        <Route
          path="/change-password"
          element={studentRoute(<ChangePasswordForm />)}
        />

        {/* ================================================= */}
        {/*                  EMPLOYER DASHBOARD                */}
        {/* ================================================= */}

        <Route
          path="/employe/dashboard"
          element={employerRoute(<Employedash />)}
        />

        <Route
          path="/update-employe"
          element={employerRoute(<UpdateEmploye />)}
        />

        <Route
          path="/employe-changepassword"
          element={employerRoute(<ChangePasswordEm />)}
        />

        {/* ================================================= */}
        {/*                 JOB / INTERNSHIP                  */}
        {/* ================================================= */}

        {/* Student can view job */}
        <Route
          path="/jobs/:jobId"
          element={<JobDetailsPage />}
        />

        {/* Student can view internship */}
        <Route
          path="/internships/:internshipId"
          element={<InternDetailsPage />}
        />

        {/* Employer can view/edit job */}
        <Route
          path="/view-job/:jobId"
          element={employerRoute(<ViewJob />)}
        />

        {/* Employer can view/edit internship */}
        <Route
          path="/view-internship/:internshipId"
          element={employerRoute(<ViewInternship />)}
        />

        {/* Employer can view applicant */}
        <Route
          path="/viewJobApplicant/:studentId"
          element={employerRoute(<ViewJobApplicant />)}
        />

        {/* ================================================= */}
        {/*                   404 FALLBACK                    */}
        {/* ================================================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </div>
  );
};

export default App;