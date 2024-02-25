import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeSwitcher from './ThemeSwitcher.js';
import Links from './Links';

export default function Sidebar({ designPosts }) {
    const router = useRouter();

    // Function to determine if a link is active
    const isActiveLink = (href) => {
        return router.pathname === href || router.asPath === href;
    };

    return (
        <aside className="main">
            <div className='sideabar-inner'>
                <ThemeSwitcher />

                <nav>
                    <ul>
                        <li>
                            <Link href="#design">
                                <a className={isActiveLink('#design') ? 'active' : ''}>Design</a>
                            </Link>
                            <ul>
                                <li>
                                    <Link href="/case-study">
                                        <a className={isActiveLink('/case-study') ? 'active' : ''}>Case-Study</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#articles">
                                        <a className={isActiveLink('#articles') ? 'active' : ''}>Articles</a>
                                    </Link>
                                    <ul className='articles'>
                                        {designPosts.map((post) => (
                                            <li key={post.filePath}>
                                                <Link href={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}>
                                                    <a className={`block py-2 px-3 text-sm hover:underline ${isActiveLink(`/posts/${post.filePath.replace(/\.mdx?$/, '')}`) ? 'active' : ''}`}>
                                                        <span className="block text-gray-600 dark:text-gray-400">{post.data.date}</span>
                                                        <span className="block font-semibold">{post.data.title}</span>
                                                    </a>
                                                </Link>
                                                <Links links={post.data.links} />
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link href="/dev-projects">
                                <a className={isActiveLink('/dev-projects') ? 'active' : ''}>Dev Projects</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
