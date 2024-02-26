import Link from 'next/link';

export default function CustomLink({ as, href, ...otherProps }) {
  return (
    /* eslint-disable */
    <>
      <Link as={as} href={href}>
        <a {...otherProps} />
      </Link>
    </>
    /* eslint-enable */
  );
}
