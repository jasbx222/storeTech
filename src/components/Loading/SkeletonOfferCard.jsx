import React from "react";
import styles from "./SkeletonCard.module.css";

const SkeletonOfferCard = () => {
  return (
    <div className={styles.offerCard}>
      <div className={styles.tag}></div>
      <div className={styles.imgcont}>
      <div className={styles.image}></div>
      </div>
      <div className={styles.discount}></div>
    </div>
  );
};

export default SkeletonOfferCard;
