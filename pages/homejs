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
import Link from 'next/link';
import {
  ResearchIcon,
  SitemapIcon,
  Wireframing,
  DesignSys,
  Prototyping,
  DesExp,
  InfArch,
  DevExp,
  RenderQuality,
  Speed,
  Seo,
} from '../components/Icons/DesignFlowIcons'; // Ensure these icons are correctly exported

export default function Index({ globalData }) {
  const images = {
    smartbet: [
      // {
      //   path: '/projects/real-estate.jpg',
      //   alt: 'Real Estate Case study',
      //   link: '/posts/case-study-real-estate-brief',
      // },
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
    const idToButtonClass = {
      devSkills: 'dev-skills',
      devExp: 'dev-exp',
      journey: 'journey',
      designFlow: 'designflow',
      designProjets: 'design-projets',
    };

    const handleNavLinkActive = (entries) => {
      let activeEntry = null;

      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        // const buttonClass = idToButtonClass[sectionId];

        console.log(
          'Processing section:',
          sectionId || '<no id>',
          'Is intersecting:',
          entry.isIntersecting,
          'Entry bounding client rect:',
          entry.boundingClientRect
        );

        if (entry.isIntersecting) {
          entry.target.classList.add('intersect-active');
        } else {
          entry.target.classList.remove('intersect-active');
        }

        if (entry.isIntersecting && (!activeEntry || entry.boundingClientRect.top < activeEntry.boundingClientRect.top)) {
          activeEntry = entry;
        }
      });

      if (activeEntry) {
        const activeSectionId = activeEntry.target.id;
        const activeButtonClass = idToButtonClass[activeSectionId];

        Object.values(idToButtonClass).forEach((cls) => {
          const button = document.querySelector(`.${cls}`);
          button?.classList.remove('active');
        });

        console.log('Activating button:', activeButtonClass);

        if (activeButtonClass) {
          document.querySelector(`.${activeButtonClass}`)?.classList.add('active');
        }
      }
    };

    const observer = new IntersectionObserver(handleNavLinkActive, {
      threshold: [0.1, 0.5, 0.9],
      rootMargin: '10px 0px -10px 0px',
    });

    const sections = document.querySelectorAll('#devSkills, #devExp, #journey, #designFlow, #designProjets');

    sections.forEach((section) => {
      observer.observe(section);
    });

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

      // Ensure active class is removed when at the top of the page
      if (window.scrollY === 0) {
        Object.values(idToButtonClass).forEach((cls) => {
          const button = document.querySelector(`.${cls}`);
          button?.classList.remove('active');
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <Layout>
      <Header name={globalData.name} />
      <SEO title={globalData.name} description={globalData.blogTitle} />

      {/* <nav className='content-nav wrapper-main '>
        <div className='nav-group nav-dev'>
          <Link className="button dev dev-skills" href="#devSkillsSection">Skills</Link>
          <Link className="button dev dev-exp" href="#devExp">Experience</Link>
        </div>
        <div className='nav-group nav-design'>
          <Link className="button design journey" href="#journeySection">Journey</Link>
          <Link className="button design designflow" href="#designFlow">Flow</Link>
          <Link className="button design design-projets" href="#designProjets">Projects</Link>
        </div>

      </nav> */}

      <main className="w-full home-wrapper main content-slide-container">
      <div className='content-navigation '>
        <div className='navigation-group ng-dev'>
            <Link href="/">Skills</Link>
            <Link href="/">Experience</Link>
          <h3>Development</h3>

        </div>
        <div className='navigation-group ng-design'>

            <Link href="/">Journey</Link>
            <Link href="/">Flow</Link>
            <Link href="/">Project</Link>
        <h3>Design</h3>

        </div>
      </div>
      <div className='section first intersect-section'>

        <div className='hero-section'>hero</div>
        
      

        <div className='graph-section'>
          <div className='g1'></div>
          <div className='g2'></div>
        </div>

        <div className='journey-section'>
          journey
        </div>

      </div>
      <div className='section '>
        1
      </div>
      <div className='section'>
        1
      </div>
      <div className='section'>
        1
      </div>
      <div className='section'>
        1
      </div>
      <div className='section'>
        1
      </div>
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