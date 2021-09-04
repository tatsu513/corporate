import Image from 'next/image';
import logo from 'images/kikutokaku_logo.svg';
import styles from 'styles/modules/Header.module.scss';

const Header: React.VFC = () => {
  return (
    <header>
      <div className={styles.headerWrap}>
        <div className={styles.logo}>
          <Image src={logo} alt='聴くと描く' />
        </div>
      </div>
    </header>
  );
};

export default Header;
