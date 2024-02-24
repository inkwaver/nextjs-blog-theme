import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Header({ name }) {
  const router = useRouter();

  // Function to determine if a link is active
  const isActiveLink = (href) => {
    return router.pathname === href;
  };

  return (
    <header className="main ">
      <div className='main-inner wrapper-main'>
      <h1 className='logo'>
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
        </h1>
      
      </div>
    

    </header>
  );
}