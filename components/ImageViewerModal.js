// components/ImageViewerModal.js
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ImageViewerModal.module.css';

const ImageViewerModal = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.thumbnailContainer} onClick={openModal}>
        <Image className={styles.thumbnail} src={src} alt={alt} layout="fill" objectFit="cover" />
      </div>
      {isOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <span className={styles.close} onClick={closeModal}>&times;</span>
          <Image className={styles.modalContent} src={src} alt={alt} layout="fill" objectFit="contain" />
        </div>
      )}
    </>
  );
};

export default ImageViewerModal;
