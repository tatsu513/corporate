import styles from 'styles/modules/TextLink.module.scss';

interface Props {
  text: string;
  size?: number;
  color?: string;
  marginRight?: number;
}

const TextLink: React.VFC<Props> = (props) => {
  return (
    <div
      className={styles.link}
      style={{
        marginRight: `${props.marginRight}px`,
      }}
    >
      <span
        className={`${styles.text} ${
          props.color === 'white' && styles.white
        }`}
        style={{ fontSize: `${props.size}px`, color: props.color }}
      >
        {props.text}
      </span>
    </div>
  );
};

export default TextLink;
