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
  const ctx = useContext(ContextData);
  const router = useRouter();

  const onClickMenu = (target: string) => {
    const basePage = ctx.isSanou ? 'sanou' : 'unou';
    const splitPath = router.pathname.split(/\//);
    const pathNum = splitPath.length;
    const isBasePage = basePage === splitPath[pathNum - 1];
    if (isBasePage) {
      ctx.setContextDate((prevState) => ({
        ...prevState,
        target: target,
      }));
    } else {
      ctx.setContextDate((prevState) => ({
        ...prevState,
        target: '',
      }));
      router.push({
        pathname: `/${basePage}`,
        query: { target: target },
      });
    }
  };

  const arrowLink = () => {
    return ctx.isSanou ? '/unou' : '/sanou';
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
              onClick={() => onClickMenu('home')}
            />
          </li>
          {ctx.isSanou && (
            <>
              <li className={styles.listItem}>
                <TextLink
                  text={'About'}
                  size={24}
                  color={'white'}
                  onClick={() => onClickMenu('about')}
                />
              </li>
              <li className={styles.listItem}>
                <TextLink
                  text={'Portfolio'}
                  size={24}
                  color={'white'}
                  onClick={() => onClickMenu('portfolio')}
                />
              </li>
              <li className={styles.listItem}>
                <TextLink
                  text={'GoodPoint'}
                  size={24}
                  color={'white'}
                  onClick={() => onClickMenu('goodPoint')}
                />
              </li>
              <li className={styles.listItem}>
                <TextLink
                  text={'Flow & Price'}
                  size={24}
                  color={'white'}
                  onClick={() => onClickMenu('flowPrice')}
                />
              </li>
              <li className={styles.listItem}>
                <TextLink
                  text={'Recommendation'}
                  size={24}
                  color={'white'}
                  onClick={() => onClickMenu('recommendation')}
                />
              </li>
            </>
          )}
          {ctx.isUnou && (
            <>
              <li className={styles.listItem}>
                <TextLink
                  text={'News'}
                  size={24}
                  color={'white'}
                  onClick={() => onClickMenu('news')}
                />
              </li>
              <li className={styles.listItem}>
                <TextLink
                  text={'Portfolio'}
                  size={24}
                  color={'white'}
                  onClick={() => onClickMenu('portfolio')}
                />
              </li>
            </>
          )}
          <li className={styles.listItem}>
            <TextLink
              text={'Profile'}
              size={24}
              color={'white'}
              onClick={() => onClickMenu('profile')}
            />
          </li>
          <li className={styles.listItem}>
            <TextLink
              text={'Contact'}
              size={24}
              color={'white'}
              onClick={() => onClickMenu('contact')}
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
              ctx.isSanou ? '右脳 - Art & Illust' : '左脳 -Design'
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
