import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";

import {
  asyncloaduser,
  deleteEducation,
  deleteInternship,
  deleteJob,
  deleteProject,
  deleteRespo,
  deleteSkill,
  deleteTraining,
  deleteAccom,
} from "../../store/userActions";

import UpdateForm from "../UpdateForm";
import AddEducationForm from "./AddEducationForm";
import EditGrad from "./EditGrad";
import AddInternship from "./AddInternship";
import AddJob from "./AddJob";
import EditJob from "./EditJob";
import EditInternship from "./EditInternship";
import AddRespo from "./AddRespo";
import EditRespo from "./EditRespo";
import AddTraining from "./AddTraining";
import EditTraining from "./EditTraining";
import AddProject from "./AddProject";
import EditProject from "./EditProject";
import AddSkills from "./AddSkills";
import EditSkills from "./EditSkills";
import AddPortfolio from "./AddPortfolio";
import EditPortfolio from "./EditPortfolio";
import AddAcom from "./AddAcom";
import EditAcom from "./EditAcom";

const MyResume = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const resume = user?.user?.resume || {};

  const education = resume.education || [];
  const jobs = resume.jobs || [];
  const internships = resume.internships || [];
  const responsibilities = resume.responsibilities || [];
  const courses = resume.courses || [];
  const projects = resume.projects || [];
  const skills = resume.skills || [];
  const portfolio = resume.portfolio;
  const accomplishments = resume.accomplishments || [];

  /* -------------------------------------------------------
     EDIT STATES
  ------------------------------------------------------- */

  const [editIndex, setEditIndex] = useState(null);
  const [editJobIndex, setEditJobIndex] = useState(null);
  const [editInternshipIndex, setEditInternshipIndex] = useState(null);
  const [editRespoIndex, setEditRespoIndex] = useState(null);
  const [editTrainingIndex, setEditTrainingIndex] = useState(null);
  const [editProjectIndex, setEditProjectIndex] = useState(null);
  const [editSkillIndex, setEditSkillIndex] = useState(null);
  const [editPortfolioIndex, setEditPortfolioIndex] = useState(null);
  const [editAccomIndex, setEditAccomIndex] = useState(null);

  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [selectedRespo, setSelectedRespo] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [selectedAccom, setSelectedAccom] = useState(null);

  /* -------------------------------------------------------
     ADD FORM STATES
  ------------------------------------------------------- */

  const [isFormVisible, setFormVisible] = useState(false);
  const [isAddEducationFormVisible, setAddEducationFormVisible] =
    useState(false);
  const [isAddJobFormVisible, setAddJobFormVisible] = useState(false);
  const [isAddInternshipFormVisible, setAddInternshipFormVisible] =
    useState(false);
  const [isAddRespoVisible, setAddRespoVisible] = useState(false);
  const [isAddTrainingVisible, setAddTrainingVisible] = useState(false);
  const [isAddProjectVisible, setAddProjectVisible] = useState(false);
  const [isAddSkillVisible, setAddSkillVisible] = useState(false);
  const [isAddPortfolioVisible, setAddPortfolioVisible] = useState(false);
  const [isAddAccomVisible, setAddAccomVisible] = useState(false);

  /* -------------------------------------------------------
     LOAD USER
  ------------------------------------------------------- */

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        await dispatch(asyncloaduser());
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  /* -------------------------------------------------------
     FORM TOGGLES
  ------------------------------------------------------- */

  const toggleFormVisibility = () => {
    setFormVisible((prev) => !prev);
  };

  const toggleAddEducationFormVisibility = () => {
    setAddEducationFormVisible((prev) => !prev);
  };

  const toggleAddJobFormVisibility = () => {
    setAddJobFormVisible((prev) => !prev);
  };

  const toggleAddInternshipFormVisibility = () => {
    setAddInternshipFormVisible((prev) => !prev);
  };

  const toggleAddRespoVisibility = () => {
    setAddRespoVisible((prev) => !prev);
  };

  const toggleAddTrainingVisibility = () => {
    setAddTrainingVisible((prev) => !prev);
  };

  const toggleAddProjectVisibility = () => {
    setAddProjectVisible((prev) => !prev);
  };

  const toggleAddSkillVisibility = () => {
    setAddSkillVisible((prev) => !prev);
  };

  const toggleAddPortfolioVisibility = () => {
    setAddPortfolioVisible((prev) => !prev);
  };

  const toggleAddAccomVisibility = () => {
    setAddAccomVisible((prev) => !prev);
  };

  /* -------------------------------------------------------
     DELETE HANDLERS
  ------------------------------------------------------- */

  const confirmAndDelete = async ({
    message,
    action,
    id,
    successMessage,
  }) => {
    const confirmed = window.confirm(message);

    if (!confirmed) return;

    try {
      await dispatch(action(id));
      toast.success(successMessage);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = (id) =>
    confirmAndDelete({
      message: "Are you sure you want to delete this education?",
      action: deleteEducation,
      id,
      successMessage: "Education deleted successfully",
    });

  const handleDeleteJob = (id) =>
    confirmAndDelete({
      message: "Are you sure you want to delete this job?",
      action: deleteJob,
      id,
      successMessage: "Job deleted successfully",
    });

  const handleDeleteInternship = (id) =>
    confirmAndDelete({
      message: "Are you sure you want to delete this internship?",
      action: deleteInternship,
      id,
      successMessage: "Internship deleted successfully",
    });

  const handleDeleteRespo = (id) =>
    confirmAndDelete({
      message: "Are you sure you want to delete this responsibility?",
      action: deleteRespo,
      id,
      successMessage: "Responsibility deleted successfully",
    });

  const handleDeleteTraining = (id) =>
    confirmAndDelete({
      message: "Are you sure you want to delete this training/course?",
      action: deleteTraining,
      id,
      successMessage: "Training deleted successfully",
    });

  const handleDeleteProject = (id) =>
    confirmAndDelete({
      message: "Are you sure you want to delete this project?",
      action: deleteProject,
      id,
      successMessage: "Project deleted successfully",
    });

  const handleDeleteSkill = (id) =>
    confirmAndDelete({
      message: "Are you sure you want to delete this skill?",
      action: deleteSkill,
      id,
      successMessage: "Skill deleted successfully",
    });

  const handleDeleteAccom = (id) =>
    confirmAndDelete({
      message: "Are you sure you want to delete this accomplishment?",
      action: deleteAccom,
      id,
      successMessage: "Accomplishment deleted successfully",
    });

  /* -------------------------------------------------------
     EDIT HANDLERS
  ------------------------------------------------------- */

  const handleEdit = (item, index) => {
    setEditIndex(index);
    setSelectedEducation(item);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setSelectedEducation(null);
  };

  const handleEditJob = (item, index) => {
    setEditJobIndex(index);
    setSelectedJob(item);
  };

  const handleCancelJob = () => {
    setEditJobIndex(null);
    setSelectedJob(null);
  };

  const handleEditInternship = (item, index) => {
    setEditInternshipIndex(index);
    setSelectedInternship(item);
  };

  const handleCancelInternship = () => {
    setEditInternshipIndex(null);
    setSelectedInternship(null);
  };

  const handleEditRespo = (item, index) => {
    setEditRespoIndex(index);
    setSelectedRespo(item);
  };

  const handleCancelRespo = () => {
    setEditRespoIndex(null);
    setSelectedRespo(null);
  };

  const handleEditTraining = (item, index) => {
    setEditTrainingIndex(index);
    setSelectedTraining(item);
  };

  const handleCancelTraining = () => {
    setEditTrainingIndex(null);
    setSelectedTraining(null);
  };

  const handleEditProject = (item, index) => {
    setEditProjectIndex(index);
    setSelectedProject(item);
  };

  const handleCancelProject = () => {
    setEditProjectIndex(null);
    setSelectedProject(null);
  };

  const handleEditSkill = (item, index) => {
    setEditSkillIndex(index);
    setSelectedSkill(item);
  };

  const handleCancelSkill = () => {
    setEditSkillIndex(null);
    setSelectedSkill(null);
  };

  const handleEditPortfolio = (item, index) => {
    setEditPortfolioIndex(index);
    setSelectedPortfolio(item);
  };

  const handleCancelEditPortfolio = () => {
    setEditPortfolioIndex(null);
    setSelectedPortfolio(null);
  };

  const handleEditAccom = (item, index) => {
    setEditAccomIndex(index);
    setSelectedAccom(item);
  };

  const handleCancelAccom = () => {
    setEditAccomIndex(null);
    setSelectedAccom(null);
  };

  /* -------------------------------------------------------
     HELPERS
  ------------------------------------------------------- */

  const firstName = user?.user?.firstname || "Your";
  const lastName = user?.user?.lastname || "Name";
  const fullName = `${firstName} ${lastName}`;

  const profileFields = [
    user?.user?.email,
    user?.user?.contact,
    user?.user?.city,
  ].filter(Boolean);

  const totalSections = 8;

  const completedSections = [
    education.length > 0,
    jobs.length > 0 || internships.length > 0,
    responsibilities.length > 0,
    courses.length > 0,
    projects.length > 0,
    skills.length > 0,
    !!portfolio,
    accomplishments.length > 0,
  ].filter(Boolean).length;

  const completionPercentage = Math.round(
    (completedSections / totalSections) * 100
  );

  /* -------------------------------------------------------
     LOADING
  ------------------------------------------------------- */

  if (!user?.user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="min-h-[70vh] flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-100 flex items-center justify-center animate-pulse">
              <i className="ri-file-user-line text-3xl text-indigo-600"></i>
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-800">
              Loading your resume...
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Please wait while we prepare your profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-white/15 border border-white/25 backdrop-blur-md flex items-center justify-center shadow-2xl">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  {firstName.charAt(0).toUpperCase()}
                  {lastName.charAt(0).toUpperCase()}
                </span>
              </div>

              <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold">
                    CareerHub Resume
                  </span>

                  <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/20 text-xs font-semibold text-emerald-100">
                    <i className="ri-checkbox-circle-line mr-1" />
                    Profile Active
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  {fullName}
                </h1>

                <p className="mt-2 text-indigo-100 max-w-xl text-sm sm:text-base">
                  Build a strong professional profile and showcase your
                  experience, skills and achievements.
                </p>
              </div>
            </div>

            <button
              onClick={toggleFormVisibility}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-indigo-700 font-bold shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
            >
              <i className="ri-pencil-line text-lg" />
              Edit Personal Profile
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS / COMPLETION
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Profile
                </p>
                <h3 className="text-2xl font-black mt-1 text-slate-800">
                  {completionPercentage}%
                </h3>
              </div>

              <div className="h-11 w-11 rounded-xl bg-indigo-50 flex items-center justify-center">
                <i className="ri-bar-chart-box-line text-xl text-indigo-600" />
              </div>
            </div>

            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <StatCard
            icon="ri-graduation-cap-line"
            label="Education"
            value={education.length}
            bg="bg-blue-50"
            iconColor="text-blue-600"
          />

          <StatCard
            icon="ri-briefcase-4-line"
            label="Experience"
            value={jobs.length + internships.length}
            bg="bg-emerald-50"
            iconColor="text-emerald-600"
          />

          <StatCard
            icon="ri-code-box-line"
            label="Projects"
            value={projects.length}
            bg="bg-violet-50"
            iconColor="text-violet-600"
          />
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="max-w-7xl mx-auto px-5 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* =================================================
              LEFT SIDEBAR
          ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">
            {/* Personal Info */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <i className="ri-user-3-line text-lg text-indigo-600" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">Contact Info</h3>
                  <p className="text-xs text-slate-400">
                    Your professional details
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {profileFields.length > 0 ? (
                  <>
                    {user?.user?.email && (
                      <ContactItem
                        icon="ri-mail-line"
                        label="Email"
                        value={user.user.email}
                      />
                    )}

                    {user?.user?.contact && (
                      <ContactItem
                        icon="ri-phone-line"
                        label="Phone"
                        value={`+91 ${user.user.contact}`}
                      />
                    )}

                    {user?.user?.city && (
                      <ContactItem
                        icon="ri-map-pin-line"
                        label="Location"
                        value={user.user.city}
                      />
                    )}
                  </>
                ) : (
                  <p className="text-sm text-slate-400">
                    Add your contact details.
                  </p>
                )}
              </div>
            </div>

            {/* Resume Overview */}
            <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <i className="ri-file-list-3-line text-lg" />
                </div>

                <div>
                  <h3 className="font-bold">Resume Overview</h3>
                  <p className="text-xs text-slate-400">
                    {completedSections} of {totalSections} sections completed
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <OverviewRow label="Education" done={education.length > 0} />
                <OverviewRow
                  label="Experience"
                  done={jobs.length > 0 || internships.length > 0}
                />
                <OverviewRow
                  label="Projects"
                  done={projects.length > 0}
                />
                <OverviewRow label="Skills" done={skills.length > 0} />
                <OverviewRow label="Portfolio" done={!!portfolio} />
              </div>
            </div>

            {/* Tip */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
              <div className="flex items-start gap-3">
                <i className="ri-lightbulb-flash-line text-xl text-indigo-600 mt-0.5" />

                <div>
                  <h3 className="font-bold text-indigo-900">
                    Resume Tip
                  </h3>

                  <p className="text-sm text-indigo-700 mt-1 leading-relaxed">
                    Keep your projects, skills and experience updated to
                    increase your chances of getting noticed by recruiters.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* =================================================
              RESUME SECTIONS
          ================================================= */}

          <div className="space-y-5">
            {/* =================================================
                EDUCATION
            ================================================= */}

            <ResumeSection
              icon="ri-graduation-cap-line"
              title="Education"
              subtitle="Your academic background"
              count={education.length}
              onAdd={toggleAddEducationFormVisibility}
            >
              {education.length === 0 ? (
                <EmptyState
                  icon="ri-graduation-cap-line"
                  text="No education added yet."
                  buttonText="Add Education"
                  onClick={toggleAddEducationFormVisibility}
                />
              ) : (
                <div className="space-y-4">
                  {education.map((item, index) => (
                    <div key={index}>
                      {editIndex === index ? (
                        <EditFormWrapper>
                          <EditGrad
                            onClose={handleCancelEdit}
                            educationData={selectedEducation}
                            type={selectedEducation?.type}
                          />
                        </EditFormWrapper>
                      ) : (
                        <EducationCard
                          education={item}
                          onEdit={() => handleEdit(item, index)}
                          onDelete={() => handleDelete(item.id)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ResumeSection>

            {/* =================================================
                EXPERIENCE
            ================================================= */}

            <ResumeSection
              icon="ri-briefcase-4-line"
              title="Work Experience"
              subtitle="Your professional journey"
              count={jobs.length + internships.length}
              actions={
                <div className="flex flex-wrap gap-2">
                  <AddButton
                    onClick={toggleAddJobFormVisibility}
                    text="Job"
                  />

                  <AddButton
                    onClick={toggleAddInternshipFormVisibility}
                    text="Internship"
                  />
                </div>
              }
            >
              {jobs.length === 0 && internships.length === 0 ? (
                <EmptyState
                  icon="ri-briefcase-4-line"
                  text="No work experience added yet."
                  buttonText="Add Experience"
                  onClick={toggleAddJobFormVisibility}
                />
              ) : (
                <div className="space-y-5">
                  {jobs.map((job, index) => (
                    <div key={`job-${index}`}>
                      {editJobIndex === index ? (
                        <EditFormWrapper>
                          <EditJob
                            onClose={handleCancelJob}
                            jobData={selectedJob}
                          />
                        </EditFormWrapper>
                      ) : (
                        <ExperienceCard
                          type="Work Experience"
                          icon="ri-building-4-line"
                          title={
                            job.profile ||
                            job.type ||
                            "Professional Experience"
                          }
                          organization={job.organization}
                          location={job.location}
                          date={`${job.startDate || ""} ${
                            job.startDate || job.endDate ? "—" : ""
                          } ${job.endDate || ""}`}
                          description={job.description}
                          onEdit={() => handleEditJob(job, index)}
                          onDelete={() => handleDeleteJob(job.id)}
                        />
                      )}
                    </div>
                  ))}

                  {internships.map((internship, index) => (
                    <div key={`internship-${index}`}>
                      {editInternshipIndex === index ? (
                        <EditFormWrapper>
                          <EditInternship
                            onClose={handleCancelInternship}
                            internshipData={selectedInternship}
                          />
                        </EditFormWrapper>
                      ) : (
                        <ExperienceCard
                          type="Internship"
                          icon="ri-rocket-2-line"
                          title={
                            internship.profile ||
                            internship.type ||
                            "Internship"
                          }
                          organization={internship.organization}
                          location={internship.location}
                          date={`${internship.startDate || ""} ${
                            internship.startDate || internship.endDate
                              ? "—"
                              : ""
                          } ${internship.endDate || ""}`}
                          description={internship.description}
                          onEdit={() =>
                            handleEditInternship(internship, index)
                          }
                          onDelete={() =>
                            handleDeleteInternship(internship.id)
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ResumeSection>

            {/* =================================================
                RESPONSIBILITIES
            ================================================= */}

            <ResumeSection
              icon="ri-user-star-line"
              title="Positions of Responsibility"
              subtitle="Leadership and responsibilities"
              count={responsibilities.length}
              onAdd={toggleAddRespoVisibility}
            >
              {responsibilities.length === 0 ? (
                <EmptyState
                  icon="ri-user-star-line"
                  text="No positions of responsibility added."
                  buttonText="Add Responsibility"
                  onClick={toggleAddRespoVisibility}
                />
              ) : (
                <div className="space-y-3">
                  {responsibilities.map((item, index) => (
                    <div key={index}>
                      {editRespoIndex === index ? (
                        <EditFormWrapper>
                          <EditRespo
                            onClose={handleCancelRespo}
                            respoData={selectedRespo}
                          />
                        </EditFormWrapper>
                      ) : (
                        <SimpleItemCard
                          icon="ri-award-line"
                          title={item.description}
                          onEdit={() => handleEditRespo(item, index)}
                          onDelete={() => handleDeleteRespo(item.id)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ResumeSection>

            {/* =================================================
                TRAINING
            ================================================= */}

            <ResumeSection
              icon="ri-book-open-line"
              title="Trainings & Courses"
              subtitle="Certifications and learning"
              count={courses.length}
              onAdd={toggleAddTrainingVisibility}
            >
              {courses.length === 0 ? (
                <EmptyState
                  icon="ri-book-open-line"
                  text="No trainings or courses added."
                  buttonText="Add Training"
                  onClick={toggleAddTrainingVisibility}
                />
              ) : (
                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <div key={index}>
                      {editTrainingIndex === index ? (
                        <EditFormWrapper>
                          <EditTraining
                            onClose={handleCancelTraining}
                            trainingData={selectedTraining}
                          />
                        </EditFormWrapper>
                      ) : (
                        <CourseCard
                          course={course}
                          onEdit={() => handleEditTraining(course, index)}
                          onDelete={() => handleDeleteTraining(course.id)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ResumeSection>

            {/* =================================================
                PROJECTS
            ================================================= */}

            <ResumeSection
              icon="ri-code-s-slash-line"
              title="Projects"
              subtitle="Things you've built"
              count={projects.length}
              onAdd={toggleAddProjectVisibility}
            >
              {projects.length === 0 ? (
                <EmptyState
                  icon="ri-code-s-slash-line"
                  text="No projects added yet."
                  buttonText="Add Project"
                  onClick={toggleAddProjectVisibility}
                />
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {projects.map((project, index) => (
                    <div key={index}>
                      {editProjectIndex === index ? (
                        <EditFormWrapper>
                          <EditProject
                            onClose={handleCancelProject}
                            projectData={selectedProject}
                          />
                        </EditFormWrapper>
                      ) : (
                        <ProjectCard
                          project={project}
                          onEdit={() => handleEditProject(project, index)}
                          onDelete={() => handleDeleteProject(project.id)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ResumeSection>

            {/* =================================================
                SKILLS
            ================================================= */}

            <ResumeSection
              icon="ri-tools-line"
              title="Skills"
              subtitle="Your technical and professional skills"
              count={skills.length}
              onAdd={toggleAddSkillVisibility}
            >
              {skills.length === 0 ? (
                <EmptyState
                  icon="ri-tools-line"
                  text="No skills added yet."
                  buttonText="Add Skills"
                  onClick={toggleAddSkillVisibility}
                />
              ) : (
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      {editSkillIndex === index ? (
                        <EditFormWrapper>
                          <EditSkills
                            onClose={handleCancelSkill}
                            skillData={selectedSkill}
                          />
                        </EditFormWrapper>
                      ) : (
                        <SkillCard
                          skill={skill}
                          onEdit={() => handleEditSkill(skill, index)}
                          onDelete={() => handleDeleteSkill(skill.id)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ResumeSection>

            {/* =================================================
                PORTFOLIO
            ================================================= */}

            <ResumeSection
              icon="ri-links-line"
              title="Portfolio & Work Samples"
              subtitle="Showcase your online presence"
              count={portfolio ? 1 : 0}
              onAdd={
                portfolio
                  ? () => handleEditPortfolio(portfolio, 0)
                  : toggleAddPortfolioVisibility
              }
            >
              {portfolio ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <PortfolioLink
                      icon="ri-article-line"
                      title="Blog"
                      url={portfolio.blogLink}
                    />

                    <PortfolioLink
                      icon="ri-github-fill"
                      title="GitHub"
                      url={portfolio.githubProfile}
                    />

                    <PortfolioLink
                      icon="ri-google-play-fill"
                      title="Play Store"
                      url={portfolio.playStoreDevAccount}
                    />

                    <PortfolioLink
                      icon="ri-brush-line"
                      title="Behance"
                      url={portfolio.behancePortfolio}
                    />

                    <PortfolioLink
                      icon="ri-global-line"
                      title="Other Work"
                      url={portfolio.otherWorkSample}
                    />
                  </div>

                  {editPortfolioIndex !== null && (
                    <EditFormWrapper>
                      <EditPortfolio
                        portfolioData={selectedPortfolio || portfolio}
                        onClose={handleCancelEditPortfolio}
                      />
                    </EditFormWrapper>
                  )}
                </div>
              ) : (
                <EmptyState
                  icon="ri-links-line"
                  text="Add links to your portfolio, GitHub or work samples."
                  buttonText="Add Portfolio"
                  onClick={toggleAddPortfolioVisibility}
                />
              )}
            </ResumeSection>

            {/* =================================================
                ACCOMPLISHMENTS
            ================================================= */}

            <ResumeSection
              icon="ri-trophy-line"
              title="Accomplishments"
              subtitle="Awards, achievements and milestones"
              count={accomplishments.length}
              onAdd={toggleAddAccomVisibility}
            >
              {accomplishments.length === 0 ? (
                <EmptyState
                  icon="ri-trophy-line"
                  text="No accomplishments added yet."
                  buttonText="Add Accomplishment"
                  onClick={toggleAddAccomVisibility}
                />
              ) : (
                <div className="space-y-3">
                  {accomplishments.map((item, index) => (
                    <div key={index}>
                      {editAccomIndex === index ? (
                        <EditFormWrapper>
                          <EditAcom
                            onClose={handleCancelAccom}
                            accomData={selectedAccom}
                          />
                        </EditFormWrapper>
                      ) : (
                        <SimpleItemCard
                          icon="ri-trophy-line"
                          title={item.accom}
                          onEdit={() => handleEditAccom(item, index)}
                          onDelete={() => handleDeleteAccom(item.id)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ResumeSection>

            {/* Bottom CTA */}
            <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-7 sm:p-9 text-white shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-indigo-100 text-sm font-semibold">
                    Almost there
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-black mt-1">
                    Make your profile recruiter-ready.
                  </h2>

                  <p className="mt-2 text-indigo-100 max-w-xl text-sm sm:text-base">
                    Complete the remaining sections and keep your resume
                    updated for better opportunities.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="h-16 w-16 rounded-full border-4 border-white/20 flex items-center justify-center">
                    <span className="text-lg font-black">
                      {completionPercentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =====================================================
          PERSONAL PROFILE FORM
      ===================================================== */}

      {isFormVisible && (
        <ModalOverlay>
          <UpdateForm onClose={toggleFormVisibility} />
        </ModalOverlay>
      )}

      {/* =====================================================
          ADD EDUCATION
      ===================================================== */}

      {isAddEducationFormVisible && (
        <ModalOverlay>
          <AddEducationForm onClose={toggleAddEducationFormVisibility} />
        </ModalOverlay>
      )}

      {/* =====================================================
          ADD JOB
      ===================================================== */}

      {isAddJobFormVisible && (
        <ModalOverlay>
          <AddJob onClose={toggleAddJobFormVisibility} />
        </ModalOverlay>
      )}

      {/* =====================================================
          ADD INTERNSHIP
      ===================================================== */}

      {isAddInternshipFormVisible && (
        <ModalOverlay>
          <AddInternship onClose={toggleAddInternshipFormVisibility} />
        </ModalOverlay>
      )}

      {/* =====================================================
          ADD RESPONSIBILITY
      ===================================================== */}

      {isAddRespoVisible && (
        <ModalOverlay>
          <AddRespo onClose={toggleAddRespoVisibility} />
        </ModalOverlay>
      )}

      {/* =====================================================
          ADD TRAINING
      ===================================================== */}

      {isAddTrainingVisible && (
        <ModalOverlay>
          <AddTraining onClose={toggleAddTrainingVisibility} />
        </ModalOverlay>
      )}

      {/* =====================================================
          ADD PROJECT
      ===================================================== */}

      {isAddProjectVisible && (
        <ModalOverlay>
          <AddProject onClose={toggleAddProjectVisibility} />
        </ModalOverlay>
      )}

      {/* =====================================================
          ADD SKILL
      ===================================================== */}

      {isAddSkillVisible && (
        <ModalOverlay>
          <AddSkills onClose={toggleAddSkillVisibility} />
        </ModalOverlay>
      )}

      {/* =====================================================
          ADD PORTFOLIO
      ===================================================== */}

      {isAddPortfolioVisible && (
        <ModalOverlay>
          <AddPortfolio onClose={toggleAddPortfolioVisibility} />
        </ModalOverlay>
      )}

      {/* =====================================================
          ADD ACCOMPLISHMENT
      ===================================================== */}

      {isAddAccomVisible && (
        <ModalOverlay>
          <AddAcom onClose={toggleAddAccomVisibility} />
        </ModalOverlay>
      )}
    </div>
  );
};

/* ===========================================================
   STAT CARD
=========================================================== */

const StatCard = ({
  icon,
  label,
  value,
  bg,
  iconColor,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <h3 className="text-2xl font-black mt-1 text-slate-800">
            {value}
          </h3>
        </div>

        <div
          className={`h-11 w-11 rounded-xl ${bg} flex items-center justify-center`}
        >
          <i className={`${icon} text-xl ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

/* ===========================================================
   CONTACT ITEM
=========================================================== */

const ContactItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="h-9 w-9 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center">
        <i className={`${icon} text-slate-500`} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
          {label}
        </p>

        <p className="text-sm text-slate-700 mt-0.5 break-words">
          {value}
        </p>
      </div>
    </div>
  );
};

/* ===========================================================
   OVERVIEW ROW
=========================================================== */

const OverviewRow = ({ label, done }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-300">{label}</span>

      {done ? (
        <i className="ri-checkbox-circle-fill text-emerald-400" />
      ) : (
        <i className="ri-checkbox-blank-circle-line text-slate-600" />
      )}
    </div>
  );
};

/* ===========================================================
   RESUME SECTION
=========================================================== */

const ResumeSection = ({
  icon,
  title,
  subtitle,
  count,
  onAdd,
  actions,
  children,
}) => {
  return (
    <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-5 sm:px-7 py-5 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center">
              <i className={`${icon} text-xl text-indigo-600`} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-800">
                  {title}
                </h2>

                <span className="min-w-6 h-6 px-2 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center">
                  {count}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {actions}

            {onAdd && !actions && (
              <button
                onClick={onAdd}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-sm hover:bg-indigo-100 transition"
              >
                <i className="ri-add-line" />
                Add
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7">{children}</div>
    </section>
  );
};

/* ===========================================================
   ADD BUTTON
=========================================================== */

const AddButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-sm hover:bg-indigo-100 transition"
    >
      <i className="ri-add-line" />
      {text}
    </button>
  );
};

/* ===========================================================
   EMPTY STATE
=========================================================== */

const EmptyState = ({
  icon,
  text,
  buttonText,
  onClick,
}) => {
  return (
    <div className="border-2 border-dashed border-slate-200 rounded-2xl py-10 px-5 text-center">
      <div className="h-14 w-14 mx-auto rounded-2xl bg-slate-50 flex items-center justify-center">
        <i className={`${icon} text-2xl text-slate-400`} />
      </div>

      <p className="text-sm text-slate-500 mt-4">
        {text}
      </p>

      {onClick && (
        <button
          onClick={onClick}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition"
        >
          <i className="ri-add-line" />
          {buttonText}
        </button>
      )}
    </div>
  );
};

/* ===========================================================
   EDUCATION CARD
=========================================================== */

const EducationCard = ({
  education,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="group relative border border-slate-100 bg-slate-50/70 rounded-2xl p-5 hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all duration-300">
      <div className="flex gap-4">
        <div className="h-11 w-11 shrink-0 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
          <i className="ri-graduation-cap-line text-xl" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h3 className="font-black text-slate-800">
                {education.degree || education.type || "Education"}
                {education.stream || education.board
                  ? `, ${education.stream || education.board}`
                  : ""}
              </h3>

              <p className="text-sm font-medium text-indigo-600 mt-1">
                {education.college || education.school}
              </p>
            </div>

            <ActionButtons
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-xs sm:text-sm text-slate-500">
            {(education.startYear ||
              education.endYear ||
              education.yearofcompl) && (
              <span className="inline-flex items-center gap-1.5">
                <i className="ri-calendar-line text-slate-400" />
                {education.startYear || ""}
                {(education.startYear ||
                  education.endYear) &&
                  " — "}
                {education.endYear || education.yearofcompl || ""}
              </span>
            )}

            {education.percentage && (
              <span className="inline-flex items-center gap-1.5">
                <i className="ri-bar-chart-line text-slate-400" />
                CGPA / Score: {education.percentage}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===========================================================
   EXPERIENCE CARD
=========================================================== */

const ExperienceCard = ({
  type,
  icon,
  title,
  organization,
  location,
  date,
  description,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="relative pl-5 sm:pl-7 border-l-2 border-indigo-100">
      <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-indigo-600 border-4 border-white shadow" />

      <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all duration-300">
        <div className="flex gap-4">
          <div className="hidden sm:flex h-11 w-11 shrink-0 rounded-xl bg-indigo-50 text-indigo-600 items-center justify-center">
            <i className={`${icon} text-xl`} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
              <div>
                <span className="inline-flex px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] uppercase font-black tracking-wider">
                  {type}
                </span>

                <h3 className="font-black text-slate-800 mt-2">
                  {title}
                </h3>

                {organization && (
                  <p className="text-sm font-semibold text-indigo-600 mt-1">
                    {organization}
                  </p>
                )}
              </div>

              <ActionButtons
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>

            <div className="flex flex-wrap gap-4 mt-3 text-xs sm:text-sm text-slate-500">
              {location && (
                <span className="inline-flex items-center gap-1.5">
                  <i className="ri-map-pin-line" />
                  {location}
                </span>
              )}

              {date && (
                <span className="inline-flex items-center gap-1.5">
                  <i className="ri-calendar-line" />
                  {date}
                </span>
              )}
            </div>

            {description && (
              <p className="mt-4 text-sm leading-6 text-slate-600 whitespace-pre-line">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===========================================================
   COURSE CARD
=========================================================== */

const CourseCard = ({
  course,
  onEdit,
  onDelete,
}) => {
  const courseLocation =
    course.locationType === "Location"
      ? course.location
      : course.locationType;

  return (
    <div className="border border-slate-100 rounded-2xl bg-slate-50/70 p-5 hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all">
      <div className="flex gap-4">
        <div className="h-11 w-11 shrink-0 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <i className="ri-book-open-line text-xl" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <div>
              <h3 className="font-black text-slate-800">
                {course.program}
              </h3>

              {course.organization && (
                <p className="text-sm text-indigo-600 font-semibold mt-1">
                  {course.organization}
                </p>
              )}
            </div>

            <ActionButtons
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-3 text-xs sm:text-sm text-slate-500">
            {courseLocation && (
              <span className="inline-flex items-center gap-1.5">
                <i className="ri-map-pin-line" />
                {courseLocation}
              </span>
            )}

            {(course.startDate || course.endDate) && (
              <span className="inline-flex items-center gap-1.5">
                <i className="ri-calendar-line" />
                {course.startDate || ""}
                {course.startDate || course.endDate ? " — " : ""}
                {course.endDate || ""}
              </span>
            )}
          </div>

          {course.description && (
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {course.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

/* ===========================================================
   PROJECT CARD
=========================================================== */

const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border border-slate-100 rounded-2xl bg-slate-50/70 p-5 hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="h-11 w-11 shrink-0 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
          <i className="ri-code-box-line text-xl" />
        </div>

        <ActionButtons
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      <h3 className="font-black text-slate-800 mt-4">
        {project.title}
      </h3>

      {(project.startDate || project.endDate || project.present) && (
        <p className="text-xs text-slate-400 mt-2">
          <i className="ri-calendar-line mr-1" />
          {project.startDate || ""}
          {project.startDate ||
          project.endDate ||
          project.present
            ? " — "
            : ""}
          {project.present
            ? "Present"
            : project.endDate || ""}
        </p>
      )}

      {project.description && (
        <p className="text-sm text-slate-600 leading-6 mt-4">
          {project.description}
        </p>
      )}

      {project.projectLink && (
        <a
          href={project.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 break-all"
        >
          <i className="ri-external-link-line" />
          View Project
        </a>
      )}
    </div>
  );
};

/* ===========================================================
   SKILL CARD
=========================================================== */

const SkillCard = ({
  skill,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="group inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-indigo-50 hover:border-indigo-100 transition-all">
      <div className="h-7 w-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
        <i className="ri-code-s-slash-line text-sm" />
      </div>

      <div>
        <p className="text-sm font-bold text-slate-700">
          {skill.skillName}
        </p>

        {skill.proficiency && (
          <p className="text-[10px] text-slate-400">
            {skill.proficiency}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1 ml-1">
        <button
          onClick={onEdit}
          className="h-7 w-7 rounded-lg hover:bg-white text-slate-400 hover:text-indigo-600 transition"
          title="Edit"
        >
          <i className="ri-pencil-line" />
        </button>

        <button
          onClick={onDelete}
          className="h-7 w-7 rounded-lg hover:bg-white text-slate-400 hover:text-red-500 transition"
          title="Delete"
        >
          <i className="ri-delete-bin-6-line" />
        </button>
      </div>
    </div>
  );
};

/* ===========================================================
   SIMPLE ITEM CARD
=========================================================== */

const SimpleItemCard = ({
  icon,
  title,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all">
      <div className="h-11 w-11 shrink-0 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
        <i className={`${icon} text-xl`} />
      </div>

      <p className="flex-1 text-sm sm:text-base font-semibold text-slate-700">
        {title}
      </p>

      <ActionButtons
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

/* ===========================================================
   PORTFOLIO LINK
=========================================================== */

const PortfolioLink = ({
  icon,
  title,
  url,
}) => {
  if (!url) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-100 transition-all"
    >
      <div className="h-10 w-10 rounded-xl bg-white text-indigo-600 flex items-center justify-center shadow-sm">
        <i className={`${icon} text-lg`} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {title}
        </p>

        <p className="text-sm text-slate-700 font-semibold truncate mt-0.5">
          {url}
        </p>
      </div>

      <i className="ri-arrow-right-up-line text-slate-400 group-hover:text-indigo-600 transition" />
    </a>
  );
};

/* ===========================================================
   ACTION BUTTONS
=========================================================== */

const ActionButtons = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <button
        onClick={onEdit}
        className="h-9 w-9 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all"
        title="Edit"
      >
        <i className="ri-pencil-line" />
      </button>

      <button
        onClick={onDelete}
        className="h-9 w-9 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-200 transition-all"
        title="Delete"
      >
        <i className="ri-delete-bin-6-line" />
      </button>
    </div>
  );
};

/* ===========================================================
   EDIT FORM WRAPPER
=========================================================== */

const EditFormWrapper = ({ children }) => {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-4 overflow-hidden">
      {children}
    </div>
  );
};

/* ===========================================================
   MODAL OVERLAY
=========================================================== */

const ModalOverlay = ({ children }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-5xl my-4 sm:my-8 max-h-[92vh] overflow-y-auto rounded-3xl">
        {children}
      </div>
    </div>
  );
};

export default MyResume;