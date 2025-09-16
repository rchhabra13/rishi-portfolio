import { useRef } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import ProjectSection from "../components/ProjectSection";
import BlogSection from "../components/BlogSection";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";
import ContactForm from "../components/ContactForm";

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  // Ref
  const workRef = useRef();
  const blogRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleBlogScroll = () => {
    window.scrollTo({
      top: blogRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.seo?.title || `${data.name}'s Portfolio`}</title>
        <meta name="description" content={data.seo?.description || `Portfolio of ${data.name}, ${data.headerTaglineThree} based in ${data.headerTaglineFour}`} />
        <meta name="keywords" content={data.seo?.keywords || "AI Engineer, Machine Learning, Portfolio, Software Developer"} />
        <meta name="author" content={data.seo?.author || data.name} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={data.seo?.type || "website"} />
        <meta property="og:url" content={data.seo?.url || "https://rishichhabra.com"} />
        <meta property="og:title" content={data.seo?.title || `${data.name}'s Portfolio`} />
        <meta property="og:description" content={data.seo?.description || `Portfolio of ${data.name}, ${data.headerTaglineThree}`} />
        <meta property="og:image" content={data.seo?.image || data.profileImage} />
        <meta property="og:site_name" content={data.seo?.siteName || `${data.name} Portfolio`} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={data.seo?.url || "https://rishichhabra.com"} />
        <meta property="twitter:title" content={data.seo?.title || `${data.name}'s Portfolio`} />
        <meta property="twitter:description" content={data.seo?.description || `Portfolio of ${data.name}, ${data.headerTaglineThree}`} />
        <meta property="twitter:image" content={data.seo?.image || data.profileImage} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={data.seo?.url || "https://rishichhabra.com"} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": data.name,
              "jobTitle": data.headerTaglineThree,
              "description": data.seo?.description || `Portfolio of ${data.name}, ${data.headerTaglineThree}`,
              "url": data.seo?.url || "https://rishichhabra.com",
              "image": data.seo?.image || data.profileImage,
              "sameAs": data.socials?.map(social => social.link) || [],
              "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "Deep Learning",
                "Computer Vision",
                "Natural Language Processing",
                "MLOps",
                "Cloud Computing",
                "Python",
                "TensorFlow",
                "PyTorch"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "AI & Machine Learning Engineer",
                "description": "Specializing in AI/ML solutions, computer vision, and cloud deployment"
              }
            })
          }}
        />
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleBlogScroll={handleBlogScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="laptop:mt-20 mt-10">
          <div className="flex flex-col tablet:flex-row justify-between items-center">
            <div className="mt-5">
              <h1
                ref={textOne}
                className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
              >
                {data.headerTaglineOne}
              </h1>
              <h1
                ref={textTwo}
                className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
              >
                {data.headerTaglineTwo}
              </h1>
              <h1
                ref={textThree}
                className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
              >
                {data.headerTaglineThree}
              </h1>
              <h1
                ref={textFour}
                className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
              >
                {data.headerTaglineFour}
              </h1>
              
              <Socials className="mt-2 laptop:mt-5" />
            </div>
            
            <div className="mt-5 tablet:mt-0 flex justify-center">
              <div className="relative w-48 h-48 tablet:w-64 tablet:h-64 laptop:w-80 laptop:h-80">
                <img 
                  src={data.profileImage || "/images/photo.jpg"} 
                  alt={`${data.name}'s profile`}
                  className="rounded-full object-cover w-full h-full border-4 border-gray-300 dark:border-gray-700 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div ref={workRef} id="work">
          <ProjectSection data={data} />
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl text-bold">Services.</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        {/* Blog Section */}
        <div ref={blogRef} id="blog">
          <BlogSection data={data} />
        </div>
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef} id="about">
          <h1 className="tablet:m-10 text-2xl text-bold">About.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>
        </div>
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" id="contact">
          <h1 className="tablet:m-10 text-2xl text-bold">Contact.</h1>
          <div className="tablet:m-10">
            <ContactForm />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}