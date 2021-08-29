import React, { ChangeEvent } from 'react';
import styles from 'styles/modules/TextArea.module.scss';

interface Props {
  label: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextArea: React.VFC<Props> = (props) => {
  return (
    <div className={styles.textAreaWrap}>
      <span className={styles.label}>{props.label}</span>
      <textarea className={styles.input} rows={5} />
    </div>
  );
};

export default TextArea;
