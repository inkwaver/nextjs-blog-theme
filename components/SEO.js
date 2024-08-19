// components/SEO.js
import Head from 'next/head';

export default function SEO({ title, description, ogImage, url, twitterHandle }) {
  const defaultTitle = "Narek Chilingaryan UI/UX Designer";
  const defaultDescription = "Default description";
  const defaultOgImage = "/narek-ch.png";
  const defaultUrl = "https://narek-ch.space";
  const defaultTwitterHandle = "@YourTwitterHandle";

  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageImage = ogImage || defaultOgImage;
  const pageUrl = url || defaultUrl;
  const twitterSite = twitterHandle || defaultTwitterHandle;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      
      {/* LinkedIn Specific Meta Tags (same as Open Graph) */}
      {/* <meta property="linkedin:title" content={pageTitle} />
      <meta property="linkedin:description" content={pageDescription} />
      <meta property="linkedin:image" content={pageImage} />
      <meta property="linkedin:url" content={pageUrl} /> */}

      {/* Twitter (X) Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />

      {/* JSON-LD for Google */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "${pageTitle}",
          "description": "${pageDescription}",
          "image": "${pageImage}",
          "url": "${pageUrl}"
        }
        `}
      </script>
    </Head>
  );
}
