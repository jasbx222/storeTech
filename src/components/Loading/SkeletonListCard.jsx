// components/Loading/SkeletonListCard.jsx
import React from 'react';
import styles from './SkeletonCard.module.css';

const SkeletonListCard = () => {
  return (
    <div className={styles.skeletonListCard}>
      <div className={styles.image}></div>
      <div className={styles.content}>
        <div className={styles.title}></div>
        <div className={styles.description}></div>
        <div className={styles.price}></div>
      </div>
    </div>
  );
};

export default SkeletonListCard;
