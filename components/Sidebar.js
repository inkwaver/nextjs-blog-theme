import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Links from './Links';

const Sidebar = ({ devProjects, designProjects, caseStudy }) => {
  const router = useRouter();

  const isActiveLink = (href) => {
    return router.pathname === href || router.asPath === href;
  };

  // Sort caseStudy posts by the order property
  const sortedCaseStudy = caseStudy.sort((a, b) => a.data.order - b.data.order);

  return (
    <aside className="main">
      <div className='sideabar-inner'>
        <nav>
          <ul>
            <li>
              <h3>Case Study</h3>
              <span>Real Estate</span>
              <ul className='articles'>
                {sortedCaseStudy.map((post) => (
                  <li key={post.filePath}>
                    <Link className={`${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`} href={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}>
                      <span className={`block py-2 px-3 text-sm hover:underline ${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`}>
                        <span className="block text-gray-600 dark:text-gray-400">{post.data.date}</span>
                        <span className="block font-semibold">{post.data.title}</span>
                      </span>
                    </Link>
                    <Links links={post.data.links} />
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
