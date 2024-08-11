import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/legacy/image";
import { useRouter } from 'next/router';
import { LinkedIn, Behance } from './Icons/DesignFlowIcons';
import ThemeSwitcher from './ThemeSwitcher.js';
import { CloseIcon, MenuIcon } from '../components/Icons/DesignFlowIcons';

export default function Header() {
  const router = useRouter();
  const [avatarSize, setAvatarSize] = useState(240);
  const [isChecked, setIsChecked] = useState(false);
  const [rootUrl, setRootUrl] = useState('');

  // Function to determine if a link is active
  const isActiveLink = (href) => {
    return router.pathname === href;
  };

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    // Dynamically set the root URL
    if (typeof window !== 'undefined') {
      setRootUrl(window.location.origin);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Decrease avatar size gradually as user scrolls
      const newAvatarSize = Math.max(45, 240 - scrollPosition);
      setAvatarSize(newAvatarSize);
    };

    // Apply the avatar size change and scroll effect only on the home page
    if (router.pathname === '/') {
      // Check the initial scroll position
      handleScroll();

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
      {/* eslint-disable */}
      <input
        checked={isChecked}
        onChange={handleChange}
        className='burger-anchor'
        id="hamburger"
        type='checkbox'
        aria-label="Menu toggle"
      />
      <label className='menu-icon' htmlFor="hamburger">
        <MenuIcon className="main-menu-open" />
        <CloseIcon className="main-menu-close" />
      </label>
      <div className='wrapper-main header-wrap'>
        <div className="main-inner">
          <h1 className="logo">
            <Link href="/">
              <span className={isActiveLink('/') ? 'active' : ''}>
                <Image
                  className="avatar"
                  src="/narek-ch.png"
                  width={avatarSize}
                  height={avatarSize}
                  alt="Image description"
                  loading = 'lazy' 
                  // priority={true}
                  // loading="eager" // Ensure the avatar image loads immediately
                />
              </span>
            </Link>
          </h1>
          <div className="header-description">
            <Link className="huge-title" href="/">
              <span className="logo-name">Narek Chilingaryan</span>
            </Link>

            <p className="paragraph">
              I <strong>design interfaces</strong> and translate them into markup
              that's high-resolution, features smooth scrolling, is
              mobile-friendly, and prioritizes accessibility.
            </p>
            {/* eslint-enable */}
          </div>
        </div>
        <div className="header-links">
          <Link
            href="/posts/case-study-real-estate-brief"
            rel="noopener noreferrer"
            className="button cv-btn ghost"
          >
            Case Study
          </Link>
          <Link
            href={`${rootUrl}/#devExp`}
            rel="noopener noreferrer"
            className="button cv-btn ghost"
          >
            Dev Projects
          </Link>
          <Link className="icon-24" target="_blank" href="https://www.linkedin.com/in/narekchilingaryan/">
            <LinkedIn />
          </Link>
          <Link className="icon-24"  target="_blank" href="https://www.behance.net/narek-ws">
            <Behance />
          </Link>
          <Link
            href="/narek-ch_wp-dev-web.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="button cv-btn"
          >
            Download CV
          </Link>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
