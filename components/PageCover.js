import React from 'react';
import Image from "next/legacy/image";

const PageCover = ({ id, title, subtitle, description, img }) => {
  return (
    <section id={id} className='page-cover'>
      <div className='info'>
        <h2>{title}</h2>
        <span>{subtitle}</span>
        {description}
      </div>
      <div className='visuals'>
        {typeof img === 'string' && img.startsWith('<svg') ? (
          <div dangerouslySetInnerHTML={{ __html: img }} />
        ) : typeof img === 'string' ? (
          <Image src={img} alt="" layout='fill' objectFit='contain' priority="true"/>
        ) : (
          img
        )}
      </div>
    </section>
  );
};

export default PageCover;


// usage in mdx
{/* <PageCover
  title="Real Estate"
  subtitle="case study"
  description={
    <p>The client, "To Buy State," needs a high-performance, user-friendly real estate website. The current WordPress site suffers from slow performance and poor design. We aim to design a new site to effectively showcase their listings.</p>
  }
  img={<div>Custom content here</div>}
/>
<PageCover
  title="Real Estate"
  subtitle="case study"
  description={
    <p>The client, "To Buy State," needs a high-performance, user-friendly real estate website. The current WordPress site suffers from slow performance and poor design. We aim to design a new site to effectively showcase their listings.</p>
  }
  img='/projects/Click2Sure.jpg'
/> */}