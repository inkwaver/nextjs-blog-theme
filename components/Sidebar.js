// Sidebar.js
import React from 'react';
import Link from 'next/link';

import Links from './Links';
import { useRouter } from 'next/router';  // Import the useRouter hook
const Sidebar = ({ devProjects,designProjects,caseStudy }) => {
    const router = useRouter();

    const isActiveLink = (href) => {
        return router.pathname === href || router.asPath === href;
    };

    return (
        <aside className="main">
            <div className='sideabar-inner'>

                <nav>
                    <ul>
                        <li>
                            <h3>Case Study</h3>
                            <span>Real Estate</span>
                            <ul className='articles'>
                                {caseStudy.map((post) => (
                                    <li key={post.filePath}>
                                        {/* eslint-disable */}
                                        <Link className={`${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`} href={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}>
                                            {/* <a className={`block py-2 px-3 text-sm hover:underline ${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`}>
                                                <span className="block text-gray-600 dark:text-gray-400">{post.data.date}</span>
                                                <span className="block font-semibold">{post.data.title}</span>
                                            </a> */}   
                                             <span className={`block py-2 px-3 text-sm hover:underline ${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`}>
                                                <span className="block text-gray-600 dark:text-gray-400">{post.data.date}</span>
                                                <span className="block font-semibold">{post.data.title}</span>
                                            </span>
                                        </Link>
                                        <Links links={post.data.links} />
                                       { /* eslint-enable  */}
                                    </li>
                                ))}
                            </ul>
                        </li>
          

                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
