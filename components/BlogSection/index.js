import React from "react";
import BlogCard from "../BlogCard";
import Link from "next/link";

const BlogSection = ({ data }) => {
  const featuredPosts = data.blog?.featured || [];
  const recentPosts = data.blog?.posts?.slice(0, 3) || [];

  return (
    <div className="mt-10 laptop:mt-30 p-4 laptop:p-0">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl laptop:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Blog & Insights
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Technical articles, tutorials, and insights on AI/ML, software development, and technology trends
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl laptop:text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                ⭐ Featured Articles
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                My most popular and impactful technical articles
              </p>
            </div>
            <Link href="/blog">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <span>View All Posts</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 laptop:gap-8">
            {featuredPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="transform transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BlogCard post={post} featured={true} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl laptop:text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                📝 Recent Articles
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Latest insights and technical deep-dives
              </p>
            </div>
            <Link href="/blog">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <span>View All Posts</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 mob:grid-cols-2 tablet:grid-cols-2 laptop:grid-cols-3 gap-6 laptop:gap-8">
            {recentPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="transform transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 laptop:p-12">
          <h3 className="text-2xl laptop:text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Stay Updated with Latest Insights
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Get notified about new articles on AI/ML, software development, and technology trends.
          </p>
          <div className="flex flex-col tablet:flex-row gap-4 justify-center items-center">
            <Link href="/blog">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Explore All Articles
              </button>
            </Link>
            <a 
              href="https://github.com/rchhabra13" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              Follow on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
