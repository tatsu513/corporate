import Breadcrumb from '@/components/Breadcrumb';
import Contact from '@/components/Contact';
import SectionTitle from '@/components/common/SectionTitle';
import { settlementBreadcrumb } from 'domains/unou';
import styles from 'styles/modules/Settlement.module.scss';

const Settlement: React.VFC = () => {
  return (
    <>
      <Breadcrumb items={settlementBreadcrumb} />
      <div className='top-title-box'>
        <SectionTitle title={'決算公告'} />
      </div>
      <section className={styles.settlementBox}>
        <ul className={styles.settlementItems}>
          <li className={styles.settlementItem}>
            <span className={styles.itemText}>
              第５期決算公告 - 2026年9月期
            </span>
          </li>
          <li className={styles.settlementItem}>
            <span className={styles.itemText}>
              第４期決算公告 - 2025年9月期
            </span>
          </li>
          <li className={styles.settlementItem}>
            <span className={styles.itemText}>
              第３期決算公告 - 2024年9月期
            </span>
          </li>
          <li className={styles.settlementItem}>
            <span className={styles.itemText}>
              第２期決算公告 - 2023年9月期
            </span>
          </li>
          <li className={styles.settlementItem}>
            <span className={styles.itemText}>
              第１期決算公告 - 2022年9月期
            </span>
          </li>
          <li className={styles.settlementItem}>
            <span
              className={`${styles.itemText} ${styles.noItemText}`}
            >
              現在公告事項はありません
            </span>
          </li>
        </ul>
      </section>
      <Contact />
    </>
  );
};

export default Settlement;
