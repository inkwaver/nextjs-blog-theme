import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const [avatarSize, setAvatarSize] = useState(240);

  // Function to determine if a link is active
  const isActiveLink = (href) => {
    return router.pathname === href;
  };

  useEffect(() => {
    // Apply the avatar size change and scroll effect only on the home page
    if (router.pathname === '/') {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
  
        // Decrease avatar size gradually as user scrolls
        const newAvatarSize = Math.max(45, 240 - scrollPosition);
        setAvatarSize(newAvatarSize);
      };
  
      // Attach scroll event listener
      window.addEventListener('scroll', handleScroll);
  
      // Cleanup on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // On other pages, set a fixed avatar size and add the 'sticked' class
      setAvatarSize(45);
    }
  }, [router.pathname]); // Listen for changes in the route
  

  return (
    <header className={`main ${avatarSize <= 45 ? 'sticked' : 'hero-header'}`}>
      <div className='main-inner wrapper-main'>
        <h1 className='logo'>
          {/* eslint-disable */}
          <Link href="/">
            <a className={isActiveLink('/') ? 'active' : ''}>
              <Image className='avatar'
                src="/avatar-nch.png"
                width={avatarSize}
                height={avatarSize}
                alt="Image description"
              />
              
            </a>
          </Link>
        </h1>
        <div className='header-description'>
        <Link href="/">
            <a  className="logo-name">
            Narek Chilingaryan
            </a>
          </Link>
         
            <a href="/narek-ch_wp-dev-web.pdf" target="_blank" rel="noopener noreferrer" className='button cv-btn'>Download CV</a>
       
        <p>
        "UI/UX Designer and Engineer skilled in crafting top-notch web and mobile experiences. Proficient in HTML, CSS, JavaScript, React, Angular, WordPress, and Adobe tools. Committed to optimization for speed, accessibility, and SEO."
        </p>
          {/* eslint-enable */}

        </div>
      </div>
    </header>
  );
}
