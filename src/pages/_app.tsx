import 'styles/global.scss';
import 'styles/reset.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./BaseProvider'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DynamicComponent>
        <main>
          <Component {...pageProps} />
        </main>
      </DynamicComponent>
    </>
  );
}
export default MyApp;
