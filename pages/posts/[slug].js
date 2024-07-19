import { getGlobalData } from '../../utils/global-data';
import {
  getNextPostBySlug,
  getPostBySlug,
  getPreviousPostBySlug,
  postFilePaths,
  getPosts, // Ensure this function is correctly implemented to fetch posts based on tags or other criteria
} from '../../utils/mdx-utils';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';

const components = {
  a: CustomLink,
  Head,
  Image, // Add the Image component here
};

export default function PostPage({
  source,
  frontMatter,
  prevPost,
  nextPost,
  globalData,
  thumbnail,
  devProjects,
  designProjects,
  caseStudy,
}) {
  return (
    <Layout className="single">
      <SEO
        title={`${frontMatter.title} - ${globalData.name}`}
        description={frontMatter.description}
      />
      <Header className="single-header" name={globalData.name} />

      <article className=" site-structure main single">
        <header className='article-header'>
          <div className='wrapper-main'>

            {thumbnail && (
              <Image
                src={thumbnail}
                className="w-full h-auto mb-6"
                alt={`${frontMatter.title} Thumbnail`}
                width={672}
                height={350}
                loading="lazy"
              />
            )}

          </div>
        </header>
        <h1 className="wrapper-main">
          {frontMatter.title}
        </h1>
        {frontMatter.description && (
          <p className="wrapper-main">{frontMatter.description}</p>
        )}
        <main className='single-content wrapper-main'>
          <article className="content">
            <MDXRemote {...source} components={components} />
          </article>
          <Sidebar caseStudy={caseStudy} designProjects={designProjects} devProjects={devProjects} />
        </main>
        <div className="grid md:grid-cols-2  mt-12">
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          {prevPost && (
            <Link href={`/posts/${prevPost.slug}`}>
              {/* <a className="py-8 px-10 text-center md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg first last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col"> */}
              <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                Previous
              </p>
              <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                {prevPost.title}
              </h4>
              <ArrowIcon className="transform rotate-180 mx-auto md:mr-0 mt-auto" />
              {/* </a> */}
            </Link>
          )}

          { /* eslint-disable */
            nextPost && (
              <Link href={`/posts/${nextPost.slug}`}>
                {/* <a className="py-8 px-10 text-center md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col">
                <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                  Next
                </p>
                <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                  {nextPost.title}
                </h4>
                <ArrowIcon className="mt-auto mx-auto md:ml-0" />
              </a> */}
                <span className="py-8 px-10 text-center md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col">
                  <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                    Next
                  </p>
                  <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                    {nextPost.title}
                  </h4>
                  <ArrowIcon className="mt-auto mx-auto md:ml-0" />
                </span>
              </Link>
            )/* eslint-enable */}

        </div>
      </article>
      <Footer copyrightText={globalData.footerText} />

      {/* <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      /> */}

    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(params.slug);

  // Fetch designPosts and developmentPosts

  const devProjects = getPosts('dev-projects'); // Adjust this line as necessary
  const designProjects = getPosts('design'); // Adjust this line as necessary
  const caseStudy = getPosts('case-study'); // Adjust this line as necessary

  // Pass tag parameter if available
  const tag = data.tags && data.tags[0];
  const prevPost = getPreviousPostBySlug(params.slug, tag);
  const nextPost = getNextPostBySlug(params.slug, tag);

  // Include thumbnail information in props
  const thumbnail = data.thumbnail || null;

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      prevPost,
      nextPost,
      thumbnail,
      devProjects,
      designProjects,
      caseStudy,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths()
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
