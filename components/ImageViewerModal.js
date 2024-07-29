import React, { useState, useEffect } from 'react';
import Image from "next/legacy/image";

const DEFAULT_BLUR_URL = 'data:image/svg+xml;base64,' + btoa(
  `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
     <rect width="100%" height="100%" fill="#ccc"/>
   </svg>`
);

const getImageDimensions = (src) => {
     /* eslint-disable */
  return new Promise((resolve, reject) => {
    const img = new window.Image(); // Use window.Image() to avoid confusion with next/image
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      reject('Failed to load image');
    };
    img.src = src;
  });
};

const ImageViewerModal = ({
  src,
  alt,
  caption,
  isPriority = false,
  buttonText = 'View Source Image',
  buttonUrl,
  children,
  blur = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDimensions = async () => {
      try {
        const dimensions = await getImageDimensions(src);
        setImageDimensions(dimensions);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchDimensions();
  }, [src]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const viewSource = () => {
    window.open(buttonUrl || src, '_blank');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <figure className="thumbnail-container" style={{ width: '100%', position: 'relative' }}>
        <button
          className="thumbnail-button"
          onClick={openModal}
          aria-label="Open image"
        >
          <div className="thumbnail-wrapper" style={{ position: 'relative', paddingTop: `${(imageDimensions.height / imageDimensions.width) * 100}%` }}>
            <Image
              className="thumbnail"
              src={src}
              alt={alt || caption}
              layout='fill'
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        <div
          className="modal"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div className="modal-content-wrapper">
            <button
              className="close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              close
            </button>
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
            <button
              className="view-source-button"
              onClick={viewSource}
              aria-label="View source image"
            >
              {buttonText}
            </button>
            {caption && <figcaption className="modal-caption">{caption}</figcaption>}
            {children}
            <button
              className="modal-overlay"
              onClick={closeModal}
              aria-label="Close modal"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageViewerModal;


{/* <ImageViewerModal src="/path/to/image.jpg" alt="Description of the image" /> */}
{/* <ImageViewerModal
  src="/path/to/image.jpg"
  alt="Description of the image"
  buttonText="Custom Button Text"
  buttonUrl="https://example.com/custom-url"
/> */}

{/* <ImageViewerModal src="/path/to/image.jpg" alt="Description of the image">
  <div className="info">Some custom info</div>
  <div className="additional-info">Additional custom info</div>
</ImageViewerModal> */}