import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Cursor from "../../components/Cursor";
import data from "../../data/portfolio.json";

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  
  const allPosts = [...(data.blog?.featured || []), ...(data.blog?.posts || [])];
  const post = allPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Post Not Found</h1>
          <Link href="/blog">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      
      <Head>
        <title>{post.title} - {data.name}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags?.join(', ') || ''} />
        <meta name="author" content={post.author} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://rishichhabra.com/blog/${post.id}`} />
        <meta property="og:image" content={post.image} />
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.category} />
        {post.tags?.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.excerpt} />
        <meta property="twitter:image" content={post.image} />
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header />
        
        <div className="mt-10 laptop:mt-30 p-4 laptop:p-0">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/blog">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </button>
            </Link>
          </div>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto">
            <header className="mb-12">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200">
                  {post.category}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl laptop:text-4xl xl:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-200 leading-tight">
                {post.title}
              </h1>
              
              {/* Excerpt */}
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              
              {/* Meta Information */}
              <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4 pb-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{post.author}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(post.date)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{post.readTime}</span>
                  </div>
                  {post.featured && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span>Featured</span>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-12">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 laptop:h-80 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
                <p>
                  {post.content}
                </p>
                
                <p>
                  This is a comprehensive guide that covers all the essential aspects of the topic. 
                  The implementation details, best practices, and real-world examples will help you 
                  understand how to apply these concepts in your own projects.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">
                  Key Takeaways
                </h2>
                
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Understanding the core concepts and principles</li>
                  <li>Implementation strategies and best practices</li>
                  <li>Common pitfalls and how to avoid them</li>
                  <li>Real-world applications and case studies</li>
                </ul>
                
                <p>
                  Continue reading to explore more advanced topics and dive deeper into the 
                  technical implementation details. This article provides a solid foundation 
                  for understanding and applying these concepts in your projects.
                </p>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    About {post.author}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    AI & Machine Learning Engineer specializing in building scalable AI systems, 
                    computer vision applications, and MLOps pipelines. Passionate about sharing 
                    knowledge and helping others in the AI/ML community.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
        
        <Footer />
      </div>
    </div>
  );
}
