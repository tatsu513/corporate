import styles from 'styles/modules/TextLink.module.scss';

interface Props {
  text: string;
}

const TextLink: React.VFC<Props> = (props) => {
  return (
    <div className={styles.link}>
      <span className={styles.text}>{props.text}</span>
    </div>
  );
};

export default TextLink;
