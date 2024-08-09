import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ImageViewerModal from '../ImageViewerModal';

const ProjectExperience = () => {
  const [responsiveMode, setResponsiveMode] = useState('desktop');
  const [colorMode, setColorMode] = useState('dark');
  const colLeftRefs = useRef([]);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleResponsiveChange = (event) => {
    setResponsiveMode(event.target.value);
  };

  const handleColorModeChange = (event) => {
    setColorMode(event.target.value);
  };

  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.3, // trigger when 30% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      let newHighlightIndex = highlightIndex;
      entries.forEach((entry) => {
        const index = colLeftRefs.current.indexOf(entry.target);
        if (entry.isIntersecting) {
          newHighlightIndex = index;
        } else if (
          !entry.isIntersecting &&
          entry.boundingClientRect.top > 0 &&
          window.scrollY < lastScrollTop
        ) {
          // Scrolling up and element is out of view
          newHighlightIndex = index - 1;
        }
      });

      if (newHighlightIndex !== highlightIndex) {
        setHighlightIndex(newHighlightIndex);
      }
    }, options);

    colLeftRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    /* eslint-disable */
    return () => {
      colLeftRefs.current.forEach((ref) => {
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

  return (         <div className="project-block">
    <div
      ref={(el) => (colLeftRefs.current[0] = el)}
      className={`col-left ${highlightIndex >= 0 ? 'highlight' : ''}`}
    >


      <h4>
        Webinos Inc, Freelance <span className="company-logo">WB</span>
      </h4>
      <em>Jun 2022 - Feb 2023</em>
      <strong>WordPress Developer</strong>
    </div>
    <ul>
      <li>
        Managed multiple WordPress-based websites, ensuring
        functionality, performance, and visual appeal.
      </li>
      <li>
        Developed custom Gutenberg blocks and fields to empower clients
        with intuitive site management capabilities, enhancing their
        control over content and layout.
      </li>
      <li>
        Collaborated with clients to understand their specific
        requirements and extend website functionality accordingly,
        providing tailored solutions to meet their needs.
      </li>
      <li>
        Incorporated client-requested features and improvements into
        existing projects, contributing to customer satisfaction and
        project success.
      </li>
      <li>
        {/* <ImageViewerModal
          src="/projects/CaseStudygif.gif"
          alt="Martingale Assets"
          buttonText="View Website"
          buttonUrl="https://www.martingale.com/"
        /> */}
        <ImageViewerModal
          src="/projects/MartingaleAssets.jpg"
          alt="Martingale Assets"
          buttonText="View Website"
          buttonUrl="https://www.martingale.com/"
        />
        <ImageViewerModal
          src="/projects/StayActiveRehab.jpg"
          alt="Stay Active Rehab"
          buttonText="View Website Snapshot"
          buttonUrl="https://www.stayactiverehab.com/"
        />
      </li>
    </ul>

    <div
      ref={(el) => (colLeftRefs.current[1] = el)}
      className={`col-left ${highlightIndex >= 1 ? 'highlight' : ''}`}
    >
      <h4>
        SmartBet
        <Image
          src="/company-logos/smartbet_io.jpg"
          alt="Goodwin desktop"
          width={39}
          height={39}
        />
      </h4>
      <em>Sep 2020 - Jul 2021</em>
      <strong>Markup Specialist</strong>
    </div>
    <ul>
      <li>
        Led the comprehensive redesign of the primary project's user
        interface, focusing on enhancing user experience and visual
        appeal.
      </li>
      <li>
        Implemented a theming system that allowed for seamless color
        scheme changes across the entire site using a single file.
      </li>
      <li>
        Ensured each color scheme featured both dark and light mode
        options, catering to user preferences.
      </li>
      <li>
        Developed a mobile-responsive version of the website, ensuring
        it met criteria for easy theming and dark/light modes.
      </li>
      <li className="project-overview">
        <input
          readOnly
          checked={responsiveMode === 'desktop'}
          id="desktopView"
          name="responsive"
          type="radio"
          value="desktop"
          onChange={handleResponsiveChange}
        />
        <input
          checked={responsiveMode === 'mobile'}
          id="mobileView"
          name="responsive"
          type="radio"
          value="mobile"
          onChange={handleResponsiveChange}
        />
        <input
          readOnly
          checked={colorMode === 'dark'}
          id="darkMode"
          name="color"
          type="radio"
          value="dark"
          onChange={handleColorModeChange}
        />
        <input
          checked={colorMode === 'light'}
          id="lightMode"
          name="color"
          type="radio"
          value="light"
          onChange={handleColorModeChange}
        />
        <div className="view-mode">
          <section>
            {/* <h6>Responsiveness -</h6> */}
            <label className="button desk-btn" htmlFor="desktopView">
              Desktop
            </label>
            <label className="button mob-btn" htmlFor="mobileView">
              Mobile
            </label>
          </section>
          <section>
            <h6>Color Mode -</h6>
            <label className="button light" htmlFor="lightMode">
              Light
            </label>
            <label className="button dark" htmlFor="darkMode">
              Dark
            </label>
          </section>
        </div>
        <div
          className={`desktop-view ${
            responsiveMode === 'desktop' ? '' : 'hidden'
          }`}
        >
          <div className='desktop-bar toolbar-view'>
            <span className='device-name'>Desktop -   1200</span>
          </div>
          <Image
            className={`desktop-view ${
              colorMode === 'light' ? 'light' : 'dark'
            }`}
            src={`/projects/goodwin-desk-${colorMode}.jpg`}
            alt="Goodwin desktop"
            width={635}
            height={352}
          />
        </div>
        <div
          className={`mobile-view ${
            responsiveMode === 'mobile' ? '' : 'hidden'
          }`}
        >
           <div className='desktop-bar toolbar-view'>
            <span className='device-name'>Mobile -   320</span>
          </div>
          <Image
            className={`mobile-view ${
              colorMode === 'light' ? 'light' : 'dark'
            }`}
            src={`/projects/goodwin-mobile-${colorMode}.jpg`}
            alt="Goodwin mobile"
            width={210}
            height={372}
          />
        </div>
      </li>
    </ul>

    <div
      ref={(el) => (colLeftRefs.current[2] = el)}
      className={`col-left ${highlightIndex >= 2 ? 'highlight' : ''}`}
    >
      <h4>
        Click2Sure
        <Image
          src="/company-logos/click2sure.jpg"
          alt="Goodwin desktop"
          width={39}
          height={39}
        />
      </h4>
      <em>Jan 2018 - Dec 2019</em>
      <strong>Markup Specialist</strong>
    </div>
    <ul>
      <li>
        Collaborated with a cross-functional team to design and develop
        user interfaces for the insurance company's platform.
      </li>
      <li>
        Utilized Angular to create responsive and visually appealing
        user interfaces, ensuring a seamless user experience.
      </li>
      <li>
        Developed and maintained reusable Angular components to
        streamline the development process, enhancing code efficiency
        and consistency.
      </li>
      <li>
        Conducted thorough testing and debugging to identify and rectify
        any issues or inconsistencies in the user interface.
      </li>
      <li>
        Translated wireframes and design mockups into functional HTML
        and CSS.
      </li>
      <li>
        Implemented best practices in HTML and CSS to optimize web page
        performance and ensure compatibility across various browsers.
      </li>
      <li>
        <Image
          className="desktop-view dark"
          src="/projects/click2sure.jpg"
          alt="Goodwin desktop"
          width={635}
          height={358}
        />
      </li>
    </ul>
    <div
      ref={(el) => (colLeftRefs.current[3] = el)}
      className={`col-left ${highlightIndex >= 3 ? 'highlight' : ''}`}
    >
      <h4>
        SPILL, Barsamini Toort
        <Image
          src="/company-logos/spill.jpg"
          alt="Goodwin desktop"
          width={39}
          height={39}
        />
      </h4>
      <em>Mar 2013 - Mar 2014</em>
      <strong>
        Markup Specialist <br /> WordPress Developer
      </strong>
    </div>
    <ul>
      <li>
        Developed WordPress templates from scratch for blogs, news, and
        portfolio websites.
      </li>
      <li>Bugfixed and redesigned existing projects.</li>
      <li>
        Developed cross-browser compatible code to ensure the product
        looked identical on multiple modern and old browsers
      </li>
      <li>
        Designed and implemented a custom markup structure for a Tumblr
        blog, aligning it seamlessly with the provided design.
      </li>
      <li>
        <ImageViewerModal
          src="/projects/isamo.jpg"
          alt="Iso Wordpress Blog"
          buttonText="View Website Snapshot"
          buttonUrl="https://web.archive.org/web/20141208205146/http://blog.isa-mo.com/"
        />
        {/* <Image
          className="desktop-view dark"
          src="/projects/isamo.jpg"
          alt="Goodwin desktop"
          width={635}
          height={358}
        /> */}
        <Image
          className="desktop-view dark"
          src="/projects/mungo-maud.jpg"
          alt="Goodwin desktop"
          width={635}
          height={358}
        />
      </li>
    </ul>
    <div
      ref={(el) => (colLeftRefs.current[4] = el)}
      className={`col-left ${highlightIndex >= 4 ? 'highlight' : ''}`}
    >
      <h4>
        Mikayel inc <span className="company-logo">MI</span>
      </h4>
      <em>Oct 2011 - Nov 2012</em>
      <strong>Wordpress Dev (freelance)</strong>
    </div>
    <ul>
      <li>
        Managed multiple WordPress-based websites, ensuring
        functionality, performance, and visual appeal.
      </li>
      <li>
        Developed custom WP Shortcodes to empower clients with intuitive
        site management capabilities, enhancing their control over
        content and layout.
      </li>
      <li>
        Collaborated with clients to understand their specific
        requirements and extend website functionality accordingly,
        providing tailored solutions to meet their needs.
      </li>
      <li>
        Incorporated client-requested features and improvements into
        existing projects, contributing to customer satisfaction and
        project success.
      </li>
      <li>
        <ImageViewerModal
          src="/projects/butterfield.png"
          alt="butterfield"
          buttonText="View Website Snapshot"
          buttonUrl="https://web.archive.org/web/20141220035155mp_/http://www.butterfield.com/"
        />
      </li>
      <li>
        <ImageViewerModal
          src="/projects/esfcamps.jpg"
          alt="butterfield"
          buttonText="View Website Snapshot"
          buttonUrl="https://web.archive.org/web/20141223010029/http://www.esfcamps.com/"
        />
      </li>
    </ul>
    <div
      ref={(el) => (colLeftRefs.current[5] = el)}
      className={`col-left ${highlightIndex >= 5 ? 'highlight' : ''}`}
    >
      <h4>
        Aragast Ben <span className="company-logo">AB</span>
      </h4>
      <em>Oct 2011 - Nov 2012</em>
      <strong>Markup Specialist </strong>
    </div>
    <ul>
      <li>
        Redesigned the UI and refined the layouts of the Cafe4tune
        social network.
      </li>
      <li>
        Developed cross-browser compatible code to ensure the product
        looked identical on multiple modern and old browsers (IE7, IE8).
      </li>
      <li>
        <Image
          className="desktop-view dark"
          src="/projects/cafe4tune.jpg"
          alt="Goodwin desktop"
          width={635}
          height={358}
        />
      </li>
    </ul>
    <div
      ref={(el) => (colLeftRefs.current[6] = el)}
      className={`col-left ${highlightIndex >= 6 ? 'highlight' : ''}`}
    >
      <h4>
        NexusLab{' '}
        <Image
          src="/company-logos/nexuslab.jpg"
          alt="Goodwin desktop"
          width={39}
          height={39}
        />
      </h4>
      <em>Sep 2010 - Jul 2011</em>
      <strong>WordPress Developer</strong>
    </div>
    <ul>
      <li>
        Created pixel-perfect, cross-browser compatible WordPress themes
        based on provided designs.
      </li>
      <li>Ensured support for IE6, IE7, and IE8 browsers.</li>
      <li>
        Optimized styles and content image assets for improved
        performance.
      </li>
      <li>
        Conducted bug fixes and implemented additional features in
        existing themes.
      </li>
      <li>
        <ImageViewerModal
          src="/projects/ada.jpg"
          alt="Ada Minasyan"
          buttonText="View Website Snapshot"
          buttonUrl="https://web.archive.org/web/20130523110823/http://adaminasyan.com/"
        />
        <ImageViewerModal
          src="/projects/leonela.jpg"
          alt="Ada Minasyan"
          buttonText="View Website Snapshot"
          buttonUrl="https://web.archive.org/web/20130523110823/http://adaminasyan.com/"
        />
        <ImageViewerModal
          src="/projects/axon.jpg"
          alt="Ada Minasyan"
          buttonText="View Website Snapshot"
          buttonUrl="https://web.archive.org/web/20130523110823/http://adaminasyan.com/"
        />
      </li>
    </ul>
  </div>

  );
};

export default ProjectExperience;
