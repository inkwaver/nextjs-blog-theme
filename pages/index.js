import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import Image from 'next/image';
import ArrowIcon from '../components/ArrowIcon';
import { ResearchIcon, SitemapIcon } from '../components/Icons/DesignFlowIcons';


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
          <h2 className='big-title color-n4 mb-39'>Design Flow</h2>
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
          <h2 className='big-title color-n4 mb-39'>Design Experience</h2>


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
          <h2 className='big-title color-n4 mb-39'>Development Skills</h2>
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
        <div className='dev-exp mb-102'>
          <h2 className='big-title color-n4 mb-39'>Development Experience</h2>
          <div className='project-block'>
            <div className='col-left'>
              <h2>Smartbet · UI Developer</h2>
              <strong>Smartbet · Full-time</strong>
              <em>Sep 2020 - Jul 2021 · 11 mos</em>
              <p>Location: Yerevan, Armenia · On-site</p>
            </div>
            <ul>
              <li>
                Managed multiple WordPress-based websites, ensuring functionality, performance, and visual appeal.
              </li>
              <li>
                Managed multiple WordPress-based websites, ensuring functionality, performance, and visual appeal.
              </li>
              <li>
                Managed multiple WordPress-based websites, ensuring functionality, performance, and visual appeal.
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
