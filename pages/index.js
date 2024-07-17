import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getPosts } from '../utils/mdx-utils';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import Image from 'next/image';
import ArrowIcon from '../components/ArrowIcon';
import { ResearchIcon, SitemapIcon, DevExp } from '../components/Icons/DesignFlowIcons';


export default function Index({ devProjects, designProjects, globalData }) {
  const images = {
    smartbet: [
      {
        path: '/projects/real-estate.jpg',
        alt: 'Real Estate Case study',
        link: 'https://goodwin.am/',
      },
      {
        path: '/projects/festberg.jpg',
        alt: 'Festberg Showcase',
        link: 'https://goodwin.am/',
      },
      {
        path: '/projects/beargeek.jpg',
        alt: 'Festberg Showcase',
        link: 'https://goodwin.am/',
      },
    ],
  };

  const colLeftRefs = useRef([]);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.3 // trigger when 10% of the element is visible
    };
  
    const observer = new IntersectionObserver((entries) => {
      let newHighlightIndex = highlightIndex;
      entries.forEach(entry => {
        const index = colLeftRefs.current.indexOf(entry.target);
        if (entry.isIntersecting) {
          newHighlightIndex = index;
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0 && window.scrollY < lastScrollTop) {
          // Scrolling up and element is out of view
          newHighlightIndex = index - 1;
        }
      });

      if (newHighlightIndex !== highlightIndex) {
        setHighlightIndex(newHighlightIndex);
      }
    }, options);

    colLeftRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      colLeftRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [lastScrollTop, highlightIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setLastScrollTop(window.scrollY);
      if (window.scrollY === 0) {
        setHighlightIndex(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (

    <Layout>
      <Header name={globalData.name} />
      <SEO title={globalData.name} description={globalData.blogTitle} />
      {/* <Sidebar name={globalData.name} designProjects={designProjects} devProjects={devProjects}></Sidebar> */}
      <main className="w-full home-wrapper main">
        {/* <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1> */}
        {/* eslint-disable jsx-a11y/anchor-is-valid */}

        <div className='design-flow mb-102'>
          <h2 className='big-title color-n3 mb-39'>Design Flow</h2>
          <ul >
            <li className='design-flow-card'>
              <span className='icon'>
                <ResearchIcon />
              </span>
              <h4 className='title-normal'>Research</h4>
              <p>
                Extensive research on similar websites to gather UX insights and identify important components.
              </p>
            </li>
            <li className='design-flow-card'>
              <span className='icon'>
                <SitemapIcon />
              </span>
              <h4 className='title-normal'>Sitemap</h4>
              <p>
                detailed sitemap and information arch hyearchy  to understand and define the key sections of the platform.
              </p>
            </li>
            <li className='design-flow-card'>
              <span className='icon'>
                <SitemapIcon />
              </span>
              <h4 className='title-normal'>Information Architecture</h4>
              <p>
                Analyzed and reorganized the information architecture to ensure logical and user-friendly navigation.
              </p>
            </li>
            <li className='design-flow-card'>
              <span className='icon'>
                <SitemapIcon />
              </span>
              <h4 className='title-normal'>Wireframing</h4>
              <p>
                informational wireframes focusing on the possible future look and functionality of the platform.
              </p>
            </li>
            <li className='design-flow-card'>
              <span className='icon'>
                <SitemapIcon />
              </span>
              <h4 className='title-normal'>Design System</h4>
              <p>
                Established a design system using an atomic design approach, reusable components, consistency and efficiency.
              </p>
            </li>
            <li className='design-flow-card'>
              <span className='icon'>
                <SitemapIcon />
              </span>
              <h4 className='title-normal'>Figma Prototyping</h4>
              <p>
                Interactive prototypes in Figma to visualize and test the design, allowing for improvements based on user feedback.
              </p>
            </li>
          </ul>


        </div>

        <div className="project-part home-snipet mb-102" id="smartbet">


          <div className="project-img">
            {images.smartbet.map((image, index) => (
              <a key={index} href={image.link} target="_blank" rel="noopener noreferrer">
                <span className='img-holder'>
                  <Image layout='fill' src={image.path} alt={image.alt} />
                </span>

                <figcaption>{image.alt}</figcaption>
              </a>
            ))}
          </div>




        </div>
        <div className='mb-102'>
          <h2 className='big-title color-n3 mb-39'>Development Skills</h2>
          <ul className='subtitle'>
            <li>
              Front-End Technologies: HTML, CSS, JavaScript
            </li>
            <li>
              Front-End Frameworks: React, Angular
            </li>
            <li>
              WordPress Development: Theme development, Gutenberg blocks
            </li>
            <li>
              Responsive Design: Mobile and web optimization
            </li>
            <li>
              CSS Layout: Flexbox, CSS Grid
            </li>
            <li>
              Cross-Browser Compatibility: Ensuring consistent rendering on various browsers
            </li>
            <li>
              Performance Optimization: Asset optimization for web speed
            </li>
            <li>
              Theming and Dark/Light Modes: Implementing theme systems with light and dark modes
            </li>
            <li>
              Testing and Debugging: Ensuring seamless user experience through rigorous testing
            </li>
            <li>
              Testing and Debugging: Ensuring seamless user experience through rigorous testing
            </li>
          </ul>
        </div>
        <div className='dev-exp '>

          <div className='project-block'>
                
                <div ref={el => colLeftRefs.current[0] = el} className={`col-left ${highlightIndex >= 0 ? 'highlight' : ''}`}>
              <h2 className='big-title color-n3 '>Experience <span className='icon-mid'><DevExp /></span></h2>
              <h4>WordPress Developer</h4>
              <em>Jun 2022 - Feb 2023</em>
              <strong>Webinos Inc, Freelance</strong>

            </div>
            <ul>
              <li>
                Managed multiple WordPress-based websites, ensuring functionality, performance, and visual appeal.
              </li>
              <li>
                Developed custom Gutenberg blocks and fields to empower clients with intuitive site management capabilities, enhancing their control over content and layout.
              </li>
              <li>
                Collaborated with clients to understand their specific requirements and extend website functionality accordingly, providing tailored solutions to meet their needs.
              </li>
              <li>
                Incorporated client-requested features and improvements into existing projects, contributing to customer satisfaction and project success.
              </li>
            </ul>

            <div ref={el => colLeftRefs.current[1] = el} className={`col-left ${highlightIndex >= 1 ? 'highlight' : ''}`}>
              <h4>Markup Specialist</h4>
              <em>Sep 2020 - Jul 2021</em>
              <strong>SmartBet</strong>
              <Image
                    className='desktop-view dark'
                    src="/company-logos/smartbet_io.jpg"
                    alt='Goodwin desktop'
                    width={39}
                    height={39}
                  />
            </div>
            <ul>
              <li>
                Led the comprehensive redesign of the primary project's user interface, focusing on enhancing user experience and visual appeal.
              </li>
              <li>
                Implemented a theming system that allowed for seamless color scheme changes across the entire site using a single file.
              </li>
              <li>
                Ensured each color scheme featured both dark and light mode options, catering to user preferences.
              </li>
              <li>
                Developed a mobile-responsive version of the website, ensuring it met criteria for easy theming and dark/light modes.
              </li>
              <li className='project-overview'>
          

                <input readOnly checked id="desktopView" name='responsive' type='radio' />
                <input id="mobileView" name='responsive' type='radio' />
                <input readOnly checked id="darkMode" name='color' type='radio' />
                <input id="lightMode" name='color' type='radio' />
                <div className='view-mode'>
                  <section>
                    <h6>Responsivnes -</h6>
                    <label className='button desk-btn' htmlFor="desktopView">Desktop</label>
                    <label className='button mob-btn' htmlFor="mobileView">Mobile</label>
                  </section>
                  <section>
                    <h6>Color Mode -</h6>
                    <label className='button light' htmlFor="lightMode">Light</label>
                    <label className='button dark' htmlFor="darkMode">Dark</label>
                  </section>
                </div>
                <div className='desktop-view'>
                  <Image
                    className='desktop-view light'
                    src="/projects/goodwin-desk-light.jpg"
                    alt='Goodwin desktop'
                    width={635}
                    height={352}
                  />
                  <Image
                    className='desktop-view dark'
                    src="/projects/goodwin-desk-dark.jpg"
                    alt='Goodwin desktop'
                    width={635}
                    height={352}
                  />
                </div>
                <div className='mobile-view'>
                  <Image
                    className='desktop-view light'
                    src="/projects/goodwin-mobile-light.jpg"
                    alt='Goodwin desktop'
                    width={210}
                    height={372}
                  />
                  <Image
                    className='desktop-view dark'
                    src="/projects/goodwin-mobile-dark.jpg"
                    alt='Goodwin desktop'
                    width={210}
                    height={372}
                  />
                </div>
              </li>
            </ul>

            <div ref={el => colLeftRefs.current[2] = el} className={`col-left ${highlightIndex >= 2 ? 'highlight' : ''}`}>
              <h4>Markup Specialist</h4>
              <em>Jan 2018 - Dec 2019</em>
              <strong>Click2Sure</strong>
              <Image
                    className='desktop-view dark'
                    src="/company-logos/click2sure.jpg"
                    alt='Goodwin desktop'
                    width={39}
                    height={39}
                  />
            </div>
            <ul>
              <li>
                Collaborated with a cross-functional team to design and develop user interfaces for the insurance company's platform.
              </li>
              <li>
                Utilized Angular to create responsive and visually appealing user interfaces, ensuring a seamless user experience.
              </li>
              <li>
                Developed and maintained reusable Angular components to streamline the development process, enhancing code efficiency and consistency.
              </li>
              <li>
                Conducted thorough testing and debugging to identify and rectify any issues or inconsistencies in the user interface.
              </li>
              <li>
                Translated wireframes and design mockups into functional HTML and CSS.
              </li>
              <li>
                Implemented best practices in HTML and CSS to optimize web page performance and ensure compatibility across various browsers.
              </li>
              <li>
              <Image
                    className='desktop-view dark'
                    src="/projects/click2sure.jpg"
                    alt='Goodwin desktop'
                    width={635}
                    height={358}
                  />
              </li>
            </ul>
            <div ref={el => colLeftRefs.current[3] = el} className={`col-left ${highlightIndex >= 3 ? 'highlight' : ''}`}>
              <h4>Markup Specialist <br /> WordPress Developer</h4>
              <em>Mar 2013 - Mar 2014</em>
              <strong>SPILL, Barsamini Toort</strong>
              
              <Image
                    className='desktop-view dark'
                    src="/company-logos/spill.jpg"
                    alt='Goodwin desktop'
                    width={39}
                    height={39}
                  />
            </div>
            <ul>
              <li>
                Developed WordPress templates from scratch for blogs, news, and portfolio websites.
              </li>
              <li>
                Bugfixed and redesigned existing projects.
              </li>
              <li>
                Developed cross-browser compatible code to ensure the product looked identical on multiple modern and old browsers
              </li>
              <li>
                Designed and implemented a custom markup structure for a Tumblr blog, aligning it seamlessly with the provided design.
              </li>
              <li>
              <Image
                    className='desktop-view dark'
                    src="/projects/isamo.jpg"
                    alt='Goodwin desktop'
                    width={635}
                    height={358}
                  />
                     <Image
                    className='desktop-view dark'
                    src="/projects/mungo-maud.jpg"
                    alt='Goodwin desktop'
                    width={635}
                    height={358}
                  />
              </li>
            </ul>
            <div ref={el => colLeftRefs.current[4] = el} className={`col-left ${highlightIndex >= 4 ? 'highlight' : ''}`}>
              <h4>Markup Specialist </h4>
              <em>Oct 2011 - Nov 2012</em>
              <strong>Aragast Ben</strong>
            </div>
            <ul>
              <li>
                Redesigned the UI and refined the layouts of the Cafe4tune social network.
              </li>
              <li>
                Developed cross-browser compatible code to ensure the product looked identical on multiple modern and old browsers (IE7, IE8).
              </li>
<li>
<Image
                    className='desktop-view dark'
                    src="/projects/cafe4tune.jpg"
                    alt='Goodwin desktop'
                    width={635}
                    height={358}
                  />
</li>
            </ul>
            <div ref={el => colLeftRefs.current[5] = el} className={`col-left ${highlightIndex >= 5 ? 'highlight' : ''}`}>
              <h4>WordPress Developer</h4>
              <em>Sep 2010 - Jul 2011</em>
              <strong>NexusLab</strong>
              <Image
                    className='desktop-view dark'
                    src="/company-logos/nexuslab.jpg"
                    alt='Goodwin desktop'
                    width={39}
                    height={39}
                  />
            </div>
            <ul>
              <li>
                Created pixel-perfect, cross-browser compatible WordPress themes based on provided designs.
              </li>
              <li>
                Ensured support for IE6, IE7, and IE8 browsers.
              </li>
              <li>
                Optimized styles and content image assets for improved performance.
              </li>
              <li>
                Conducted bug fixes and implemented additional features in existing themes.
              </li>
            </ul>
          </div>


          <div className='btn-holder'>

            <Link href="/posts/dev-projects">
              <button className='flex items-center h-full pr-2 dark:bg-primary rounded-3xl flex justify-center align-center p-2 w-24 h-10 transition'>
                More Projects
              </button>

            </Link>
          </div>
        </div>
        <h2>Developemt posts</h2>
        <ul className="w-full">
          {devProjects.map((post) => (
            <li
              key={post.filePath}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <div> {post.data.label}</div>

              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
              >
                <span className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.data.date && <p className="...">{post.data.date}</p>}
                  <h2 className="...">{post.data.title}</h2>
                  {post.data.description && <p className="...">{post.data.description}</p>}
                  {post.data.thumbnail && (
                    <Image
                      src={post.data.thumbnail}
                      alt={`${post.data.title} Thumbnail`}
                      width={150}
                      height={150}
                    />
                  )}
                  <ArrowIcon className="mt-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
      <Footer copyrightText={globalData.footerText} />

    </Layout>

  );
}

export function getStaticProps() {
  const allPosts = getPosts(); // Get all posts
  const devProjects = getPosts('dev-projects'); // Get posts with the 'design' tag
  const designProjects = getPosts('design'); // Get posts with the 'design' tag

  const globalData = getGlobalData();

  return {
    props: {
      allPosts,
      devProjects,
      designProjects,
      globalData,
    },
  };
}
