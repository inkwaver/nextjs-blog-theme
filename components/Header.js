import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import { LinkedIn, Behance } from './Icons/DesignFlowIcons';
import ThemeSwitcher from './ThemeSwitcher.js';
import { CloseIcon, MenuIcon } from '../components/Icons/DesignFlowIcons';

export default function Header() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [rootUrl, setRootUrl] = useState('');

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRootUrl(window.location.origin);
    }

    const handleScroll = () => {
      const headerElement = document.querySelector('.main');
      const scrollPosition = window.scrollY;

      if (headerElement) {
        if (scrollPosition > 50) {
          headerElement.classList.add('sticked');
        } else {
          headerElement.classList.remove('sticked');
        }
      }
    };

    if (router.pathname === '/') {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [router.pathname]);

  return (

    <header className={`main ${router.pathname !== '/' ? 'sticked' : ''}`}>
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
              <span className={router.pathname === '/' ? 'active' : ''}>
                <div className='avatar-img'></div>
                <Image
                  className="avatar"
                  src="/narek-ch.png"
                  width={240}  // Fixed width
                  height={240} // Fixed height
                  alt="Image description"
                  priority={true} // Ensure the avatar image loads immediately
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
          <Link className="icon-24" target="_blank" href="https://www.behance.net/narek-ws">
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
