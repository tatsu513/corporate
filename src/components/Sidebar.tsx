import { useRouter } from 'next/dist/client/router';
import Icon from './common/Icon';
import TextLink from './common/TextLink';
import facebookIcon from 'images/facebook_white.svg';
import instaIcon from 'images/instagram_white.svg';
import styles from 'styles/modules/Sidebar.module.scss';

interface Props {
  isOpen: boolean;
  close: () => void;
}

const Sidebar: React.VFC<Props> = (props) => {
  const router = useRouter();
  return (
    <div
      className={`${styles.sidebarWrap} ${
        props.isOpen && styles.isOpen
      }`}
    >
      <div className={styles.controller}>
        <span
          className={styles.close}
          onClick={() => props.close()}
        />
      </div>
      <ul className={styles.listWrap}>
        <li className={styles.listItem}>
          <TextLink
            text={'Home'}
            size={24}
            color={'white'}
            onClick={() => router.push('/')}
          />
        </li>
        <li className={styles.listItem}>
          <TextLink
            text={'News'}
            size={24}
            color={'white'}
            onClick={() => alert('News')}
          />
        </li>
        <li className={styles.listItem}>
          <TextLink
            text={'Portfolio'}
            size={24}
            color={'white'}
            onClick={() => alert('Portfolio')}
          />
        </li>
        <li className={styles.listItem}>
          <TextLink
            text={'Contact'}
            size={24}
            color={'white'}
            onClick={() => alert('Contact')}
          />
        </li>
        <li className={`${styles.listItem} ${styles.icons}`}>
          <Icon
            icon={instaIcon}
            alt={'インスタグラム'}
            width={40}
            marginRight={16}
            href={'https://www.instagram.com/akemi_kokubo/'}
          />
          <Icon
            icon={facebookIcon}
            alt={'フェイスブック'}
            width={40}
            href={'https://www.facebook.com/kokubo.akemi'}
          />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
