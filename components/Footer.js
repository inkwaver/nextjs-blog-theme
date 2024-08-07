import { LinkedIn, Behance } from './Icons/DesignFlowIcons';
import Link from 'next/link';

export default function Footer({ copyrightText }) {
  return (
    <footer className="main py-16 flex flex-col items-center">
   {/* <div className='first-floor wrapper-main'> 
   <section>
        <h3>Design</h3>
        <ul>
          <li><Link href="">Case Study Real Estate</Link></li>
          <li><Link href="">Show Case Beargeek</Link></li>
          <li><Link href="">Show Case Festberg</Link></li>
        </ul>
      </section>
      <section>
        <h3>Development</h3>
        <ul>
          <li><Link href="">Skills</Link></li>
          <li><Link href="">Projects</Link></li>
        </ul>
      </section>
      <section>
        <p className="connect">
          Connect Via - 
        <Link className="icon-24" target="_blank" href="https://www.linkedin.com/in/narekchilingaryan/">
            <LinkedIn />
          </Link>
        </p>
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
      </section>
   </div> */}
      
      <p className="wrapper-main copyright">
        {copyrightText}
      </p>
    </footer>
  );
}
