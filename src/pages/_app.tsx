import 'styles/global.scss';
import 'styles/reset.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import PageTopLink from '@/components/common/PageTopLink';

const DynamicComponent = dynamic(() => import('./BaseProvider'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DynamicComponent>
        <main>
          <Header />
          <Component {...pageProps} />
          <PageTopLink text={'Page Top'} onClick={() => alert('top')} />
        </main>
      </DynamicComponent>
    </>
  );
}
export default MyApp;
