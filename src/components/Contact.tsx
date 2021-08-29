import { useState, useCallback, ChangeEvent } from 'react';
import PrimaryButton from './buttons/PrimaryButton';
import SectionTitle from './common/SectionTitle';
import TextArea from './forms/TextArea';
import TextField from './forms/TextField';
import styles from 'styles/modules/Contact.module.scss';

const Contact: React.VFC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const inputEmail = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [],
  );
  const inputName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [],
  );
  const inputTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    [],
  );
  const inputBody = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setBody(event.target.value);
    },
    [],
  );
  return (
    <div className={styles.contactWrap}>
      <SectionTitle title={'Contact'} />
      <div className={styles.contactContainer}>
        <div className={styles.contents}>
          <div className={styles.itemBox}>
            <div className={styles.item}>
              <TextField
                label={'メールアドレス'}
                value={email}
                onChange={inputEmail}
              />
            </div>
            <div className={styles.item}>
              <TextField
                label={'貴社名・お名前'}
                value={name}
                onChange={inputName}
              />
            </div>
            <div className={styles.item}>
              <TextField
                label={'タイトル'}
                value={title}
                onChange={inputTitle}
              />
            </div>
          </div>
          <div className={styles.itemBox}>
            <TextArea
              label={'お問い合わせ内容'}
              value={body}
              onChange={inputBody}
            />
          </div>
        </div>
        <div className={styles.controller}>
          <PrimaryButton
            text={'Send'}
            onClick={() => alert('送信')}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
