import styles from 'styles/modules/Header.module.scss';

const Header: React.VFC = () => {
  return (
    <header>
      <div className={styles.headerWrap}>
        <div className={styles.logo}>聴くと描く</div>
        <div className={styles.menu}>
          <span
            className={`${styles.menuBar} ${styles.menubarTop}`}
          />
          <span
            className={`${styles.menuBar} ${styles.menubarMiddle}`}
          />
          <span
            className={`${styles.menuBar} ${styles.menubarBottom}`}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
