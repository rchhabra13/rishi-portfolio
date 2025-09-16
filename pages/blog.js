import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import data from "../data/portfolio.json";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const allPosts = [...(data.blog?.featured || []), ...(data.blog?.posts || [])];
  const categories = data.blog?.categories || [];

  const getFilteredPosts = () => {
    if (activeCategory === "all") return allPosts;
    return allPosts.filter(post => post.category === activeCategory);
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      
      <Head>
        <title>Blog & Insights - {data.name}</title>
        <meta name="description" content="Technical articles, tutorials, and insights on AI/ML, software development, and technology trends by Rishi Chhabra" />
        <meta name="keywords" content="AI Blog, Machine Learning Articles, Software Development, Technology Insights, Rishi Chhabra" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog & Insights - Rishi Chhabra" />
        <meta property="og:description" content="Technical articles, tutorials, and insights on AI/ML, software development, and technology trends" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rishichhabra.com/blog" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Blog & Insights - Rishi Chhabra" />
        <meta property="twitter:description" content="Technical articles, tutorials, and insights on AI/ML, software development, and technology trends" />
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header />
        
        <div className="mt-10 laptop:mt-30 p-4 laptop:p-0">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl laptop:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Blog & Insights
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Technical articles, tutorials, and insights on AI/ML, software development, and technology trends. 
              Sharing knowledge and experiences from building production-ready AI systems.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mb-12">
            <div className="flex flex-col items-center mb-8">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Browse by Category</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            
            {/* Desktop Tabs */}
            <div className="hidden tablet:flex flex-wrap justify-center gap-3 mb-6">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`group relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3 min-w-[140px] justify-center ${
                    activeCategory === category.key
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 transform scale-105"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105"
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="font-semibold">{category.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeCategory === category.key
                      ? "bg-white/20 text-white"
                      : "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile Tabs */}
            <div className="tablet:hidden">
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      activeCategory === category.key
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                    <span className="bg-white/20 dark:bg-black/20 px-1.5 py-0.5 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl laptop:text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                  {activeCategory === "all" ? "All Articles" : `${activeCategory} Articles`}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
                </p>
              </div>
            </div>
            
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 mob:grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-3 xl:grid-cols-4 gap-6 laptop:gap-8">
                {filteredPosts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <BlogCard post={post} featured={post.featured} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  No articles available in this category yet.
                </p>
              </div>
            )}
          </div>

          {/* Newsletter Signup */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 laptop:p-12">
              <h3 className="text-2xl laptop:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                Stay Updated
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Get notified about new articles on AI/ML, software development, and technology trends.
              </p>
              <div className="flex flex-col tablet:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}
