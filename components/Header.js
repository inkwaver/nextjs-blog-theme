import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ThemeSwitcher from './ThemeSwitcher.js';


export default function Header({ name, }) {
  const router = useRouter();

  // Function to determine if a link is active
  const isActiveLink = (href) => {
    return router.pathname === href;
  };

  return (
    <header className="main">
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

    </header>
  );
}
