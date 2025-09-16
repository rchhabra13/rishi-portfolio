import React, { useState } from "react";
import WorkCard from "../WorkCard";

const ProjectSection = ({ data }) => {
  const [activeCategory, setActiveCategory] = useState("featured");
  const [expandedCategories, setExpandedCategories] = useState({});

  // Create category options from the data
  const getCategoryOptions = () => {
    const options = [
      { key: "featured", label: "Key Projects", icon: "⭐", count: data.featuredProjects?.length || 0 }
    ];
    
    if (data.projectCategories) {
      Object.entries(data.projectCategories).forEach(([key, category]) => {
        // Extract proper labels from category titles
        const getCategoryLabel = (title) => {
          const labelMap = {
            "🤖 AI Agents & Multi-Agent Systems": "AI Agents",
            "📀 Retrieval-Augmented Generation (RAG)": "RAG Systems",
            "💾 LLM Apps with Memory & Chat Systems": "LLM Apps",
            "🔧 Fine-Tuning & Model Training": "Fine-Tuning",
            "👁️ Computer Vision Projects": "Computer Vision",
            "🗣️ NLP / Document Intelligence": "NLP & Docs",
            "🏗️ MLOps, Infra & Cloud Systems": "MLOps & Cloud",
            "📊 Data Science & Visualization": "Data Science",
            "📱 Software & Mobile Apps": "Software Apps"
          };
          return labelMap[title] || title.split(' ')[0];
        };

        options.push({
          key,
          label: getCategoryLabel(category.title),
          icon: category.title.split(' ')[0], // The emoji
          count: category.projects?.length || 0
        });
      });
    }
    
    return options;
  };

  const categoryOptions = getCategoryOptions();

  const toggleCategory = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  const getCurrentProjects = () => {
    if (activeCategory === "featured") {
      return data.featuredProjects || [];
    }
    
    if (data.projectCategories && data.projectCategories[activeCategory]) {
      return data.projectCategories[activeCategory].projects || [];
    }
    
    return [];
  };

  const getCurrentCategoryInfo = () => {
    if (activeCategory === "featured") {
      return {
        title: "⭐ Key Projects",
        description: "My most impactful and showcase-worthy projects that demonstrate core expertise"
      };
    }
    
    if (data.projectCategories && data.projectCategories[activeCategory]) {
      return {
        title: data.projectCategories[activeCategory].title,
        description: data.projectCategories[activeCategory].description
      };
    }
    
    return { title: "Projects", description: "" };
  };

  const currentProjects = getCurrentProjects();
  const currentCategoryInfo = getCurrentCategoryInfo();
  const isExpanded = expandedCategories[activeCategory] || false;
  const shouldCollapse = currentProjects.length > 6;
  const displayProjects = shouldCollapse && !isExpanded 
    ? currentProjects.slice(0, 6) 
    : currentProjects;

  return (
    <div className="mt-10 laptop:mt-30 p-4 laptop:p-0">
      {/* Header Section */}
      <div className="text-center mb-12">
              <h1 className="text-4xl laptop:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Recent Accomplishments
              </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore my portfolio of AI/ML projects, software applications, and innovative solutions
        </p>
      </div>
      
      {/* Category Tabs - Enhanced Design */}
      <div className="mb-12">
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Browse by Category</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
        
        {/* Desktop Tabs */}
        <div className="hidden tablet:flex flex-wrap justify-center gap-3 mb-6">
          {categoryOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setActiveCategory(option.key)}
              className={`group relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 min-w-[140px] justify-center ${
                activeCategory === option.key
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105"
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="font-semibold">{option.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeCategory === option.key
                  ? "bg-white/20 text-white"
                  : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              }`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile Tabs - Horizontal Scroll */}
        <div className="tablet:hidden">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categoryOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setActiveCategory(option.key)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeCategory === option.key
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
                <span className="bg-white/20 dark:bg-black/20 px-1.5 py-0.5 rounded-full text-xs">
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Category Content - Enhanced */}
      <div className="mb-16">
        {/* Category Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl laptop:text-4xl font-bold mb-3 text-gray-800 dark:text-gray-200">
            {currentCategoryInfo.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            {currentCategoryInfo.description}
          </p>
          {shouldCollapse && (
            <button
              onClick={() => toggleCategory(activeCategory)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>{isExpanded ? "Show Less" : "Show All Projects"}</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {currentProjects.length}
              </span>
            </button>
          )}
        </div>
        
        {/* Projects Grid - Enhanced Responsive Design */}
        <div className="grid grid-cols-1 mob:grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-3 xl:grid-cols-4 gap-6 laptop:gap-8">
          {displayProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="group relative transform transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {activeCategory === "featured" && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1.5 rounded-full font-bold z-10 shadow-lg">
                  KEY PROJECT
                </div>
              )}
              <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <WorkCard
                  img={project.imageSrc}
                  name={project.title}
                  description={project.description}
                  tags={project.tags}
                  demo={project.demo}
                  url={project.url}
                  onClick={() => window.open(project.url)}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Show More Indicator */}
        {shouldCollapse && !isExpanded && currentProjects.length > 6 && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 text-sm">
              <span>Showing 6 of {currentProjects.length} projects</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      {/* Fallback for old projects structure */}
      {data.projects && (!data.projectCategories || Object.keys(data.projectCategories).length === 0) && (
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-200">All Projects</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Complete project portfolio</p>
          </div>
          <div className="grid grid-cols-1 mob:grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-3 xl:grid-cols-4 gap-6 laptop:gap-8">
            {data.projects.map((project) => (
              <div key={project.id} className="group relative transform transition-all duration-300 hover:scale-105">
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <WorkCard
                    img={project.imageSrc}
                    name={project.title}
                    description={project.description}
                    tags={project.tags}
                    demo={project.demo}
                    url={project.url}
                    onClick={() => window.open(project.url)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
