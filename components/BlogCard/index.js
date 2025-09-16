import React from "react";
import Link from "next/link";

const BlogCard = ({ post, featured = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Link href={`/blog/${post.id}`}>
      <div className={`group relative transform transition-all duration-300 hover:scale-105 cursor-pointer ${
        featured ? 'h-full' : 'h-full'
      }`}>
        {/* Featured Badge */}
        {featured && (
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs px-3 py-1.5 rounded-full font-bold z-10 shadow-lg">
            ⭐ FEATURED
          </div>
        )}
        
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-t-2xl h-48 tablet:h-52 laptop:h-56">
            <img
              alt={post.title}
              className="h-full w-full object-cover group-hover:scale-110 transition-all duration-500 ease-out"
              src={post.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
              {post.category}
            </div>
          </div>
          
          {/* Content Section */}
          <div className="flex-1 p-4 laptop:p-6 bg-white dark:bg-gray-800 rounded-b-2xl flex flex-col">
            <h1 className="text-lg laptop:text-xl font-bold mb-2 line-clamp-2 text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {post.title}
            </h1>
            <p className="text-sm laptop:text-base text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 flex-1">
              {post.excerpt}
            </p>
            
            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-700"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-600">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}
            
            {/* Meta Information */}
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="font-medium">{post.author}</span>
                <span>•</span>
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readTime}</span>
              </div>
            </div>
            
            {/* Read More Indicator */}
            <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>Read Article</span>
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
