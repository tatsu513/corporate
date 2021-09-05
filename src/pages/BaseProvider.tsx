import { createContext, ReactNode, useEffect, useState } from 'react';
import Header from '@/components/Header';
import PageTopLink from '@/components/common/PageTopLink';

export const Width = createContext(0);

interface Props {
  children: ReactNode;
}

const BaseProvider: React.VFC<Props> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <Width.Provider value={windowWidth}>
      <Header />
      {children}
      <PageTopLink text={'Page Top'} onClick={() => alert('top')} />
    </Width.Provider>
  );
};

export default BaseProvider;
