import SectionTitle from './common/SectionTitle';
import styles from 'styles/modules/DesignFlow.module.scss';

const DesignFlow = () => {
  return (
    <>
      <SectionTitle
        title={'Design Flow'}
        side={'left'}
        subTitle={'こんな流れでデザインします'}
      />
      <section className={styles.flowBox}>
        <div className={styles.flow}>
          <h3 className={styles.flowTitle}>1 聴く</h3>
          <p className={styles.text}>
            ヒアリングシートを元に、以下の様なお話を伺います。
          </p>
          <ul>
            <li className={styles.flowListItem}>
              - 現状分析・課題発見
            </li>
            <li className={styles.flowListItem}>- ゴール設定</li>
            <li className={styles.flowListItem}>
              - やること・作るものを決定
            </li>
            <li className={styles.flowListItem}>
              - 希望のデザインテイスト
            </li>
          </ul>
        </div>
        <div className={styles.flow}>
          <h3 className={styles.flowTitle}>2 描く</h3>
          <p className={styles.text}>
            １を元に、デザインの叩き台を作成します。この段階で納得行くまでやり取りします。
          </p>
          <ul>
            <li className={styles.flowListItem}>
              ※判断基準は「１で設定したゴールを達成できているか？」です。
            </li>
          </ul>
        </div>
        <div className={styles.flow}>
          <h3 className={styles.flowTitle}>3 本番作成・納品</h3>
          <p className={styles.text}>
            ２を元に、最終的な納品物を作成します。お客様に検収頂き、OKなら納品完了です。
          </p>
          <ul>
            <li className={styles.flowListItem}>
              ※Web・UIUXの場合は、この後、実装結果のデザインチェックも実施します。
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default DesignFlow;
