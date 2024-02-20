import Link from 'next/link';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher.js';
export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
      <ThemeSwitcher />

      <div className="w-12 h-12 rounded-full block mx-auto mb-4 bg-gradient-conic from-gradient-3 to-gradient-4" />
      <p className="text-2xl dark:text-white text-center">
      <Image className='avatar'
  src="/avatar-nch.png"
  width={150}
  height={150}
  alt="Image description"
/>
        <Link href="/">
          <a>{name} </a>
        </Link>
        <span>hello</span>
      </p>
    </header>
  );
}
