import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
import remarkGfm from 'remark-gfm';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = () => {
  const files = fs.readdirSync(POSTS_PATH);
  return files.filter((file) => /\.mdx?$/.test(file));
};

export const sortPostsByOrder = (posts) => {
  return posts.sort((a, b) => a.data.order - b.data.order);
};

export const getPosts = (tag) => {
  const filePaths = postFilePaths();

  let posts = filePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data: {
        ...data,
        thumbnail: data.thumbnail || null,
        label: data.label || null,
      },
      filePath,
    };
  });

  posts = sortPostsByOrder(posts);

  if (tag) {
    posts = posts.filter((post) => post.data.tags && post.data.tags.includes(tag));
  }

  return posts;
};

export const getPostBySlug = async (slug, basePath = 'posts') => {
  const postFilePath = path.join(process.cwd(), basePath, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    },
    scope: data,
  });

  return { mdxSource, data, postFilePath };
};

export const getNextPostBySlug = (slug, tag) => {
  const posts = getPosts(tag);
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex + 1];
  if (!post) return null;

  const nextPostSlug = post.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: nextPostSlug,
  };
};

export const getPreviousPostBySlug = (slug, tag) => {
  const posts = getPosts(tag);
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex - 1];
  if (!post) return null;

  const previousPostSlug = post.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: previousPostSlug,
  };
};
