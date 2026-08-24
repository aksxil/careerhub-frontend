import axios from "../axios";

import {
  loaduser,
  signout,
  loadJobDetails,
  loadInternshipDetails,
  loadRandomInternships,
  loadRandomJobs,
  loadStudentDetails,
  setJobDetails,
  setLoading,
  setError,
  clearError,
  fetchSavedJobsSuccess,
  fetchSavedInternshipsSuccess,
  removeSavedItem,
} from "./userSlice";

import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from "./forgotSlice";

/* =========================================================
   HELPERS
========================================================= */

const getErrorMessage = (error, fallback = "Something went wrong") => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

/* =========================================================
   AUTH - LOAD USER
========================================================= */

const loadUserDetails = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/student", {
      withCredentials: true,
    });

    dispatch(loaduser(data.student));
    dispatch(clearError());
    return data.student;
  } catch (error) {
    dispatch(setError(getErrorMessage(error, "Student not logged in")));
    return null;
  }
};

const loadEmployeDetails = () => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "/employe/current",
      {},
      {
        withCredentials: true,
      }
    );

    dispatch(loaduser(data.employe));
    dispatch(clearError());

    return data.employe;
  } catch (error) {
    dispatch(
      setError(getErrorMessage(error, "Employer not logged in"))
    );
    return null;
  }
};

/* =========================================================
   STUDENT AUTH
========================================================= */

export const asyncsignup = (newuser) => async (dispatch) => {
  try {
    await axios.post("/student/signup", newuser, {
      withCredentials: true,
    });

    await dispatch(asyncloaduser());

    return true;
  } catch (error) {
    dispatch(setError(getErrorMessage(error, "Signup failed")));
    throw error;
  }
};

export const asyncsignin = (formData) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    await axios.post("/student/signin", formData, {
      withCredentials: true,
    });

    await dispatch(asyncloaduser());

    dispatch(setLoading(false));
    dispatch(clearError());

    return true;
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(
      setError(getErrorMessage(error, "Invalid email or password"))
    );

    throw error;
  }
};

export const asyncsignout = () => async (dispatch) => {
  try {
    await axios.get("/student/signout", {
      withCredentials: true,
    });

    dispatch(signout());
    dispatch(clearError());

    return true;
  } catch (error) {
    dispatch(setError(getErrorMessage(error, "Logout failed")));
    throw error;
  }
};

export const asyncloaduser = () => async (dispatch) => {
  return await dispatch(loadUserDetails());
};

/* =========================================================
   EMPLOYER AUTH
========================================================= */

export const asyncempsignup = (newuser) => async (dispatch) => {
  try {
    await axios.post("/employe/signup", newuser, {
      withCredentials: true,
    });

    await dispatch(asyncloademploye());

    return true;
  } catch (error) {
    dispatch(setError(getErrorMessage(error, "Employer signup failed")));
    throw error;
  }
};

export const asyncempsignin = (formData) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    await axios.post("/employe/signin", formData, {
      withCredentials: true,
    });

    await dispatch(asyncloademploye());

    dispatch(setLoading(false));
    dispatch(clearError());

    return true;
  } catch (error) {
    dispatch(setLoading(false));

    const message = getErrorMessage(
      error,
      "Invalid email or password"
    );

    dispatch(setError(message));

    throw error;
  }
};

export const asyncloademploye = () => async (dispatch) => {
  return await dispatch(loadEmployeDetails());
};

/* =========================================================
   UPDATE USER / EMPLOYER PROFILE
========================================================= */

export const updateUserDetails =
  (id, updatedUserData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/student/update/${id}`,
        updatedUserData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to update profile"))
      );

      throw error;
    }
  };

export const updateEmployeDetails =
  (id, updatedUserData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/employe/update/${id}`,
        updatedUserData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloademploye());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to update employer profile"))
      );

      throw error;
    }
  };

/* =========================================================
   AVATAR / ORGANIZATION LOGO
========================================================= */

export const uploadAvatar =
  (userId, formData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/student/avatar/${userId}`,
        formData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to upload avatar"))
      );

      throw error;
    }
  };

export const uploadOrganizationLogo =
  (userId, formData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/employe/avatar/${userId}`,
        formData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloademploye());

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(error, "Failed to upload organization logo")
        )
      );

      throw error;
    }
  };

/* =========================================================
   FORGOT PASSWORD
========================================================= */

export const getresetlink = (formData) => async () => {
  try {
    await axios.post("/send-mail", {
      email: formData.email,
    });

    return true;
  } catch (error) {
    throw error;
  }
};

/* =========================================================
   RESUME - EDUCATION
========================================================= */

export const addEducation =
  (educationData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/resume/add-edu",
        educationData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to add education"))
      );

      throw error;
    }
  };

export const deleteEducation =
  (educationId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/delete-edu/${educationId}`
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to delete education"))
      );

      throw error;
    }
  };

export const updateEducation =
  (educationData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/edit-edu/${educationData.id}`,
        educationData
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to update education"))
      );

      throw error;
    }
  };

/* =========================================================
   RESUME - INTERNSHIP
========================================================= */

export const addInternship =
  (formData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/resume/add-intern",
        formData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to add internship"))
      );

      throw error;
    }
  };

export const deleteInternship =
  (internshipId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/delete-intern/${internshipId}`
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to delete internship"))
      );

      throw error;
    }
  };

export const updateInternship =
  (id, internshipData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/edit-intern/${id}`,
        internshipData
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to update internship"))
      );

      throw error;
    }
  };

/* =========================================================
   RESUME - JOB
========================================================= */

export const addJob = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "/resume/add-job",
      formData,
      {
        withCredentials: true,
      }
    );

    await dispatch(asyncloaduser());

    return data;
  } catch (error) {
    dispatch(
      setError(getErrorMessage(error, "Failed to add job"))
    );

    throw error;
  }
};

export const deleteJob = (jobId) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `/resume/delete-job/${jobId}`
    );

    await dispatch(asyncloaduser());

    return data;
  } catch (error) {
    dispatch(
      setError(getErrorMessage(error, "Failed to delete job"))
    );

    throw error;
  }
};

export const updateJob =
  (jobId, jobData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/edit-job/${jobId}`,
        jobData
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to update job"))
      );

      throw error;
    }
  };

/* =========================================================
   RESUME - RESPONSIBILITY
========================================================= */

export const addResponsibility =
  (formData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/resume/add-resp",
        formData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(error, "Failed to add responsibility")
        )
      );

      throw error;
    }
  };

export const deleteRespo =
  (respoId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/delete-resp/${respoId}`
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(error, "Failed to delete responsibility")
        )
      );

      throw error;
    }
  };

export const updateRespo =
  (respoId, respoData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/edit-resp/${respoId}`,
        respoData
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(error, "Failed to update responsibility")
        )
      );

      throw error;
    }
  };

/* =========================================================
   RESUME - TRAINING / COURSE
========================================================= */

export const addTraining =
  (formData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/resume/add-course",
        formData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to add training"))
      );

      throw error;
    }
  };

export const deleteTraining =
  (trainingId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/delete-course/${trainingId}`
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to delete training"))
      );

      throw error;
    }
  };

export const updateTraing =
  (trainingId, trainingData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/edit-course/${trainingId}`,
        trainingData
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to update training"))
      );

      throw error;
    }
  };

/* =========================================================
   RESUME - PROJECT
========================================================= */

export const addProject =
  (formData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/resume/add-project",
        formData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to add project"))
      );

      throw error;
    }
  };

export const deleteProject =
  (projectId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/delete-project/${projectId}`
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to delete project"))
      );

      throw error;
    }
  };

export const updateProject =
  (projectId, projectData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/edit-project/${projectId}`,
        projectData
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to update project"))
      );

      throw error;
    }
  };

/* =========================================================
   RESUME - SKILL
========================================================= */

export const addSkill =
  (formData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/resume/add-skill",
        formData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to add skill"))
      );

      throw error;
    }
  };

export const deleteSkill =
  (skillId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/delete-skill/${skillId}`
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to delete skill"))
      );

      throw error;
    }
  };

export const updateSkill =
  (skillId, skillData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/edit-skill/${skillId}`,
        skillData
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to update skill"))
      );

      throw error;
    }
  };

/* =========================================================
   RESUME - PORTFOLIO
========================================================= */

export const addPortfolio =
  (formData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/resume/add-portfolio",
        formData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to add portfolio"))
      );

      throw error;
    }
  };

export const updatePortfolio =
  (portfolioData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/resume/edit-portfolio",
        portfolioData
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to update portfolio"))
      );

      throw error;
    }
  };

/* =========================================================
   RESUME - ACCOMPLISHMENT
========================================================= */

export const addAccom =
  (formData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/resume/add-accomplishment",
        formData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(error, "Failed to add accomplishment")
        )
      );

      throw error;
    }
  };

export const deleteAccom =
  (accomId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/delete-accomplishment/${accomId}`
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(error, "Failed to delete accomplishment")
        )
      );

      throw error;
    }
  };

export const updateAccom =
  (accomId, accomData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/resume/edit-accomplishment/${accomId}`,
        accomData
      );

      await dispatch(asyncloaduser());

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(error, "Failed to update accomplishment")
        )
      );

      throw error;
    }
  };

/* =========================================================
   EMPLOYER - JOB POST
========================================================= */

export const addJobPost =
  (jobData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/employe/job/create",
        jobData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloademploye());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to post job"))
      );

      throw error;
    }
  };

export const fetchJobDetails =
  (jobId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/employe/job/read/${jobId}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(
        loadJobDetails({
          jobId,
          jobDetails: data,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(error, "Failed to fetch job details")
        )
      );

      throw error;
    }
  };

export const updateJobPost =
  (jobId, jobData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/employe/job/update/${jobId}`,
        jobData,
        {
          withCredentials: true,
        }
      );

      dispatch(
        setJobDetails({
          jobId,
          jobDetails: data,
        })
      );

      await dispatch(asyncloademploye());

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to update job"))
      );

      throw error;
    }
  };

export const deleteJobPost =
  (jobId, callback) => async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/employe/job/delete/${jobId}`,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloademploye());

      if (typeof callback === "function") {
        callback();
      }

      return data;
    } catch (error) {
      dispatch(
        setError(getErrorMessage(error, "Failed to delete job"))
      );

      throw error;
    }
  };

/* =========================================================
   EMPLOYER - INTERNSHIP POST
========================================================= */

export const addInternshipPost =
  (internshipData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/employe/internship/create",
        internshipData,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloademploye());

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(error, "Failed to post internship")
        )
      );

      throw error;
    }
  };

export const fetchInternshipDetails =
  (internshipId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/employe/internship/read/${internshipId}`,
        {},
        {
          withCredentials: true,
        }
      );

      const internship = data?.internship || data;

      dispatch(
        loadInternshipDetails({
          internshipId,
          internshipDetails: internship,
        })
      );

      return internship;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(
            error,
            "Failed to fetch internship details"
          )
        )
      );

      throw error;
    }
  };

export const updateInternshipPost =
  (internshipId, internshipData) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/employe/internship/update/${internshipId}`,
        internshipData,
        {
          withCredentials: true,
        }
      );

      const updatedInternship =
        data?.internship || data;

      dispatch(
        loadInternshipDetails({
          internshipId,
          internshipDetails: updatedInternship,
        })
      );

      await dispatch(asyncloademploye());

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(
            error,
            "Failed to update internship"
          )
        )
      );

      throw error;
    }
  };

export const deleteInternshipPost =
  (internshipId, callback) => async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/employe/internship/delete/${internshipId}`,
        {
          withCredentials: true,
        }
      );

      await dispatch(asyncloademploye());

      if (typeof callback === "function") {
        callback();
      }

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(error, "Failed to delete internship")
        )
      );

      throw error;
    }
  };

/* =========================================================
   STUDENT - PUBLIC JOBS / INTERNSHIPS
========================================================= */

export const fetchRandomJobs = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/jobs");

    dispatch(loadRandomJobs(data));

    return data;
  } catch (error) {
    dispatch(
      setError(
        getErrorMessage(error, "Failed to fetch jobs")
      )
    );

    throw error;
  }
};

export const fetchRandomInternships =
  () => async (dispatch) => {
    try {
      const { data } = await axios.get("/internships");

      dispatch(loadRandomInternships(data));

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(
            error,
            "Failed to fetch internships"
          )
        )
      );

      throw error;
    }
  };

export const fetchJobDetailsStu =
  (jobId) => async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/jobs/${jobId}`
      );

      dispatch(
        loadJobDetails({
          jobId,
          jobDetails: data,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(
            error,
            "Failed to fetch job details"
          )
        )
      );

      throw error;
    }
  };

export const fetchInternDetailsStu =
  (internshipId) => async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/internships/${internshipId}`
      );

      dispatch(
        loadInternshipDetails({
          internshipId,
          internshipDetails: data,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(
            error,
            "Failed to fetch internship details"
          )
        )
      );

      throw error;
    }
  };

/* =========================================================
   STUDENT - APPLY
========================================================= */

const applicationSuccess = (data) => ({
  type: "user/applicationSuccess",
  payload: data,
});

const applicationFailure = (error) => ({
  type: "user/applicationFailure",
  payload: error,
});

export const applyForJob =
  (jobId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/student/apply/job/${jobId}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(applicationSuccess(data));

      return data;
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to apply for job"
      );

      dispatch(applicationFailure(message));

      throw error;
    }
  };

export const applyForInternship =
  (internshipId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/student/apply/internship/${internshipId}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(applicationSuccess(data));

      return data;
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to apply for internship"
      );

      dispatch(applicationFailure(message));

      throw error;
    }
  };

/* =========================================================
   STUDENT - MY APPLICATIONS
========================================================= */

export const fetchMyApplications =
  () => async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/myapplications",
        {},
        {
          withCredentials: true,
        }
      );

      const jobs = data?.jobs || [];
      const internships = data?.internships || [];

      jobs.forEach((job) => {
        dispatch(
          loadJobDetails({
            jobId: job._id,
            jobDetails: job,
          })
        );
      });

      internships.forEach((internship) => {
        dispatch(
          loadInternshipDetails({
            internshipId: internship._id,
            internshipDetails: internship,
          })
        );
      });

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(
            error,
            "Failed to fetch applications"
          )
        )
      );

      throw error;
    }
  };

/* =========================================================
   EMPLOYER - STUDENT DETAILS
========================================================= */

export const fetchStudentDetails =
  (studentId) => async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/employe/student-details/${studentId}`,
        {
          withCredentials: true,
        }
      );

      if (data?.message === "Student not found") {
        return null;
      }

      dispatch(
        loadStudentDetails({
          studentId,
          studentDetails: data,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(
            error,
            "Failed to fetch student details"
          )
        )
      );

      throw error;
    }
  };

/* =========================================================
   EMPLOYER - SHORTLIST STUDENT
========================================================= */

export const addShortlistedStudent =
  (jobId, studentId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/employe/jobs/${jobId}/addShortlisted/${studentId}`,
        {},
        {
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(
            error,
            "Failed to shortlist student"
          )
        )
      );

      throw error;
    }
  };

export const addShortlistedStudentInternship =
  (internshipId, studentId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/employe/internships/${internshipId}/addShortlisted/${studentId}`,
        {},
        {
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(
            error,
            "Failed to shortlist student"
          )
        )
      );

      throw error;
    }
  };

/* =========================================================
   SAVE JOB / INTERNSHIP
========================================================= */

export const SAVE_JOB_INTERNSHIP_REQUEST =
  "SAVE_JOB_INTERNSHIP_REQUEST";

export const SAVE_JOB_INTERNSHIP_SUCCESS =
  "SAVE_JOB_INTERNSHIP_SUCCESS";

export const SAVE_JOB_INTERNSHIP_FAILURE =
  "SAVE_JOB_INTERNSHIP_FAILURE";

export const saveJobInternshipRequest = () => ({
  type: SAVE_JOB_INTERNSHIP_REQUEST,
});

export const saveJobInternshipSuccess = () => ({
  type: SAVE_JOB_INTERNSHIP_SUCCESS,
});

export const saveJobInternshipFailure = (error) => ({
  type: SAVE_JOB_INTERNSHIP_FAILURE,
  payload: error,
});

export const saveJobInternship =
  (studentId, itemId, itemType) => async (dispatch) => {
    dispatch(saveJobInternshipRequest());

    try {
      const { data } = await axios.post(
        "/student/save",
        {
          studentId,
          itemId,
          itemType,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(saveJobInternshipSuccess());

      return data;
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to save item"
      );

      dispatch(saveJobInternshipFailure(message));

      throw error;
    }
  };

export const fetchSavedJobsAndInternships =
  (studentId) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await axios.get(
        `/student/${studentId}/saved`,
        {
          withCredentials: true,
        }
      );

      if (!Array.isArray(data)) {
        throw new Error(
          "Invalid saved items response"
        );
      }

      const savedJobs = data.filter(
        (item) => item.type === "job"
      );

      const savedInternships = data.filter(
        (item) => item.type === "internship"
      );

      dispatch(fetchSavedJobsSuccess(savedJobs));
      dispatch(
        fetchSavedInternshipsSuccess(savedInternships)
      );

      dispatch(setLoading(false));

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(
            error,
            "Failed to fetch saved items"
          )
        )
      );

      dispatch(setLoading(false));

      throw error;
    }
  };

export const removeSavedItemAsync =
  (userId, itemType, itemId) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/remove/${userId}/${itemType}/${itemId}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(
        removeSavedItem({
          itemType,
          itemId,
          userId,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        setError(
          getErrorMessage(
            error,
            "Failed to remove saved item"
          )
        )
      );

      throw error;
    }
  };

/* =========================================================
   PASSWORD RESET
========================================================= */

const RESET_PASSWORD_REQUEST =
  "RESET_PASSWORD_REQUEST";

const RESET_PASSWORD_SUCCESS =
  "RESET_PASSWORD_SUCCESS";

const RESET_PASSWORD_FAILURE =
  "RESET_PASSWORD_FAILURE";

const resetPasswordRequest = () => ({
  type: RESET_PASSWORD_REQUEST,
});

const resetPasswordSuccess = (message) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: message,
});

const resetPasswordFailure = (error) => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error,
});

export const studentResetPassword =
  (studentId, password) => async (dispatch) => {
    dispatch(resetPasswordRequest());

    try {
      const { data } = await axios.post(
        `/student/reset-password/${studentId}`,
        { password },
        {
          withCredentials: true,
        }
      );

      dispatch(
        resetPasswordSuccess(data.message)
      );

      return data;
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to reset password"
      );

      dispatch(resetPasswordFailure(message));

      throw error;
    }
  };

export const employeResetPassword =
  (employeId, password) => async (dispatch) => {
    dispatch(resetPasswordRequest());

    try {
      const { data } = await axios.post(
        `/employe/reset-password/${employeId}`,
        { password },
        {
          withCredentials: true,
        }
      );

      dispatch(
        resetPasswordSuccess(data.message)
      );

      return data;
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to reset password"
      );

      dispatch(resetPasswordFailure(message));

      throw error;
    }
  };

/* =========================================================
   FORGOT PASSWORD - STUDENT
========================================================= */

export const sendForgotPasswordLink =
  (email) => async (dispatch) => {
    dispatch(forgotPasswordRequest());

    try {
      const { data } = await axios.post(
        "/student/send-mail",
        { email }
      );

      dispatch(forgotPasswordSuccess());

      return data;
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to send reset link"
      );

      dispatch(
        forgotPasswordFailure(message)
      );

      throw error;
    }
  };

/* =========================================================
   FORGOT PASSWORD - EMPLOYER
========================================================= */

export const sendForgotPasswordLinkEm =
  (email) => async (dispatch) => {
    dispatch(forgotPasswordRequest());

    try {
      const { data } = await axios.post(
        "/employe/send-mail",
        { email }
      );

      dispatch(forgotPasswordSuccess());

      return data;
    } catch (error) {
      const message = getErrorMessage(
        error,
        "Failed to send reset link"
      );

      dispatch(
        forgotPasswordFailure(message)
      );

      throw error;
    }
  };