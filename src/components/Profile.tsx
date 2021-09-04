import Icon from './common/Icon';
import SectionTitleVertical from './common/SectionTitleVertical';
import facebookIcon from 'images/facebook.svg';
import instaIcon from 'images/instagram.svg';
import styles from 'styles/modules/Profile.module.scss';

const Profile: React.VFC = () => {
  return (
    <div className={styles.profileWrap}>
      <div className={styles.sectionTitleBox}>
        <SectionTitleVertical title={'Profile'} />
      </div>
      <div className={styles.contantBox}>
        <div className={styles.jobTitle}>イラストレーター</div>
        <div className={styles.name}>
          小久保あけみ（Kokubo Akemi）
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
        </div>
        <p className={styles.recode}>
          日本女子大学 住居化学住居環境デザイン専攻卒
          <br />
          イラストレーション青山塾 ドローイング科卒
        </p>
        <p className={styles.text}>
          筆でさっと描いた、オシャレで個性的な女の子を得意とする。企業の販促ツール・雑誌の挿絵・カフェのパッケージイラストなど、様々な媒体で活動中。
          <br />■ 主な使用ツール
          <br />
          ・アナログ：アクリルガッシュ／鉛筆／クレヨン　他
          <br />
          ・デジタル：Procreate（iPad）／Adobe CC
        </p>
      </div>
      <div className={styles.imageBox}>
        <div className={styles.image}>画像</div>
      </div>
    </div>
  );
};

export default Profile;
