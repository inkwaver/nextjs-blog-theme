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
  // DevExp,
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
        // const sectionId = entry.target.id;
        // const buttonClass = idToButtonClass[sectionId];

        // console.log(
        //   'Processing section:',
        //   sectionId || '<no id>',
        //   'Is intersecting:',
        //   entry.isIntersecting,
        //   'Entry bounding client rect:',
        //   entry.boundingClientRect
        // );

        if (entry.isIntersecting) {
          entry.target.classList.add('intersect-active');
        } else {
          entry.target.classList.remove('intersect-active');
        }

        if (
          entry.isIntersecting &&
          (!activeEntry ||
            entry.boundingClientRect.top < activeEntry.boundingClientRect.top)
        ) {
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

        // console.log('Activating button:', activeButtonClass);

        if (activeButtonClass) {
          document
            .querySelector(`.${activeButtonClass}`)
            ?.classList.add('active');
        }
      }
    };

    const observer = new IntersectionObserver(handleNavLinkActive, {
      threshold: [0.1, 0.5, 0.9],
      rootMargin: '10px 0px -10px 0px',
    });

    const sections = document.querySelectorAll(
      '#devSkills, #devExp, #journey, #designFlow, #designProjets'
    );

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

      <main className="w-full home-wrapper main content-slide-container">
        <nav className="content-nav wrapper-main ">
          <div className="nav-group nav-design">
            <Link className=" design journey" href="#journey">
              Journey
            </Link>
            <Link className=" design designflow" href="#designFlow">
              Flow
            </Link>
            <Link className=" design design-projets" href="#designProjets">
              Projects
            </Link>
            {/* <h3>Design</h3> */}
          </div>
          <div className="nav-group nav-dev">
            <Link className=" dev dev-skills" href="#devSkillsSection">
              Skills
            </Link>
            <Link className=" dev dev-exp" href="#devExp">
              Experience
            </Link>
            {/* <h3>Development</h3> */}
          </div>
        </nav>

        <div className="section first ">
          <div className="graph-section">
          <div className='wrapper-main relative hero-holder'>
          <div className="hero-section">
              <div className="image-holder">
                <Image
                  className="avatar"
                  src="/narek-ch.jpg"
                  alt="Image description"
                  width={192}
                  height={192}
                  // fill
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="description">
                <h2>
                  Narek Ch<span>ilingaryan</span>
                </h2>
                <p className="paragraph">
                  {/* I <strong>design interfaces</strong> and translate them into
                markup that's high-resolution, features smooth scrolling, is
                mobile-friendly, and prioritizes accessibility. */}
                  UI/UX Designer with over decade of <br />
                  Web Development experience.
                </p>
              </div>
            </div>
          </div>
          


            <div className="g1">
              {/*  */}
              <div className="exp-block dubai-state">
                {/* <Image
                  src="/company-logos/nexuslab.jpg"
                  alt="Goodwin desktop"
                  width={39}
                  height={39}
                /> */}
                <div className="comp-logo">DS</div>

                <h4>Dubai State</h4>
              </div>
              {/*  */}
              <div className="exp-block festberg">
                {/* <Image
                  src="/company-logos/nexuslab.jpg"
                  alt="Goodwin desktop"
                  width={39}
                  height={39}
                /> */}
                <div className="comp-logo">FB</div>
                <h4>FestBerg</h4>
              </div>
                {/*  */}
              <div className="exp-block beargeek">
                <div className="comp-logo">BG</div>

                <h4>Berargeek</h4>
              </div>
                {/*  */}
              <div className="graph">
                UI/UX Designer
                {/* UX Research, Wireframing, Design System, Atomic Design
                Prototyping */}
              </div>
            </div>


            <div className="g2">

            <div className="exp-block wi">
                <div className="comp-logo">WI</div>
                <h4>Webinos</h4>
              </div>

              <div className="exp-block sb">
                <Image
                  src="/company-logos/smartbet_io.jpg"
                  alt="Goodwin desktop"
                  width={39}
                  height={39}
                />
                <h4>SmartBet</h4>
              </div>

              <div className="exp-block cs">
                <Image
                  src="/company-logos/click2sure.jpg"
                  alt="Goodwin desktop"
                  width={39}
                  height={39}
                />
                <h4>Click2Sure</h4>
              </div>

              <div className="exp-block oa">
                <Image
                  src="/company-logos/onearmenia_logo.jpg"
                  alt="Goodwin desktop"
                  width={39}
                  height={39}
                />
                <h4>One Armenia</h4>
              </div>

              <div className="exp-block bt">
                <Image
                  src="/company-logos/spill.jpg"
                  alt="Goodwin desktop"
                  width={39}
                  height={39}
                />
                <h4>SPILL, Barsamini Toort</h4>
              </div>

              <div className="exp-block mi">
                <div className="comp-logo">MI</div>
                <h4>Mikayel inc</h4>
              </div>

              <div className="exp-block ab">
                <div className="comp-logo">AB</div>
                <h4>Aragast Ben</h4>
              </div>

              <div className="exp-block nl">
                <Image
                  src="/company-logos/nexuslab.jpg"
                  alt="Nexuslab"
                  width={32}
                  height={32}
                />
                <h4>NexusLab</h4>
              </div>

              <div className="graph">
                Web Developer
                {/* Markup Specialist " */}
                {/* {'Accesibilty, Seo, High resolution, Responsive, BEM,  '}" */}
              </div>
            </div>
            <div className="days">
              <div>2010</div>
              <div>2011</div>
              <div>2012</div>
              <div>2013</div>
              <div>2014</div>
              <div>2015</div>
              <div>2016</div>

              <div>2017</div>
              <div>2018</div>
              <div>2019</div>
              <div>2020</div>
              <div>2021</div>
              <div>2022</div>
              <div>2023</div>
              <div>2024</div>
            </div>
          </div>

          <section
            id="journey"
            className="journey-section intersect-section wrapper-main "
          >
            <h2 className="big-title color-n3 mb-39 sticky-header ">
           
                <IconWithLabel Icon={DesExp} label="Design" />
            
              Journey
            </h2>

            <p className="content-dec relative z-665">
              “My journey in web development began in 2010 as a markup
              specialist and WordPress team developer. Over the past 14 years,
              I’ve not only honed my technical skills but also cultivated a deep
              appreciation for design. Working closely with designers, I’ve been
              captivated by how they transform ideas into visually stunning
              experiences, which sparked my passion for design. This story is
              one of growth, evolution, and a continuous drive to merge
              technical precision with creative vision.”
              {/* "From transforming beautiful designs into code to mastering the nuances of layout and spacing, my journey has been one of both challenge and discovery. It wasn’t always easy—early on, designers and I would navigate countless revisions, struggling to achieve that perfect result. But over the years, I’ve learned to measure every space, to understand design proportions, and to bring sketches to life in code." */}
            </p>
          </section>
        </div>
        {/* <div className='section '>
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
        </div> */}

        <section className="design-section ">
          {/* <h2 className="big-title design-heading  sticky-header   wrapper-main is-title-sticky intro-title-sticky">
            <IconWithLabel Icon={DesExp} label="Design" />
          </h2> */}



          <div
            id="designFlow"
            className="design-flow mb-102 wrapper-main viewport-h intersect-section"
          >
            <h2 className="big-title color-n3 mb-39 sticky-header body-bg is-title-sticky">
          
                <IconWithLabel Icon={DesExp} label="Design" />
           
              Flow
            </h2>

            <p className="content-dec ">
              "My design process is built on a series of essential steps that
              ensure success. Missing any of these can lead to wasted time and
              effort. For a detailed example, see how these steps were
              meticulously implemented in the Real Estate case study."
            </p>

            <ul className="max-wdth-1500 flow-cards">
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

          <div
            id="designProjets"
            className="project-part home-snipet mb-102 design-exp wrapper-main viewport-h intersect-section"
          >
            <h2 className="big-title color-n3 mb-39 sticky-header body-bg is-title-sticky">
           
                <IconWithLabel Icon={DesExp} label="Design" />
           
              Projects
            </h2>

            <p className="content-dec ">
              "Welcome to my portfolio! Here, you'll discover a detailed
              exploration of my design process through a comprehensive case
              study. This project showcases my journey from research and
              strategy through to final implementation, with a focus on tackling
              complex design challenges, especially within WordPress.
            </p>
            {/* eslint-disable */}
            <div className="case-study-preview">
              <div className="projec-play">
                <div className="project-thumbnail">
                  <img loading="lazy" src="/gif/CaseStudygif.gif" />
                </div>
                <div className="project-details">
                  <h3>Case Study :Real Estate </h3>
                
                  <ul>
                    <li>
                      <strong>Objective:</strong> Enhance desktop experience for
                      a smoother apartment search.
                    </li>
                    <li>
                      <strong>Approach:</strong> Leveraged WordPress for a
                      clean, user-friendly redesign, focusing on simplicity and
                      functionality.
                    </li>
                    <li>
                      <strong>Research & Planning:</strong> Mapped out sitemaps,
                      wireframes, and conducted atomic design to streamline the
                      user journey.
                    </li>
                    <li>
                      <strong>Execution:</strong> Crafted prototypes and
                      documented the design process to ensure a smooth alpha
                      launch.
                    </li>
                    <li>
                      {' '}
                      <strong>Outcome: </strong>
                      Improved client satisfaction by simplifying the apartment
                      search experience.
                    </li>
                  </ul>
                  <a
                    className="button "
                    href="/posts/case-study-real-estate-brief"
                  >
                    View Case Study
                  </a>
                </div>
              </div>
            </div>
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

        <section id="devSkillsSection" className="dev-section">
          {/* <h2 className="big-title design-heading  sticky-header  wrapper-main is-title-sticky intro-title-sticky">
            <IconWithLabel Icon={DevExp} label="Development" />
          </h2> */}

          <div
            id="devSkills"
            className="design-flow  mb-102 wrapper-main viewport-h intersect-section first-container"
          >
            <h2 className="big-title color-n3 mb-39 sticky-header body-bg is-title-sticky">
            
                <IconWithLabel Icon={DesExp} label="Development" />
           
              Skills
            </h2>
            <p className="content-dec ">
              I specialize in crafting user interfaces with smooth interactions,
              animations, and semantic code. My approach emphasizes clean,
              minimal code to achieve optimal performance, ensuring smooth
              navigation even on lower-powered devices. While I am comfortable
              working with frameworks like React and Angular, my strengths lie
              in HTML5, CSS techniques, and producing well-documented,
              maintainable components rather than in complex logic or
              framework-specific expertise
            </p>
            <ul className="max-wdth-1500 flow-cards">
              <DesignFlowCard
                Icon={RenderQuality}
                title="Best UI & Render Quality"
                description="High-quality UIs are created with pixel-perfect precision, using semantic HTML and advanced CSS to ensure optimal rendering across all devices."
              />
              <DesignFlowCard
                Icon={Speed}
                title="Lightweight & Fast Loading"
                description="Clean, minimal code is written to ensure fast loading times and smooth performance, even on low-powered devices."
              />
              <DesignFlowCard
                Icon={Seo}
                title="SEO Optimized & Accessible"
                description="Optimized for SEO and accessibility with structured markup and ARIA labels, enhancing both search visibility and user experience."
              />

              {/* <DesignFlowCard
                Icon={Wireframing}
                title="Code Quality & Accessibility"
                description="Writing clean, semantic code with a focus on accessibility and smooth browser rendering on all devices."
              />
              <DesignFlowCard
                Icon={DesignSys}
                title="Pixel-Perfect Precision:"
                description="My commitment to pixel-perfect precision ensures that every detail aligns with the intended design."
              />
              <DesignFlowCard
                Icon={Prototyping}
                title="Design & Optimization Skills"
                description="Optimizing assets for web performance to ensure lightweight templates and smoother user experiences, combined with a keen eye for UI/UX design."
              />
              <DesignFlowCard
                Icon={Wireframing}
                title="Performance on Less Powerful Devices"
                description="Ensuring optimal performance and smooth user experiences, even on less powerful devices."
              />
              <DesignFlowCard
                Icon={DesignSys}
                title="Collaborative Teamwork & Communication"
                description="A collaborative team player with strong communication skills, able to listen and engage effectively."
              />
              <DesignFlowCard
                Icon={Prototyping}
                title="Familiarity with Front-End Frameworks"
                description="Skilled in utilizing front-end technologies like React and Angular to structure markup efficiently and build robust, maintainable interfaces."
              /> */}
            </ul>
          </div>

          <div
            id="devExp"
            className="dev-exp wrapper-main viewport-h intersect-section"
          >
            <h2 className="big-title color-n3 mb-39 sticky-header body-bg is-title-sticky">
             
                <IconWithLabel Icon={DesExp} label="Development" />
         
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
