import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Links from './Links';
import { CloseIcon, TocIcon } from '../components/Icons/DesignFlowIcons';

// eslint-disable-next-line react/jsx-no-comment-textnodes
const Sidebar = ({ devProjects, designProjects, caseStudy, showCase, tags }) => {
  const router = useRouter();
  const [activeProject, setActiveProject] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [clientTags, setClientTags] = useState(tags);

  useEffect(() => {
    // Sync clientTags with the passed tags prop
    setClientTags(tags);
  }, [tags]);

  const isActiveLink = (href) => {
    const isActive = router.pathname === href || router.asPath === href;
    return isActive;
  };

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleLinkClick = () => {
    setIsChecked(true);
  };

  // Sort and group posts
  const sortAndGroup = (posts) => {
    const sorted = posts.sort((a, b) => a.data.order - b.data.order);
    return sorted.reduce((acc, post) => {
      const projects = Array.isArray(post.data.project) ? post.data.project : [post.data.project || 'Uncategorized'];
      projects.forEach(proj => {
        if (!acc[proj]) {
          acc[proj] = [];
        }
        acc[proj].push(post);
      });
      return acc;
    }, {});
  };

  const caseStudyByProject = sortAndGroup(caseStudy);
  const showCaseByProject = sortAndGroup(showCase);

  // Determine active project based on URL
  const activePost = [...caseStudy, ...showCase].find(post => isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`));
  const urlActiveProject = activePost ? activePost.data.project : null;

  const handleProjectClick = (project) => {
    setActiveProject(project);
    const firstPost = [...(caseStudyByProject[project] || []), ...(showCaseByProject[project] || [])].find(post => post.data.order === 1);
    if (firstPost) {
      router.push(`/posts/${firstPost.filePath.replace(/\.mdx?$/, '')}`);
    }
  };

  return (
    <aside className="main sidebar">
      <input checked={isChecked} onChange={handleChange} type='checkbox' id="toc"/>
          {/* eslint-disable */}
      <label className='overlay-toc' htmlFor='toc'>    </label>
      <div className='sidebar-inner'>
   
       
         
    
        <label className='toc-menu' htmlFor='toc'>
          <CloseIcon className="close-toc"/>
          <TocIcon className="open-toc"/>
        </label>
        <nav>
          <ul>
            {clientTags.includes('case-study') && (
              <li>
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
                            <span onClick={handleLinkClick} className={` ${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`}>
                              <span className="menu-date">{post.data.date}</span>
                              <span className="menu-title">{post.data.title}</span>
                            </span>
                          </Link>
                          <Links links={post.data.links} onLinkClick={handleLinkClick} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </li>
            )}

            {clientTags.includes('show-case') && (
              <li>
                <h3 className='title'>Show Case</h3>
                {Object.keys(showCaseByProject).map((project) => (
                  <div className='parts' key={project}>
                    <span
                      className={activeProject === project || (urlActiveProject && urlActiveProject.includes(project)) ? 'active-cat' : ''}
                      onClick={() => handleProjectClick(project)}
                    >
                      {project}
                    </span>
                    <ul className='articles'>
                      {showCaseByProject[project].map((post) => (
                        <li key={post.filePath} className={post.data.classname || ''}>
                          <Link className={`${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`} href={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}>
                            <span onClick={handleLinkClick} className={` ${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`}>
                              <span className="menu-date">{post.data.date}</span>
                              <span className="menu-title">{post.data.title}</span>
                            </span>
                          </Link>
                          <Links links={post.data.links} onLinkClick={handleLinkClick} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </li>
            )}

            {clientTags.includes('dev-projects') && (
              <li>
                <h3 className='title'>Dev Projects</h3>
                {devProjects.map((post) => (
                  <li key={post.filePath} className={post.data.classname || ''}>
                    <Link className={`${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`} href={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}>
                      <span onClick={handleLinkClick} className={` ${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`}>
                        <span className="menu-date">{post.data.date}</span>
                        <span className="menu-title">{post.data.title}</span>
                      </span>
                    </Link>
                    <Links links={post.data.links} onLinkClick={handleLinkClick} />
                  </li>
                ))}
              </li>
            )}

            {clientTags.includes('design') && (
              <li>
                <h3 className='title'>Design Projects</h3>
                {designProjects.map((post) => (
                  <li key={post.filePath} className={post.data.classname || ''}>
                    <Link className={`${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`} href={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}>
                      <span onClick={handleLinkClick} className={` ${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`}>
                        <span className="menu-date">{post.data.date}</span>
                        <span className="menu-title">{post.data.title}</span>
                      </span>
                    </Link>
                    <Links links={post.data.links} onLinkClick={handleLinkClick} />
                  </li>
                ))}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
