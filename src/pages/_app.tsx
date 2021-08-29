import 'styles/globals.css';
import 'styles/reset.css';
import type { AppProps } from 'next/app';
import {
  ChangeEvent,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import Auth from '@/components/Auth';
import Header from '@/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useLayoutEffect(() => {
    const hasAdminFlag = sessionStorage.getItem('isAdmin');
    if (hasAdminFlag === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const inputValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.target.name === 'username'
        ? setUsername(event.target.value)
        : setPassword(event.target.value);
    },
    [],
  );
  const checkUser = useCallback(() => {
    console.log(
      username,
      process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME,
    );
    console.log(
      password,
      process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD,
    );
    if (
      username === process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME &&
      password === process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD
    ) {
      sessionStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
    } else {
      setUsername('');
      setPassword('');
    }
  }, [username, password]);
  return (
    <>
      <Header />
      <main>
        {isAdmin ? (
          <Component {...pageProps} />
        ) : (
          <Auth
            username={username}
            password={password}
            onChange={inputValue}
            onSubmit={checkUser}
          />
        )}
      </main>
    </>
  );
}
export default MyApp;
