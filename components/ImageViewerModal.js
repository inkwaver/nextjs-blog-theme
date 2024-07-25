// components/ImageViewerModal.js
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ImageViewerModal.module.css';

const ImageViewerModal = ({ src, alt, width, height, isPriority = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
      setAspectRatio(img.width / img.height);
      setLoading(false);
    };
    img.onerror = () => {
      console.error('Failed to load image');
      setLoading(false);
    };
  }, [src]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div 
        className={styles.thumbnailContainer} 
        style={{ width: width || '100%', paddingTop: aspectRatio ? `${(1 / aspectRatio) * 100}%` : '56.25%' }}
        onClick={openModal}
      >
        <Image
          className={styles.thumbnail}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={isPriority}
          style={{ objectFit: 'contain' }}
        />
      </div>
      {isOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <span className={styles.close} onClick={closeModal}>&times;</span>
          <div className={styles.modalContentWrapper}>
            <Image
              className={styles.modalContent}
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageViewerModal;
