import React, { useEffect, useRef } from 'react';

const Links = ({ links, onLinkClick }) => {
  const observer = useRef(null);

  useEffect(() => {
    if (!links || links.length === 0) return;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const targetElement = document.querySelector(`.content-links a[href="#${entry.target.id}"]`);
        if (targetElement) {
          if (entry.isIntersecting) {
            targetElement.classList.add('highlight');
          } else {
            targetElement.classList.remove('highlight');
          }
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, { threshold: 0.3 });

    links.forEach((link) => {
      const targetElement = document.getElementById(link.href.substring(1));
      if (targetElement) {
        observer.current.observe(targetElement);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [links]);

  return (
    <ul className='content-links'>
      {links && links.length > 0 && links.map((link) => (
        <li key={link.title}>
          <a href={link.href} rel="noopener noreferrer" onClick={onLinkClick}>
            {link.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Links;
