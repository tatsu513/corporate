import styles from 'styles/modules/ArrowLink.module.scss';

interface Props {
  text: string;
  onClick: () => void;
}

const ArrowLink: React.VFC<Props> = (props) => {
  return (
    <div className={styles.arrowLinkBox}>
      <span onClick={() => props.onClick()} className={styles.text}>
        {props.text}
      </span>
    </div>
  );
};

export default ArrowLink;
