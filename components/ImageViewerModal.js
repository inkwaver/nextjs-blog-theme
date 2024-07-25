import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './ImageViewerModal.module.css';

const ImageViewerModal = ({ src, alt, caption, width, isPriority = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Calculate aspect ratio of the image
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

  useEffect(() => {
    // Handle Escape key to close modal
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    // Add event listener when modal is open
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Clean up event listener when modal is closed
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
    window.open(src, '_blank');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <figure
        className={styles.thumbnailContainer}
        style={{ width: width || '100%', paddingTop: aspectRatio ? `${(1 / aspectRatio) * 100}%` : '56.25%' }}
      >
        <button
          className={styles.thumbnailButton}
          onClick={openModal}
          aria-label="Open image"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: '100%', height: '100%' }}
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
          {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
        </button>
      </figure>
      {isOpen && (
        <div
          className={styles.modal}
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div className={styles.modalContentWrapper}>
            <button
              className={styles.close}
              onClick={closeModal}
              aria-label="Close modal"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              &times;
            </button>
            <Image
              className={styles.modalContent}
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
            />
            <button
              className={styles.viewSourceButton}
              onClick={viewSource}
              aria-label="View source image"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              View Source
            </button>
            {caption && <figcaption className={styles.modalCaption}>{caption}</figcaption>}
            <button
              className={styles.modalOverlay}
              onClick={closeModal}
              aria-label="Close modal"
              style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageViewerModal;
