import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Links from './Links';

const Sidebar = ({ devProjects, designProjects, caseStudy }) => {
  const router = useRouter();
  const [activeProject, setActiveProject] = useState(null);

  const isActiveLink = (href) => {
    return router.pathname === href || router.asPath === href;
  };

  // Sort caseStudy posts by the order property
  const sortedCaseStudy = caseStudy.sort((a, b) => a.data.order - b.data.order);

  // Group case studies by project
  const caseStudyByProject = sortedCaseStudy.reduce((acc, post) => {
    const projects = Array.isArray(post.data.project) ? post.data.project : [post.data.project || 'Uncategorized'];
    projects.forEach(proj => {
      if (!acc[proj]) {
        acc[proj] = [];
      }
      acc[proj].push(post);
    });
    return acc;
  }, {});

  // Determine active project based on URL
  const activePost = sortedCaseStudy.find(post => isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`));
  const urlActiveProject = activePost ? activePost.data.project : null;

  const handleProjectClick = (project) => {
    setActiveProject(project);
    const firstPost = caseStudyByProject[project].find(post => post.data.order === 1);
    if (firstPost) {
      router.push(`/posts/${firstPost.filePath.replace(/\.mdx?$/, '')}`);
    }
  };

  return (
    <aside className="main sidebar">
      <input type='checkbox' id="toc"/>
      <div className='sidebar-inner'>
        <label className='toc-menu' htmlFor='toc'>menu</label>
        <nav>
          <ul>
            <li>
              {/* <h3 className='title'>Case Study</h3> */}
              {Object.keys(caseStudyByProject).map((project) => (
                <div className='parts' key={project}>
                  <span
                    className={activeProject === project || (urlActiveProject && urlActiveProject.includes(project)) ? 'active-cat' : ''}
                    onClick={() => handleProjectClick(project)}
                  >
                    {project}
                  </span>
                  <ul className='articles'>
                    {caseStudyByProject[project].map((post) => (
                      <li key={post.filePath} className={post.data.classname || ''}>
                        <Link className={`${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`} href={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}>
                          <span className={` ${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`}>
                            <span className="menu-date">{post.data.date}</span>
                            <span className="menu-title">{post.data.title}</span>
                          </span>
                        </Link>
                        <Links links={post.data.links} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
