import styles from 'styles/modules/SectionTitle.module.scss';

interface Props {
  title: string;
  side?: string;
  subTitle?: string;
}

const SectionTitle: React.VFC<Props> = (props) => {
  return (
    <div className={styles.titleWrap}>
      <h2
        className={`${styles.title} ${
          props.side === 'left' && styles.left
        }`}
      >
        {props.title}
      </h2>
      {props.subTitle && (
        <div className={styles.subTitleWrap}>
          <span className={styles.subTitle}>{props.subTitle}</span>
        </div>
      )}
    </div>
  );
};

export default SectionTitle;
