import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ThemeSwitcher from './ThemeSwitcher.js';

export default function Header({ name }) {
  const router = useRouter();
  const [headerOpacity, setHeaderOpacity] = useState(0);

  // Function to determine if a link is active
  const isActiveLink = (href) => {
    return router.pathname === href;
  };

  useEffect(() => {
    // Apply the opacity effect only on the home page
    if (router.pathname === '/') {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const maxScroll = 50; // You can adjust this value based on your needs

        // Calculate opacity based on scroll position
        const opacity = Math.min(scrollPosition / maxScroll, 1);
        setHeaderOpacity(opacity);
      };

      // Attach scroll event listener
      window.addEventListener('scroll', handleScroll);

      // Cleanup on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // Reset opacity when navigating away from the home page
      setHeaderOpacity(1);
    }
  }, [router.pathname]); // Listen for changes in the route

  return (
    <header className="main backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity bg-opacity-10" style={{ opacity: headerOpacity }}>
      <div className='main-inner wrapper-main'>
        <nav>
          <ul>
            <li className='logo'>
              <Link href="/">
                <a className={isActiveLink('/') ? 'active' : ''}>
                  <Image className='avatar'
                    src="/avatar-nch.png"
                    width={45}
                    height={45}
                    alt="Image description"
                  />
                  Narek Chilingaryan
                </a>
              </Link>
            </li>
            <li>
              <Link
                href="/case-study"
              >
                <a className={isActiveLink('/case-study') ? 'active' : ''}>Case-Study</a>
              </Link>
            </li>
            <li>
              <Link
                href="/dev-projects"
              >
                <a className={isActiveLink('/dev-projects') ? 'active' : ''}>Dev Projects</a>
              </Link>
            </li>
          </ul>
        </nav>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
