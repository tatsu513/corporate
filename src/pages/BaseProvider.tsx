import { useRouter } from 'next/dist/client/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import Header from '@/components/Header';
import PageTopLink from '@/components/common/PageTopLink';

export const ContextData = createContext({
  width: 0,
  isSanou: false,
  isUnou: false,
});

interface Props {
  children: ReactNode;
}

const BaseProvider: React.VFC<Props> = ({ children }) => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [contextData, setContextDate] = useState({
    width: windowWidth,
    isSanou: false,
    isUnou: false,
  });

  useEffect(() => {
    const onResize = () =>
      setContextDate((prevState) => ({
        ...prevState,
        width: window.innerWidth,
      }));
    window.addEventListener('resize', onResize);

    setContextDate((prevState) => ({
      width: prevState.width,
      isUnou: router.pathname.indexOf('unou') !== -1,
      isSanou: router.pathname.indexOf('sanou') !== -1,
    }));
    return () => window.removeEventListener('resize', onResize);
  }, [router.pathname]);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);

    setContextDate((prevState) => ({
      width: prevState.width,
      isUnou: router.pathname.indexOf('unou') !== -1,
      isSanou: router.pathname.indexOf('sanou') !== -1,
    }));
    return () => window.removeEventListener('resize', onResize);
  }, [router.pathname]);
  return (
    <ContextData.Provider value={contextData}>
      <Header />
      {children}
      <PageTopLink text={'Page Top'} onClick={() => alert('top')} />
    </ContextData.Provider>
  );
};

export default BaseProvider;
