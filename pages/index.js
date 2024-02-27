import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';



export default function Index({ devProjects, globalData }) {
  const images = {
    smartbet: [
      {
        path: '/projects/Goodwin-Dark.png',
        alt: 'Goodwin Light Mode',
        link: 'https://example.com/link1',
      },
      {
        path: '/projects/Goodwin-Light.png',
        alt: 'Goodwin Light Mode',
        link: 'https://example.com/link2',
      },
    ],
  };
  return (

    <Layout>
      <Header name={globalData.name} />
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Sidebar name={globalData.name} devProjects={devProjects}></Sidebar>
      <main className="w-full wrapper-sec main">
        {/* <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1> */}
        {/* eslint-disable jsx-a11y/anchor-is-valid */}
        <div className="project-part home-snipet md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10  transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b " id="smartbet">
          <div className="project-descript">
            <h2>Smartbet · UI Developer</h2>
            <strong>Smartbet · Full-time</strong>
            <em>Sep 2020 - Jul 2021 · 11 mos</em>
            <p>Location: Yerevan, Armenia · On-site</p>

            <div className="project-img">
              {images.smartbet.map((image, index) => (
                <a key={index} href={image.link} target="_blank" rel="noopener noreferrer">
                  <img loading="lazy" src={image.path} alt={image.alt} />
                  <figcaption>{image.alt}</figcaption>
                </a>
              ))}
            </div>

            <ul>
              <li>
                - Led the comprehensive redesign of the primary project's user interface, with a specific focus on enhancing user experience and visual appeal. Key considerations included:
              </li>
              <li>
                - Easy theming: Implemented a theming system that allowed for seamless color scheme changes across the entire site using a single file.
              </li>
              <li>
                - Dark/light modes: Ensured that each color scheme featured both dark and light mode options, catering to user preferences.
              </li>
              <li>
                - Mobile optimization: Developed a mobile-responsive version of the website, ensuring that it met the criteria for easy theming and dark/light modes.
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

  const globalData = getGlobalData();

  return {
    props: {
      allPosts,
      devProjects,
      globalData,
    },
  };
}
