import { useRouter } from 'next/dist/client/router';
import { useContext } from 'react';
import ArrowLink from './common/ArrowLink';
import Icon from './common/Icon';
import TextLink from './common/TextLink';
import facebookIcon from 'images/facebook_white.svg';
import instaIcon from 'images/instagram_white.svg';
import { ContextData } from 'pages/BaseProvider';
import styles from 'styles/modules/Sidebar.module.scss';

interface Props {
  isOpen: boolean;
  close: () => void;
}

const Sidebar: React.VFC<Props> = (props) => {
  const contextData = useContext(ContextData);
  const router = useRouter();

  const homeLink = () => {
    return contextData.isSanou ? '/sanou' : '/unou';
  };
  const arrowLink = () => {
    return contextData.isSanou ? '/unou' : '/sanou';
  };
  return (
    <div
      className={`${styles.sidebarWrap} ${
        props.isOpen && styles.isOpen
      }`}
    >
      <div className={styles.sidebarContentBox}>
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
              onClick={() =>
                router.push({
                  pathname: '/sanou',
                  query: { target: 'goodPoint' },
                })
              }
            />
          </li>
          {contextData.isSanou && (
            <>
              <li className={styles.listItem}>
                <TextLink
                  text={'About'}
                  size={24}
                  color={'white'}
                  onClick={() =>
                    router.push({
                      pathname: homeLink(),
                      query: { target: 'about' },
                    })
                  }
                />
              </li>
              <li className={styles.listItem}>
                <TextLink
                  text={'Portfolio'}
                  size={24}
                  color={'white'}
                  onClick={() =>
                    router.push({
                      pathname: '/sanou',
                      query: { target: 'portfolio' },
                    })
                  }
                />
              </li>
              <li className={styles.listItem}>
                <TextLink
                  text={'GoodPoint'}
                  size={24}
                  color={'white'}
                  onClick={() =>
                    router.push({
                      pathname: '/sanou',
                      query: { target: 'goodPoint' },
                    })
                  }
                />
              </li>
              <li className={styles.listItem}>
                <TextLink
                  text={'Flow & Price'}
                  size={24}
                  color={'white'}
                  onClick={() =>
                    router.push({
                      pathname: '/sanou',
                      query: { target: 'flowPrice' },
                    })
                  }
                />
              </li>
              <li className={styles.listItem}>
                <TextLink
                  text={'Recommendation'}
                  size={24}
                  color={'white'}
                  onClick={() =>
                    router.push({
                      pathname: '/sanou',
                      query: { target: 'recommendation' },
                    })
                  }
                />
              </li>
            </>
          )}
          {contextData.isUnou && (
            <>
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
            </>
          )}
          <li className={styles.listItem}>
            <TextLink
              text={'Profile'}
              size={24}
              color={'white'}
              onClick={() =>
                router.push({
                  pathname: homeLink(),
                  query: { target: 'profile' },
                })
              }
            />
          </li>
          <li className={styles.listItem}>
            <TextLink
              text={'Contact'}
              size={24}
              color={'white'}
              onClick={() =>
                router.push({
                  pathname: homeLink(),
                  query: { target: 'contact' },
                })
              }
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
        <div className={styles.arrowLinkBox}>
          <ArrowLink
            text={
              contextData.isSanou
                ? '右脳 - Art & Illust'
                : '左脳 -Design'
            }
            isWhite={true}
            onClick={() => {
              router.push(arrowLink());
              props.close();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
