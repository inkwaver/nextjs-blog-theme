import { getGlobalData } from '../../utils/global-data';
import { getPostBySlug, postFilePaths, getPosts } from '../../utils/mdx-utils';
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
  Image,
};

export default function CaseStudyPage({
  source,
  frontMatter,
  globalData,
  images,
}) {
  return (
    <Layout>
      <SEO
        title={`${frontMatter.title} - ${globalData.name}`}
        description={frontMatter.description}
      />
      <Header name={globalData.name} />
      <article className="px-6 md:px-0 main single">
        <header>
          {frontMatter.thumbnail && (
            <Image
              src={frontMatter.thumbnail}
              className="w-full h-auto mb-6"
              alt={`${frontMatter.title} Thumbnail`}
              width={672}
              height={350}
              loading="lazy"
            />
          )}
          <h1 className="text-3xl md:text-5xl dark:text-white mb-12">
            {frontMatter.title}
          </h1>
          {frontMatter.description && (
            <p className="text-xl mb-4">{frontMatter.description}</p>
          )}
        </header>
        <main>
          <article className="dark:prose-dark">
            <MDXRemote {...source} components={components} scope={{ images }} />
          </article>
        </main>
      </article>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const { mdxSource, data } = await getPostBySlug(params.slug, 'case-study');

  // Fetch and include images
  const images = {}; // Add logic to fetch images if necessary

  return {
    props: {
      globalData,
      source: mdxSource,
      frontMatter: data,
      images,
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
