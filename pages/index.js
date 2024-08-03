import { useEffect } from 'react';
import { getPosts } from '../utils/mdx-utils';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import Image from 'next/legacy/image';
import IconWithLabel from '../components/parts/IconWithLabel';
import ProjectExperience from '../components/parts/ProjectExperience';
import DesignFlowCard from '../components/parts/DesignFlowCard'; // Ensure this path is correct

import {
  ResearchIcon,
  SitemapIcon,
  Wireframing,
  DesignSys,
  Prototyping,
  DesExp,
  InfArch,
} from '../components/Icons/DesignFlowIcons'; // Ensure these icons are correctly exported

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
        link: '/posts/show-case-beargeek',
      },
      {
        path: '/projects/beargeek.jpg',
        alt: 'Festberg Showcase',
        link: '/posts/show-case-beargeek',
      },
    ],
  };

  useEffect(() => {
    // Intersection Observer for `intersect-section`
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('intersect-active');
          } else {
            entry.target.classList.remove('intersect-active');
          }
        });
      },
      { threshold: 0.6 }
    );

    // Observe elements with the class `intersect-section`
    document.querySelectorAll('.intersect-section').forEach((section) => {
      observer.observe(section);
    });

    // Handling sticky headers
    const handleScroll = () => {
      document.querySelectorAll('.is-title-sticky').forEach((header) => {
        const stickyPosition = header.getBoundingClientRect().top;
        const isSticky = stickyPosition <= 0;
        if (isSticky) {
          header.classList.add('title-sticky');
        } else {
          header.classList.remove('title-sticky');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup on component unmount
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout>
      <Header name={globalData.name} />
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <main className="w-full home-wrapper main">
        <section className="design-section">
          <h2 className="big-title design-heading mb-39 sticky-header z-index-12 wrapper-main">
            <IconWithLabel Icon={DesExp} label="Design" />
          </h2>
          <div className="viewport-h flex-v-middle intersect-section">
            <p className="content-dec wrapper-main">
              "My design process is built on a series of essential steps that
              ensure success. Missing any of these can lead to wasted time and
              effort. For a detailed example, see how these steps were
              meticulously implemented in the Real Estate case study."
            </p>
          </div>

          <div className="design-flow mb-102 wrapper-main viewport-h intersect-section">
            <h2 className="big-title color-n3 mb-39 sticky-header body-bg is-title-sticky">
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

          <div className="project-part home-snipet mb-102 design-exp wrapper-main viewport-h intersect-section">
            <h2 className="big-title color-n3 mb-39 sticky-header body-bg is-title-sticky">
              <span className="invisible mr-15">
                <IconWithLabel Icon={DesExp} label="Design" />
              </span>
              Projects
            </h2>
            <div className="project-img max-wdth-1500">
              {images.smartbet.map((image, index) => (
                <a key={index} href={image.link} rel="noopener noreferrer">
                  <span className="img-holder">
                    <Image
                      layout="fill"
                      src={image.path}
                      alt={image.alt}
                      loading="lazy"
                    />
                  </span>
                  <figcaption>{image.alt}</figcaption>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="dev-section">
          <h2 className="big-title design-heading mb-39 sticky-header z-index-12 wrapper-main">
            <IconWithLabel Icon={DesExp} label="Dev" />
          </h2>
          <div className="mb-102 wrapper-main viewport-h intersect-section">
            <h2 className="big-title color-n3 mb-39 sticky-header body-bg is-title-sticky">
              <span className="invisible mr-15">
                <IconWithLabel Icon={DesExp} label="Dev" />
              </span>
              Skills
            </h2>
            <ul className="subtitle">
              <li>Front-End Technologies: HTML, CSS, JavaScript</li>
              <li>Front-End Frameworks: React, Angular</li>
              <li>
                WordPress Development: Theme development, Gutenberg blocks
              </li>
              <li>Responsive Design: Mobile and web optimization</li>
              <li>CSS Layout: Flexbox, CSS Grid</li>
              <li>
                Cross-Browser Compatibility: Ensuring consistent rendering on
                various browsers
              </li>
              <li>
                Performance Optimization: Asset optimization for web speed
              </li>
              <li>
                Theming and Dark/Light Modes: Implementing theme systems with
                light and dark modes
              </li>
              <li>
                Testing and Debugging: Ensuring seamless user experience through
                rigorous testing
              </li>
            </ul>
          </div>
          <div id="devExp" className="dev-exp wrapper-main viewport-h intersect-section">
            <h2 className="big-title color-n3 mb-39 sticky-header body-bg is-title-sticky">
              <span className="invisible mr-15">
                <IconWithLabel Icon={DesExp} label="Dev" />
              </span>
              Experience
            </h2>
            <ProjectExperience />
          </div>
        </section>
      </main>
      <Footer copyrightText={globalData.footerText} />
    </Layout>
  );
}

export function getStaticProps() {
  const allPosts = getPosts();
  const globalData = getGlobalData();

  return {
    props: {
      allPosts,
      globalData,
    },
  };
}
