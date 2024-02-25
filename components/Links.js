// Links.js
import React, { useEffect, useRef } from 'react';

const Links = ({ links }) => {
    if (!links || links.length === 0) return null;

    const observer = useRef(null);  // Initialize with null

    useEffect(() => {
        observer.current = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

        // Observe each paragraph element
        links.forEach((link) => {
            const targetElement = document.getElementById(link.href.substring(1));
            if (targetElement) {
                observer.current.observe(targetElement);
            }
        });

        // Cleanup function
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [links]);

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            const targetElement = document.querySelector(`.content-links a[href="#${entry.target.id}"]`);
            
            if (targetElement) {
                if (entry.isIntersecting) {
                    // Add highlight class
                    targetElement.classList.add('highlight');
                } else {
                    // Remove highlight class
                    targetElement.classList.remove('highlight');
                }
            }
        });
    };
    
    return (
        <ul className='content-links'>
            {links.map((link) => (
                <li key={link.title}>
                    <a href={link.href} rel="noopener noreferrer">
                        {link.title}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default Links;
