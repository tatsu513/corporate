import styles from 'styles/modules/PrimaryButton.module.scss';

interface Props {
  text: string;
  onClick: (event?: Event) => void; // eslint-disable-line
}

const PrimaryButton: React.VFC<Props> = (props) => {
  return (
    <button className={styles.button} onClick={() => props.onClick()}>
      {props.text}
    </button>
  );
};

export default PrimaryButton;
