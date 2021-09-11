import Link from 'next/link';
import SectionTitle from './common/SectionTitle';
import styles from 'styles/modules/Recommendation.module.scss';

const Recommendation = () => {
  return (
    <div className='sectionWrapper'>
      <SectionTitle
        title={`Recommen-\ndation`}
        subTitle={'スタートアップ・ベンチャー\n企業様からの推薦文'}
      />
      {/* 株式会社新閃力 */}
      <section className={styles.recommendBox}>
        <div className={styles.item}>
          <div className={styles.image} />
          <Link href='https://shinsenryoku.com/'>
            <a className={styles.company} target='_blank'>
              株式会社新閃力
            </a>
          </Link>
          <div className={styles.name}>代表取締役　尾崎えり子様</div>
          <p className={styles.text}>
            弊社が新事業を立ち上げた時に依頼しました。
            <br />
            まだ事業の詳細が固まっていない中でしたが、ビジョンを伝えただけでデザインに落とし込んでいただき、大変助かりました。
            <br />
            おかげで、弊社の柱となる事業に成長しました。
          </p>
        </div>
        {/* 株式会社アンドパッド */}
        <div className={styles.item}>
          <div className={`${styles.image} ${styles.image2}`} />
          <Link href='https://andpad.co.jp/'>
            <a className={styles.company} target='_blank'>
              株式会社アンドパッド
            </a>
          </Link>
          <div className={styles.name}>
            デザイン部部長　前嶋康秀様
          </div>
          <p className={styles.text}>
            あるプロダクトのUI/UXデザインを約2年担当していただきました。
            <br />
            toB向けで業務+業界理解が必要ですが、自主的に勉強会を定期的に開催。
            チームメンバーを巻き込んだ結果、プロダクトの品質がとても向上しました。
          </p>
        </div>
        {/* 株式会社Colabo-ya */}
        <div className={styles.item}>
          <div className={`${styles.image} ${styles.image3}`} />
          <Link href='https://colabo-ya.jp/'>
            <a className={styles.company} target='_blank'>
              株式会社Colabo-ya
            </a>
          </Link>
          <div className={styles.name}>代表取締役　白澤美幸様</div>
          <p className={styles.text}>
            彼女自身がIT系の企業で培ったヒアリング能力と幅広い表現力によって、イメージをすり合わせる時必要なアーキテクチャーがない状態から依頼をすることができ、できたデザインはコンセプトの背景まで一気に伝わる気持ちよさがあります。
          </p>
        </div>
      </section>
    </div>
  );
};

export default Recommendation;
