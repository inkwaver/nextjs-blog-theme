import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function DevProjects({ posts, globalData, designPosts }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <Sidebar name={globalData.name} designPosts={designPosts}></Sidebar>

      <main className="w-full wrapper-sec main">
      <article className='single'>
        <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1>
       <div>hello projects</div>
       </article>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const allPosts = getPosts(); // Get all posts
  const developmentPosts = getPosts('development'); // Get posts with the 'development' tag
  const designPosts = getPosts('design'); // Get posts with the 'design' tag

  const globalData = getGlobalData();

  return {
    props: {
      allPosts,
      developmentPosts,
      designPosts,
      globalData,
    },
  };
}
