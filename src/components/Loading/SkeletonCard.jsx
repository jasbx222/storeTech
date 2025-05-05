import React from 'react';

import styles from './SkeletonCard.module.css';const SkeletonCard = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.image}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </div>
  );
};

export default SkeletonCard;
