// import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getPosts } from '../utils/mdx-utils';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import Sidebar from '../components/Sidebar';
// import Layout, { GradientBackground } from '../components/Layout';
import Layout from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import Image from 'next/legacy/image';
// import ArrowIcon from '../components/ArrowIcon';
import ImageViewerModal from '../components/ImageViewerModal';
import DesignFlowCard from '../components/parts/DesignFlowCard';
import IconWithLabel from '../components/parts/IconWithLabel';
import ProjectExperience from '../components/parts/ProjectExperience';
import {
  ResearchIcon,
  SitemapIcon,
  DevExp,
  InfArch,
  Wireframing,
  DesignSys,
  Prototyping,
  DesExp,
} from '../components/Icons/DesignFlowIcons';

// export default function Index({ devProjects, designProjects, globalData }) {
export default function Index({ globalData }) {
  const images = {
    smartbet: [
      {
        path: '/projects/real-estate.jpg',
        alt: 'Real Estate Case study',
        link: '/posts/case-study-real-estate-brief',
      },
      {
        path: '/projects/festberg.jpg',
        alt: 'Festberg Showcase',
        link: '/posts//show-case-beargeek',
      },
      {
        path: '/projects/beargeek.jpg',
        alt: 'Festberg Showcase',
        link: '/posts/show-case-beargeek',
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
        <section className="design-section">
          <h2 className="big-title design-heading  mb-39 sticky-header z-index-12  wrapper-main">
            <IconWithLabel Icon={DesExp} label="Design" />
          </h2>
          <div className="viewport-h flex-v-middle">
            <p className="content-dec wrapper-main">
              "My design process is built on a series of essential steps that
              ensure success. Missing any of these can lead to wasted time and
              effort. For a detailed example, see how these steps were
              meticulously implemented in the Real Estate case study."
            </p>
          </div>

          <div className="design-flow mb-102 wrapper-main viewport-h ">
            <h2 className="big-title color-n3 mb-39 sticky-header body-bg">
              <span className="invisible mr-15">
                <IconWithLabel Icon={DesExp} label="Design" />
              </span>
              Flow
            </h2>
            <ul className="max-wdth-1500">
              <DesignFlowCard
                Icon={ResearchIcon}
                title="Research"
                description="Extensive research on similar websites to gather UX insights and identify important components."
              />
              <DesignFlowCard
                Icon={SitemapIcon}
                title="Sitemap"
                description="Detailed sitemap and information architecture to understand and define the key sections of the platform."
              />
              <DesignFlowCard
                Icon={InfArch}
                title="Information Architecture"
                description="Analyzed and reorganized the information architecture to ensure logical and user-friendly navigation."
              />
              <DesignFlowCard
                Icon={Wireframing}
                title="Wireframing"
                description="Informational wireframes focusing on the possible future look and functionality of the platform."
              />
              <DesignFlowCard
                Icon={DesignSys}
                title="Design System"
                description="Established a design system using an atomic design approach, ensuring consistency and efficiency."
              />
              <DesignFlowCard
                Icon={Prototyping}
                title="Figma Prototyping"
                description="Interactive prototypes in Figma to visualize and test the design, allowing for improvements based on user feedback."
              />
            </ul>
          </div>

          <div className="project-part home-snipet mb-102 design-exp wrapper-main viewport-h ">
            <h2 className="big-title color-n3 mb-39 sticky-header body-bg">
              {' '}
              <span className="invisible mr-15">
              <IconWithLabel Icon={DesExp} label="Design" />
              </span>
              Projects
            </h2>
            <div className="project-img max-wdth-1500">
              {images.smartbet.map((image, index) => (
                <a
                  key={index}
                  href={image.link}
                  // target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="img-holder">
                    <img
                      layout="fill"
                      src={image.path}
                      alt={image.alt}
                      loading="lazy"
                      // placeholder="blur"
                      // blurDataURL={image.path}
                    />
                  </span>

                  <figcaption>{image.alt}</figcaption>
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="mb-102 wrapper-main viewport-h">
          <h2 className="big-title color-n3 mb-39">Development Skills</h2>
          <ul className="subtitle">
            <li>Front-End Technologies: HTML, CSS, JavaScript</li>
            <li>Front-End Frameworks: React, Angular</li>
            <li>WordPress Development: Theme development, Gutenberg blocks</li>
            <li>Responsive Design: Mobile and web optimization</li>
            <li>CSS Layout: Flexbox, CSS Grid</li>
            <li>
              Cross-Browser Compatibility: Ensuring consistent rendering on
              various browsers
            </li>
            <li>Performance Optimization: Asset optimization for web speed</li>
            <li>
              Theming and Dark/Light Modes: Implementing theme systems with
              light and dark modes
            </li>
            <li>
              Testing and Debugging: Ensuring seamless user experience through
              rigorous testing
            </li>
            <li>
              Testing and Debugging: Ensuring seamless user experience through
              rigorous testing
            </li>
          </ul>
        </div>
        <div id="devExp" className="dev-exp wrapper-main viewport-h">
        <h2 className="big-title color-n3 ">
                Experience{' '}
                <span className="icon-mid">
                  <DevExp />
                </span>
              </h2>
              <ProjectExperience />
          {/* 
          <div className='btn-holder'>

            <Link href="/posts/dev-projects">
              <button className='flex items-center h-full pr-2 dark:bg-primary rounded-3xl flex justify-center align-center p-2 w-24 h-10 transition'>
                More Projects
              </button>

            </Link>
          </div> */}
        </div>

        {/* <h2>Developemt posts</h2>
        <ul className="w-full">
          {designProjects.map((post) => (
            <li
              key={post.filePath}
              className="md:first:rounded-t-lg "
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
        </ul> */}
      </main>
      {/* <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      /> */}
      <Footer copyrightText={globalData.footerText} />
    </Layout>
  );
}
export function getStaticProps() {
  const allPosts = getPosts(); // Get all posts
  // const devProjects = getPosts('dev-projects'); // Get posts with the 'design' tag
  // const designProjects = getPosts('design'); // Get posts with the 'design' tag

  const globalData = getGlobalData();

  return {
    props: {
      allPosts,
      // devProjects,
      // designProjects,
      globalData,
    },
  };
}
