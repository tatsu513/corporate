import styles from 'styles/modules/SectionTitleVertical.module.scss';

interface Props {
  title: string;
  side?: string;
  subTitle?: string;
}

const SectionTitleVertical: React.VFC<Props> = (props) => {
  return (
    <div className={styles.titleWrap}>
      <h2 className={styles.title}>{props.title}</h2>
      {props.subTitle && (
        <div className={styles.subTitleWrap}>
          <span className={styles.subTitle}>{props.subTitle}</span>
        </div>
      )}
    </div>
  );
};

export default SectionTitleVertical;
