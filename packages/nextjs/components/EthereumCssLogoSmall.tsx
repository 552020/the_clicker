import React from "react";
import styles from "./EthereumCssLogoSmall.module.css";

export const EthereumCssLogoSmall = () => (
  <div className={styles.space}>
    <div className={styles.elogo}>
      <div className={styles.trif + " " + styles.u1}></div>
      <div className={styles.trif + " " + styles.u2}></div>
      <div className={styles.trif + " " + styles.u3}></div>
      <div className={styles.trif + " " + styles.u4}></div>
      <div className={styles.ct}></div>
      <div className={styles.trif + " " + styles.l1}></div>
      <div className={styles.trif + " " + styles.l4}></div>
    </div>
  </div>
);

export default EthereumCssLogoSmall;
