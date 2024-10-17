import { getGlobalData } from '../../../utils/global-data';
import {
  getNextPostBySlug,
  getPostBySlug,
  getPreviousPostBySlug,
  postFilePaths,
  getPosts,
} from '../../../utils/mdx-utils';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../../components/Layout';
import SEO from '../../../components/SEO';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Sidebar from '../../../components/Sidebar';
import PageCover from '../../../components/PageCover';
import ImageViewerModal from '../../../components/ImageViewerModal';
import ResponsiveIframe from '../../../components/ResponsiveIframe';
import CustomLink from '../../../components/CustomLink';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { Prev, Next } from '../../../components/Icons/DesignFlowIcons';

const components = {
  a: CustomLink,
  Image,
  PageCover,
  ImageViewerModal,
  ResponsiveIframe,
};

export default function PostPage({
  source,
  frontMatter,
  prevPost,
  nextPost,
  globalData,
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
        ogImage={frontMatter.thumbnail || '/avatar-nch.png'}
      />
      <Header className="single-header" name={globalData.name} />

      <article className="site-structure main single">
        <header className="article-header">
          <div className="wrapper-main">
            {/* Add Thumbnail Rendering Logic if needed */}
          </div>
        </header>

        <main className="single-content wrapper-main">
          <article className="content">
            <MDXRemote {...source} components={components} />
            <div className="next-prev-posts">
              {prevPost && (
                <Link className="prev-post" href={`/posts/show-case/${prevPost.slug}`}>
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
                    <Prev /> {prevPost.title}
                  </h4>
                </Link>
              )}
              {nextPost && (
                <Link className="next-post" href={`/posts/show-case/${nextPost.slug}`}>
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
                    {nextPost.title} <Next />
                  </h4>
                </Link>
              )}
            </div>
          </article>

          <Sidebar
            devProjects={devProjects}
            designProjects={designProjects}
            caseStudy={caseStudy}
            showCase={showCase}
            tags={frontMatter.tags}
          />
        </main>
      </article>

      <Footer copyrightText={globalData.footerText} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    .filter((post) => post.category === 'show-case')
    .map((post) => ({
      params: { slug: post.slug },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;

  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(slug, 'show-case');

  const devProjects = getPosts('dev-projects');
  const designProjects = getPosts('design');
  const caseStudy = getPosts('show-case');
  const showCase = getPosts('show-case');

  const tag = data.tags ? data.tags[0] : null;
  const prevPost = getPreviousPostBySlug(slug, tag);
  const nextPost = getNextPostBySlug(slug, tag);

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      prevPost,
      nextPost,
      devProjects,
      designProjects,
      caseStudy,
      showCase,
    },
  };
};
