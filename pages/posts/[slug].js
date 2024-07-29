import { getGlobalData } from '../../utils/global-data';
import {
  getNextPostBySlug,
  getPostBySlug,
  getPreviousPostBySlug,
  postFilePaths,
  getPosts,
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
// import Layout, { GradientBackground } from '../../components/Layout';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import PageCover from '../../components/PageCover';
import ImageViewerModal from '../../components/ImageViewerModal';
import {
 Prev,
 Next,
} from '../../components/Icons/DesignFlowIcons';
const components = {
  a: CustomLink,
  Head,
  Image,
  PageCover,
  ImageViewerModal,
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
  showCase,
}) {
  return (
    <Layout className="single">
      <SEO
        title={frontMatter.title ? `${frontMatter.title} - ${globalData.name}` : 'Default Title'}
        description={frontMatter.description || 'Default description'}
        ogImage={frontMatter.ogImage || '/avatar-nch.png'}
      />
      <Header className="single-header" name={globalData.name} />

      <article className="site-structure main single">
        <header className='article-header'>
          <div className='wrapper-main'>
            {/* Thumbnail rendering logic */}
            {/* {thumbnail && (
              <div className='wrapper-1400'>
                <Image
                  src={thumbnail}
                  className="w-full h-auto mb-6"
                  alt={`${frontMatter.title} Thumbnail`}
                  width={1400}
                  height={1008}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={thumbnail}
                />
              </div>
            )} */}
          </div>
        </header>
        <main className='single-content wrapper-main'>
          <article className="content">
            <MDXRemote {...source} components={components} />
            <div className="next-prev-posts">
          {prevPost && (
            <Link className='prev-post' href={`/posts/${prevPost.slug}`}>
              
              <span className="thumb-holder">
                {prevPost.thumbnail && (
                  <Image
                    src={prevPost.thumbnail}
                    className="w-full h-auto mb-6"
                    alt={`${prevPost.title} Thumbnail`}
                    width={197}
                    height={103}
                    loading="lazy"
                  />
                )}
              
              </span>
              <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
              <Prev/> {prevPost.title} 
                </h4>
              {/* <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                 Previous
                </p> */}
            </Link>
          )}
          {nextPost && (
            <Link className='next-post' href={`/posts/${nextPost.slug}`}>
            
              <span className="thumb-holder">
                {nextPost.thumbnail && (
                  <Image
                    src={nextPost.thumbnail}
                    className="w-full h-auto mb-6"
                    alt={`${nextPost.title} Thumbnail`}
                    width={197}
                    height={103}
                    loading="lazy"
                  />
                )}
         
            </span>
            <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                  {nextPost.title}  <Next/>
                </h4>
                {/* <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                  Next 
                </p> */}
            
            </Link>
          )}
        </div>
          </article>
          <Sidebar
            caseStudy={caseStudy}
            showCase={showCase}
            devProjects={devProjects}
            designProjects={designProjects}
            tags={frontMatter.tags}
          />
        </main>
        
      </article>
      <Footer copyrightText={globalData.footerText} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(params.slug);

  const devProjects = getPosts('dev-projects');
  const designProjects = getPosts('design');
  const caseStudy = getPosts('case-study');
  const showCase = getPosts('show-case');

  const tag = data.tags && data.tags[0];
  const prevPost = getPreviousPostBySlug(params.slug, tag);
  const nextPost = getNextPostBySlug(params.slug, tag);

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
      showCase,
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
