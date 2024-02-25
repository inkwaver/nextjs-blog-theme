// Links.js
import React from 'react';

const Links = ({ links }) => {
    if (!links || links.length === 0) return null;

    return (
        <ul className='content-links'>
            {links.map((link) => (
                <li key={link.title}>
                    <a href={link.href}  rel="noopener noreferrer">
                        {link.title}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default Links;
