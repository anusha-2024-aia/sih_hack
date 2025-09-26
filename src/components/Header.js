import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>E-Commerce Legal Checker</div>
        <div>POC Version 1.0</div>
      </div>
    </header>
  );
}

export default Header;