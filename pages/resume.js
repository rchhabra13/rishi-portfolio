import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Button from "../components/Button";
import Head from "next/head";
import { useTheme } from "next-themes";
// Data
import data from "../data/portfolio.json";

const Resume = () => {
  const router = useRouter();
  const { theme, resolvedTheme } = useTheme();
  const [mount, setMount] = useState(false);
  const getSocialLink = (title) =>
    data.socials.find((s) => s.title.toLowerCase() === title.toLowerCase())?.link;
  const emailLink = getSocialLink("Email");
  const websiteLink = getSocialLink("Website");
  const linkedInLink = getSocialLink("LinkedIn");
  const locationText = data.headerTaglineFour
    ? data.headerTaglineFour.replace(/^based in\s*/i, "").replace(/\.$/, "")
    : "";

  useEffect(() => {
    setMount(true);
  }, []);

  const handleWorkScroll = () => {
    router.push("/#work");
  };

  const handleAboutScroll = () => {
    router.push("/#about");
  };

  const handleDownloadResume = () => {
    const pdfPath = "/Rishi_Chhabra_Resume.pdf";
    
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = `${data.name.replace(/\s+/g, '_')}_Resume.pdf`; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Head>
        <title>{data.name}&apos;s Resume</title>
      </Head>
      {data.showCursor && <Cursor />}
      <div
        className={`container mx-auto mb-10 ${
          data.showCursor && "cursor-none"
        }`}
      >
        <Header 
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div className="w-full max-w-6xl p-6 tablet:p-10 rounded-xl text-black dark:text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Resume</h1>
                  <p className="text-sm opacity-70 mt-1">FYI Recruiters, you can easily print this out pressing CTRL + P</p>
                </div>
                <button
                  onClick={handleDownloadResume}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                  } text-white transition-colors duration-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Resume
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="rounded-xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800/60 p-6">
                  <h2 className="text-xl font-semibold">{data.name}</h2>
                  {locationText && (
                    <p className="mt-1 text-sm opacity-70">{locationText}</p>
                  )}
                  <p className="mt-4 text-lg">{data.resume.tagline}</p>
                  <p className="mt-2 opacity-80">{data.resume.description}</p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800/60 p-6">
                  <h3 className="text-lg font-semibold">Contact</h3>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {emailLink && (
                      <div>
                        <p className="text-xs uppercase opacity-60">Email</p>
                        <a href={emailLink} className="inline-block mt-1 px-2 py-1 rounded bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 break-all">
                          {emailLink.replace(/^mailto:/, "")}
                        </a>
                      </div>
                    )}
                    {websiteLink && (
                      <div>
                        <p className="text-xs uppercase opacity-60">Website</p>
                        <a href={websiteLink} target="_blank" rel="noreferrer" className="inline-block mt-1 px-2 py-1 rounded bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 break-all">
                          {websiteLink.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    )}
                    {linkedInLink && (
                      <div>
                        <p className="text-xs uppercase opacity-60">LinkedIn</p>
                        <a href={linkedInLink} target="_blank" rel="noreferrer" className="inline-block mt-1 px-2 py-1 rounded bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 break-all">
                          {linkedInLink.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800/60 p-6">
                <h1 className="text-2xl font-bold">Tech Stack</h1>
                <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 mt-4">
                  {data.resume.languages && (
                    <div>
                      <h2 className="text-lg">Languages</h2>
                      <div className="mt-2">
                        {data.resume.languages.map((item, index) => (
                          <span key={index} className="inline-block text-sm px-3 py-1 mr-2 mb-2 rounded-full bg-gray-200 dark:bg-slate-700">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.resume.frameworks && (
                    <div>
                      <h2 className="text-lg">Frameworks</h2>
                      <div className="mt-2">
                        {data.resume.frameworks.map((item, index) => (
                          <span key={index} className="inline-block text-sm px-3 py-1 mr-2 mb-2 rounded-full bg-gray-200 dark:bg-slate-700">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.resume.others && (
                    <div>
                      <h2 className="text-lg">Others</h2>
                      <div className="mt-2">
                        {data.resume.others.map((item, index) => (
                          <span key={index} className="inline-block text-sm px-3 py-1 mr-2 mb-2 rounded-full bg-gray-200 dark:bg-slate-700">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2">
                  <div className="rounded-xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800/60 p-6">
                    <h1 className="text-2xl font-bold">Career Journey</h1>
                    {data.resume.experiences.map(
                      ({ id, dates, type, position, company, location, tags, logo, bullets }) => (
                        <ProjectResume
                          key={id}
                          dates={dates}
                          type={type}
                          position={position}
                          company={company}
                          location={location}
                          tags={tags}
                          logo={logo}
                          bullets={bullets}
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="rounded-xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800/60 p-6">
                    <h1 className="text-2xl font-bold">Education</h1>
                    <div className="mt-2">
                      <h2 className="text-lg">{data.resume.education.universityName1}</h2>
                      <h3 className="text-sm opacity-75">{data.resume.education.universityDate1}</h3>
                      <p className="text-sm mt-2 opacity-80">{data.resume.education.universityPara1}</p>
                    </div>
                    <div className="mt-4">
                      <h2 className="text-lg">{data.resume.education.universityName2}</h2>
                      <h3 className="text-sm opacity-75">{data.resume.education.universityDate2}</h3>
                      <p className="text-sm mt-2 opacity-80">{data.resume.education.universityPara2}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;