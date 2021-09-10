import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
// import marked from 'marked';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useContext } from 'react';
import Contact from '@/components/Contact';
import DesignFlow from '@/components/DesignFlow';
import Merits from '@/components/Merits';
import PortfolioList from '@/components/PortfolioList';
import PriceList from '@/components/PriceList';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SectionTitle from '@/components/common/SectionTitle';
import SectionTitleVertical from '@/components/common/SectionTitleVertical';
import MeritTitle from 'images/merit_title.svg';
import topImage from 'images/sanou_top_image.svg';
import { MarkdownFileData } from 'models/';
import { Width } from 'pages/BaseProvider';
import styles from 'styles/modules/Sanou.module.scss';

interface Props {
  articles: MarkdownFileData[];
}

const Sanou: React.VFC<Props> = ({ articles }) => {
  console.log(articles);
  const windowWidth = useContext(Width);
  const router = useRouter();

  return (
    <div>
      <div className={styles.topImage}>
        <h1 className={styles.topCopy}>
          よく聴き
          <br />
          よく描く
          <div className={styles.topImageBox}>
            <Image src={topImage} alt={'トップイメージ'} />
          </div>
        </h1>
      </div>
      <div className={styles.aboutWrap}>
        <div className={styles.aboutContents}>
          <div className={styles.sectionTitleBox}>
            <SectionTitleVertical title={'About'} />
          </div>
          <div className={styles.aboutBody}>
            <p className={styles.text}>
              よいデザインは、どうやったら生まれるでしょうか？
            </p>
            <p className={styles.text}>
              第一に、相手の話や自分の内なる声に真摯に耳を傾ける、徹底的な「聴く」姿勢
            </p>
            <p className={styles.text}>
              第二に、聴いた事を咀嚼し、夢ある具体物へと「描く」力
            </p>
            <p className={styles.text}>
              この２つが両輪となって、デザインを生み出す原動力になると私たちは考えます
            </p>
            <p className={styles.text}>
              まずは、あなたのお話・やりたいことを、聴かせてください。
              <br />
              株式会社聴くと描くが、ワンストップで実現のお手伝いを致します。
            </p>
          </div>
        </div>
      </div>
      <div className='sectionWrapper'>
        <SectionTitle
          title={'Portfolio'}
          subTitle={'グラフィック・WEB・UI/UXデザイン'}
        />
        <section className={styles.workWrap}>
          <PortfolioList items={articles} windowWidth={windowWidth} />
          <div className={styles.controller}>
            <PrimaryButton
              text={'More'}
              onClick={() => router.push('/designs')}
            />
          </div>
        </section>
      </div>
      <div className='sectionWrapper'>
        <div className={`${styles.meritWrap}`}>
          <div className={styles.meritTitle}>
            <Image
              src={MeritTitle}
              alt={'「聴くと描く」の、いいこと4つ'}
            />
          </div>
          <section className={styles.meritBox}>
            <Merits />
          </section>
          <div className={styles.meritDesignFlowWrap}>
            <DesignFlow />
          </div>
          <section className={styles.priceListWrap}>
            <PriceList />
          </section>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join('src', 'articles', 'sanou'));
  const articles = files.map((filename) => {
    const slug = filename.replace(/.md/, '');
    const markdownWithMeta = fs.readFileSync(
      path.join('src', 'articles', 'sanou', filename),
      'utf-8',
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);

    return { slug, frontmatter, content };
  });

  return { props: { articles } };
};

export default Sanou;
