import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import ArrowLink from './common/ArrowLink';
import Icon from './common/Icon';
import TextLink from './common/TextLink';
import facebookIcon from 'images/facebook.svg';
import instaIcon from 'images/instagram.svg';
import logoBase from 'images/kikutokaku_logo.svg';
import logoUnou from 'images/logo_unou.svg';
import styles from 'styles/modules/Header.module.scss';

const Header: React.VFC = () => {
  const router = useRouter();
  const isUnou = router.pathname.indexOf('unou') !== -1;
  return (
    <header>
      <div className={styles.headerWrap}>
        <div className={styles.logo}>
          <Image src={isUnou ? logoUnou : logoBase} alt='ロゴ' />
        </div>
        {isUnou && (
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
            <div className={styles.goAnotherPageLink}>
              <ArrowLink
                text={'左脳 - Design'}
                onClick={() => router.push('/sanou')}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
