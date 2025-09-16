import React from "react";

const WorkCard = ({ img, name, description, onClick, tags = [], demo, url }) => {
  return (
    <div
      className="h-full flex flex-col cursor-pointer group"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-2xl h-48 tablet:h-52 laptop:h-56">
        <img
          alt={name}
          className="h-full w-full object-cover group-hover:scale-110 transition-all duration-500 ease-out"
          src={img}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Content Section */}
      <div className="flex-1 p-4 laptop:p-6 bg-white dark:bg-gray-800 rounded-b-2xl">
        <h1 className="text-lg laptop:text-xl font-bold mb-2 line-clamp-2 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {name ? name : "Project Name"}
        </h1>
        <p className="text-sm laptop:text-base text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
          {description ? description : "Description"}
        </p>
        
        {/* Tags Section */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-700"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-600">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          {/* Demo Button */}
          {demo && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(demo, '_blank');
              }}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Live Demo</span>
            </button>
          )}
          
          {/* GitHub Button */}
          {url && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(url, '_blank');
              }}
              className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg ${
                demo 
                  ? "flex-1 bg-gray-600 hover:bg-gray-700 text-white" 
                  : "w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Code</span>
            </button>
          )}
        </div>
        
        {/* Demo Badge */}
        {demo && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
            🚀 LIVE DEMO
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkCard;
