import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-slate-50 text-slate-900">
      <Navbar />

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-purple-200/40 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Hero Content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
                Your career journey starts here
              </div>

              <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Find the{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                  right opportunity
                </span>{" "}
                for your future.
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Discover jobs and internships from companies that are looking
                for talented people like you. Build your profile, apply faster
                and take the next step in your career with CareerHub.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/student/dashboard"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:bg-indigo-600"
                >
                  Explore Opportunities
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  to="/employe/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <span>＋</span>
                  Hire Talent
                </Link>
              </div>

              {/* Trust */}
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Free to get started
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Verified opportunities
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Easy applications
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
              {/* Main dashboard card */}
              <div className="relative rounded-3xl border border-white/70 bg-white/80 p-4 shadow-2xl shadow-indigo-200/40 backdrop-blur-xl sm:p-5">
                {/* Browser header */}
                <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />

                  <div className="ml-3 h-7 flex-1 rounded-lg bg-slate-100" />
                </div>

                {/* Search */}
                <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-white">
                  <p className="text-xs font-medium text-indigo-100">
                    Find your next opportunity
                  </p>

                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/15 p-3 backdrop-blur-md">
                    <span>🔍</span>
                    <span className="text-sm text-white/80">
                      React Developer
                    </span>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <span className="rounded-lg bg-white/15 px-3 py-1.5 text-xs">
                      Remote
                    </span>

                    <span className="rounded-lg bg-white/15 px-3 py-1.5 text-xs">
                      Full-time
                    </span>
                  </div>
                </div>

                {/* Job cards */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600">
                      A
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold">
                        Frontend Developer
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Acme Technologies • Remote
                      </p>
                    </div>

                    <span className="hidden rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600 sm:block">
                      New
                    </span>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 font-bold text-purple-600">
                      T
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold">
                        MERN Stack Developer
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        TechLabs • Bangalore
                      </p>
                    </div>

                    <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 sm:block">
                      4.5 LPA
                    </span>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 font-bold text-orange-600">
                      S
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-bold">
                        Software Intern
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Startup Labs • Hybrid
                      </p>
                    </div>

                    <span className="hidden rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600 sm:block">
                      Internship
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating card - Jobs */}
              <div className="absolute -left-7 top-20 hidden rounded-2xl border border-white/80 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-lg">
                    💼
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Opportunities
                    </p>
                    <p className="font-bold text-slate-900">5,000+</p>
                  </div>
                </div>
              </div>

              {/* Floating card - Success */}
              <div className="absolute -bottom-6 -right-5 hidden rounded-2xl border border-white/80 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-lg">
                    🚀
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">Career growth</p>
                    <p className="font-bold text-indigo-600">
                      Starts today
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-8">
            {[
              ["10K+", "Students"],
              ["2K+", "Companies"],
              ["5K+", "Jobs"],
              ["8K+", "Internships"],
            ].map(([number, label]) => (
              <div
                key={label}
                className="text-center md:border-r md:border-slate-100 last:md:border-r-0"
              >
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  {number}
                </h2>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY CAREERHUB
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-indigo-600">
            Why CareerHub?
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Everything you need to{" "}
            <span className="text-indigo-600">move forward.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-500">
            We make the process of finding opportunities and hiring talent
            simple, fast and effective.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl transition duration-300 group-hover:scale-110">
              🛡️
            </div>

            <h3 className="mt-6 text-xl font-bold">
              Verified Opportunities
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Discover genuine jobs and internships from trusted companies and
              reduce the noise while searching for your next role.
            </p>

            <div className="mt-6 text-sm font-bold text-indigo-600">
              Explore with confidence →
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-2xl transition duration-300 group-hover:scale-110">
              ⚡
            </div>

            <h3 className="mt-6 text-xl font-bold">Fast Applications</h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Spend less time filling forms and more time preparing for your
              dream role with a simple application experience.
            </p>

            <div className="mt-6 text-sm font-bold text-purple-600">
              Apply smarter →
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-xl hover:shadow-green-100/50">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-2xl transition duration-300 group-hover:scale-110">
              🎯
            </div>

            <h3 className="mt-6 text-xl font-bold">Smart Hiring</h3>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              Employers can discover relevant candidates, manage applications
              and build their teams more efficiently.
            </p>

            <div className="mt-6 text-sm font-bold text-green-600">
              Hire better →
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section className="bg-slate-900 py-20 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-indigo-400">
              Simple process
            </span>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              From searching to getting hired.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              CareerHub keeps your career journey simple.
            </p>
          </div>

          <div className="relative mt-14 grid gap-8 md:grid-cols-3">
            {/* Connector */}
            <div className="absolute left-[16%] right-[16%] top-8 hidden border-t border-dashed border-slate-700 md:block" />

            {/* Step 1 */}
            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold shadow-lg shadow-indigo-600/20">
                01
              </div>

              <h3 className="mt-6 text-lg font-bold">
                Create your profile
              </h3>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-400">
                Build a professional profile that showcases your skills,
                education and experience.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600 text-xl font-bold shadow-lg shadow-purple-600/20">
                02
              </div>

              <h3 className="mt-6 text-lg font-bold">
                Discover opportunities
              </h3>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-400">
                Explore jobs and internships that match your interests and
                career goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-xl font-bold shadow-lg shadow-violet-600/20">
                03
              </div>

              <h3 className="mt-6 text-lg font-bold">
                Apply & grow
              </h3>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-400">
                Apply to the right roles and take your next step toward a
                successful career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STUDENT / EMPLOYER CTA
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-2">
          {/* Student */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white sm:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <div className="text-3xl">🎓</div>

              <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
                Looking for your next opportunity?
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-indigo-100">
                Discover jobs and internships from companies looking for fresh
                talent and experienced professionals.
              </p>

              <Link
                to="/student/dashboard"
                className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-600 transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                Find Opportunities →
              </Link>
            </div>
          </div>

          {/* Employer */}
          <div className="relative overflow-hidden bg-slate-50 p-8 sm:p-12">
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-purple-100 blur-3xl" />

            <div className="relative">
              <div className="text-3xl">💼</div>

              <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
                Looking for great talent?
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
                Post opportunities, discover talented candidates and build
                your team with CareerHub.
              </p>

              <Link
                to="/employe/signup"
                className="mt-7 inline-flex rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-indigo-600"
              >
                Start Hiring →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 py-20 text-center text-white">
        <div className="absolute -left-20 -top-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-pink-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6">
          <div className="text-4xl">🚀</div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Your next chapter starts today.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
            Whether you're searching for your first opportunity or looking
            for your next great hire, CareerHub is built to help you move
            forward.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/signup"
              className="rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-indigo-600 shadow-xl transition hover:-translate-y-1 hover:bg-indigo-50"
            >
              Get Started — It's Free
            </Link>

            <Link
              to="/student/dashboard"
              className="rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Explore Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="bg-slate-950 px-6 py-10 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div>
            <div className="text-xl font-extrabold text-white">
              Career<span className="text-indigo-500">Hub</span>
            </div>

            <p className="mt-1 text-sm">
              Connecting talent with opportunity.
            </p>
          </div>

          <p className="text-xs">
            © {new Date().getFullYear()} CareerHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;