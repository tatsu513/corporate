import 'styles/global.scss';
import 'styles/reset.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import {
  ChangeEvent,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import Auth from '@/components/Auth';

const DynamicComponent = dynamic(() => import('./BaseProvider'), {
  ssr: false,
});

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
      <DynamicComponent>
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
      </DynamicComponent>
    </>
  );
}
export default MyApp;
