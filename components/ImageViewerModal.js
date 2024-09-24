import React, { useState, useEffect } from 'react';
import Image from "next/legacy/image";

const DEFAULT_BLUR_URL = 'data:image/svg+xml;base64,' + btoa(
  `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
     <rect width="100%" height="100%" fill="#ccc"/>
   </svg>`
);

const ImageViewerModal = ({
  src,
  alt,
  caption,
  isPriority = false,
  buttonText = 'View Source Image',
  buttonUrl,
  children,
  blur = false,
  width,  // optional width prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
      setLoading(false);
    };
    img.onerror = () => {
      console.error('Failed to load image');
      setLoading(false);
    };
    img.src = src;
  }, [src]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const viewSource = () => window.open(buttonUrl || src, '_blank');

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <figure className="thumbnail-container" style={{ position: 'relative' }}>
        <button
          className="thumbnail-button"
          onClick={openModal}
          aria-label="Open image"
        >
          <div
            className="thumbnail-wrapper"
            // style={{
            //   position: 'absolute',
            //   width: width ? `${width}px` : '100%',
            //   paddingBottom: `${(imageDimensions.height / imageDimensions.width) * 100}%`, // maintain aspect ratio
            //   overflow: 'hidden',
            // }}
          >
            <Image
              className="thumbnail"
              src={src}
              alt={alt || caption}
              layout="responsive"
              width={imageDimensions.width}
              height={imageDimensions.height}
              priority={isPriority}
              placeholder={blur ? 'blur' : 'empty'}
              blurDataURL={blur ? DEFAULT_BLUR_URL : undefined}
            />
          </div>
          {caption && <figcaption className="caption">{caption}</figcaption>}
          {children}
        </button>
      </figure>
      {isOpen && (
        <div className="modal" role="dialog" aria-labelledby="modal-title">
          <div className="modal-content-wrapper">
            <button className="close" onClick={closeModal} aria-label="Close modal">Close</button>
            <Image
              className="modal-content"
              src={src}
              alt={alt || caption}
              width={imageDimensions.width}
              height={imageDimensions.height}
              priority={isPriority}
              placeholder={blur ? 'blur' : 'empty'}
              blurDataURL={blur ? DEFAULT_BLUR_URL : undefined}
            />
            <button className="view-source-button" onClick={viewSource} aria-label="View source image">{buttonText}</button>
            {caption && <figcaption className="modal-caption">{caption}</figcaption>}
            {children}
            <button className="modal-overlay" onClick={closeModal} aria-label="Close modal" />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageViewerModal;
