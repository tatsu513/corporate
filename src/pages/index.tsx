import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import styles from 'styles/modules/Home.module.scss';

export const Home: React.VFC = () => {
  const router = useRouter();
  return (
    <div className={styles.topWrap}>
      <div onClick={() => router.push('/unou')}>右脳</div>
      <div onClick={() => router.push('/sanou')}>左脳</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default Home;
