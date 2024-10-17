import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
import remarkGfm from 'remark-gfm';

// Base path for posts directory
export const POSTS_PATH = path.join(process.cwd(), 'posts');

// Function to get all MDX files from a category folder
export const getFileNamesFromCategory = (category) => {
  const categoryPath = path.join(POSTS_PATH, category);
  return fs
    .readdirSync(categoryPath) // Read all files in the directory
    .filter((file) => file.endsWith('.mdx')) // Only keep MDX files
    .map((file) => ({
      category,
      slug: file.replace(/\.mdx$/, ''), // Remove .mdx extension to create the slug
    }));
};

// Automatically collect all post file paths from categories
export const postFilePaths = [
  ...getFileNamesFromCategory('case-study'),
  ...getFileNamesFromCategory('show-case'),
  // Uncomment or add other categories as needed:
  // ...getFileNamesFromCategory('articles'),
  // ...getFileNamesFromCategory('design-system'),
];

// Function to get a post by slug and category
export const getPostBySlug = async (slug, category) => {
  const postFilePath = path.join(POSTS_PATH, category, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath, 'utf-8');
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    },
    scope: data,
  });

  return { mdxSource, data };
};

// Function to sort posts by their "order" field
export const sortPostsByOrder = (posts) => {
  return posts.sort((a, b) => a.data.order - b.data.order);
};

// Function to get posts filtered by a tag
export const getPosts = (tag) => {
  let posts = postFilePaths.map(({ category, slug }) => {
    const postFilePath = path.join(POSTS_PATH, category, `${slug}.mdx`);
    const source = fs.readFileSync(postFilePath, 'utf-8');
    const { content, data } = matter(source);

    return {
      content,
      data: {
        ...data,
        thumbnail: data.thumbnail || null,
        label: data.label || null,
      },
      filePath: `${category}/${slug}.mdx`,
    };
  });

  posts = sortPostsByOrder(posts);

  if (tag) {
    posts = posts.filter((post) => post.data.tags && post.data.tags.includes(tag));
  }

  return posts;
};

// Function to get the next post based on the current slug
export const getNextPostBySlug = (slug, tag) => {
  const posts = getPosts(tag);
  const currentPostIndex = posts.findIndex((post) => post.filePath.endsWith(`${slug}.mdx`));

  const nextPost = posts[currentPostIndex + 1];
  if (!nextPost) return null;

  return {
    title: nextPost.data.title,
    slug: nextPost.filePath.replace(/\.mdx$/, '').split('/').pop(),
    thumbnail: nextPost.data.thumbnail,
  };
};

// Function to get the previous post based on the current slug
export const getPreviousPostBySlug = (slug, tag) => {
  const posts = getPosts(tag);
  const currentPostIndex = posts.findIndex((post) => post.filePath.endsWith(`${slug}.mdx`));

  const previousPost = posts[currentPostIndex - 1];
  if (!previousPost) return null;

  return {
    title: previousPost.data.title,
    slug: previousPost.filePath.replace(/\.mdx$/, '').split('/').pop(),
    thumbnail: previousPost.data.thumbnail,
  };
};
