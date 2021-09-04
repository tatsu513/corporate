import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import leftImg from 'images/top_left.png';
import leftMdImg from 'images/top_left_md.png';
import mainImg from 'images/top_main.png';
import rightImg from 'images/top_right.png';
import rightMdImg from 'images/top_right_md.png';
import styles from 'styles/modules/Home.module.scss';

export const Home: React.VFC = () => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const LeftImage = () => {
    if (windowWidth > 1024) {
      return (
        <div className={styles.leftImageBox}>
          <Image src={leftImg} alt='右脳イラスト' />
        </div>
      );
    } else {
      return (
        <div className={styles.leftImageBox}>
          <Image src={leftMdImg} alt='右脳イラスト' />
        </div>
      );
    }
  };
  const RightImage = () => {
    if (windowWidth > 1024) {
      return (
        <div className={styles.rightImageBox}>
          <Image src={rightImg} alt='左脳イラスト' />
        </div>
      );
    } else {
      return (
        <div className={styles.rightImageBox}>
          <Image src={rightMdImg} alt='左脳イラスト' />
        </div>
      );
    }
  };

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <div className={styles.homeWrap}>
      <div className={styles.mainContents}>
        <h1 className={styles.leadText}>
          どちらを見ますか？
          {windowWidth >= 600}
        </h1>
        <div className={styles.controllers}>
          <button
            className={styles.button}
            onClick={() => router.push('/unou')}
          >
            <div className={styles.buttonText}>右脳</div>
            <div className={styles.buttonSubText}>
              （イラスト/アート）
            </div>
          </button>
          <button
            className={styles.button}
            onClick={() => router.push('/sanou')}
          >
            <div className={styles.buttonText}>左脳</div>
            <div className={styles.buttonSubText}>（デザイン）</div>
          </button>
        </div>
        <LeftImage />
        <div className={styles.mainImageBox}>
          <Image src={mainImg} alt='右脳・左脳' />
        </div>
        <RightImage />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default Home;
