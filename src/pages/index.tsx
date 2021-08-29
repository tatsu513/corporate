import { GetStaticProps } from 'next';
import styles from 'styles/modules/Home.module.scss';

export const Home: React.VFC = () => {
  return <div className={styles.topWrap}>トップ</div>;
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default Home;
