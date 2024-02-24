import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Header({ name }) {
  const router = useRouter();
  const [avatarSize, setAvatarSize] = useState(240);

  // Function to determine if a link is active
  const isActiveLink = (href) => {
    return router.pathname === href;
  };

  useEffect(() => {
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
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <header className={`main ${avatarSize <= 45 ? 'sticked' : ''}`}>
      <div className='main-inner wrapper-main'>
        <h1 className='logo'>
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
            <a className={isActiveLink('/') ? 'active' : ''}>
            Narek Chilingaryan
            </a>
          </Link>
          <Link href="#">
            <a className='button cv-btn'>Download CV</a>
          </Link>
        <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>

        </div>
      </div>
    </header>
  );
}
