import React from "react";

const ProjectResume = ({
  dates,
  type,
  position,
  company,
  location,
  tags = [],
  logo,
  bullets = [],
}) => {
  return (
    <div className="mt-6 w-full grid grid-cols-1 laptop:grid-cols-12 gap-6 p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 shadow-sm">
      <div className="laptop:col-span-3 flex items-start space-x-4">
        {logo && (
          <img src={logo} alt={company || position} className="h-12 w-12 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700" />
        )}
        <div className="text-slate-700 dark:text-slate-200">
          {company && <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{company}</h3>}
          <div className="mt-1 space-y-1 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center space-x-2">
              <CalendarIcon />
              <span>{dates}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon />
              <span>{type}</span>
            </div>
            {location && (
              <div className="flex items-center space-x-2">
                <MapPinIcon />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="laptop:col-span-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">{position}</h2>
        {tags && tags.length > 0 && (
          <div className="mt-2">
            {tags.map((t, idx) => (
              <span
                key={idx}
                className="inline-block text-xs px-2 py-1 mr-2 mb-2 rounded-md bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="laptop:col-span-6">
        {bullets && bullets.length > 0 && (
          <ul className="list-disc ml-5 text-slate-700 dark:text-slate-300">
            {bullets.map((bullet, index) => (
              <li key={index} className="text-sm my-2">
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Minimal inline icons (no extra deps)
const CalendarIcon = () => (
  <svg className="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ClockIcon = () => (
  <svg className="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const MapPinIcon = () => (
  <svg className="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export default ProjectResume;
