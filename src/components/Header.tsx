import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useContext, useState } from 'react';
import Sidebar from './Sidebar';
import ArrowLink from './common/ArrowLink';
import Icon from './common/Icon';
import TextLink from './common/TextLink';
import facebookIcon from 'images/facebook.svg';
import instaIcon from 'images/instagram.svg';
import logoBase from 'images/kikutokaku_logo.svg';
import logoUnou from 'images/logo_unou.svg';
import { Width } from 'pages/BaseProvider';
import styles from 'styles/modules/Header.module.scss';

const Header: React.VFC = () => {
  const router = useRouter();
  const isUnou = router.pathname.indexOf('unou') !== -1;

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const windowWidth = useContext(Width);

  return (
    <header className={styles.header}>
      <div className={styles.headerWrap}>
        <div className={styles.logo}>
          <Image src={isUnou ? logoUnou : logoBase} alt='ロゴ' />
        </div>
        {windowWidth > 1024 && (
          <div className={styles.controllers}>
            <TextLink text={'News'} />
            <TextLink text={'Portfolio'} />
            <TextLink text={'Contact'} />
            <Icon
              icon={instaIcon}
              alt={'インスタグラム'}
              width={28}
              marginRight={16}
              href={'https://www.instagram.com/akemi_kokubo/'}
            />
            <Icon
              icon={facebookIcon}
              alt={'フェイスブック'}
              width={28}
              marginRight={16}
              href={'https://www.facebook.com/kokubo.akemi'}
            />
            {}
            <div className={styles.goAnotherPageLink}>
              <ArrowLink
                text={'左脳 - Design'}
                onClick={() => router.push('/sanou')}
              />
            </div>
          </div>
        )}
        {windowWidth <= 1024 && (
          <div
            className={styles.menuBox}
            onClick={() => setIsOpenSidebar(true)}
          >
            <span className={`${styles.bar} ${styles.barTop}`} />
            <span className={`${styles.bar} ${styles.barMiddle}`} />
            <span className={`${styles.bar} ${styles.barBottom}`} />
          </div>
        )}
      </div>
      <Sidebar
        isOpen={isOpenSidebar}
        close={() => setIsOpenSidebar(false)}
      />
    </header>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default Header;
