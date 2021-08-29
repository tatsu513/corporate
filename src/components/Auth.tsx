import styles from 'styles/modules/Auth.module.scss';

interface Props {
  username: string;
  password: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const Auth: React.VFC<Props> = (props) => {
  return (
    <div className={styles.authWrap}>
      <input
        className={styles.input}
        type='text'
        name='username'
        placeholder='username'
        value={props.username}
        onChange={(event) => props.onChange(event)}
      />
      <input
        className={styles.input}
        type='password'
        name='password'
        placeholder='password'
        value={props.password}
        onChange={(event) => props.onChange(event)}
      />
      <button className={styles.button} onClick={props.onSubmit}>
        ログイン
      </button>
    </div>
  );
};

export default Auth;
