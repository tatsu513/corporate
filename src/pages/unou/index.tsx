import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import React, {
  createRef,
  RefObject,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import Contact from '@/components/Contact';
import PageSecondSection from '@/components/PageSecondSection';
import PortfolioList from '@/components/PortfolioList';
import UnouProfile from '@/components/UnouProfile';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SectionTitle from '@/components/common/SectionTitle';
import topImage from 'images/unou-image.png';
import { MarkdownFileData } from 'models/';
import { ContextData } from 'pages/BaseProvider';
import styles from 'styles/modules/Unou.module.scss';

interface Props {
  articles: MarkdownFileData[];
  news: MarkdownFileData[];
}

const Unou: React.VFC<Props> = ({ articles, news }) => {
  const ctx = useContext(ContextData);
  const router = useRouter();

  const homeRef = createRef<HTMLDivElement>();
  const newsRef = createRef<HTMLDivElement>();
  const portfolioRef = createRef<HTMLDivElement>();
  const profileRef = createRef<HTMLDivElement>();
  const contactRef = createRef<HTMLDivElement>();

  const isPc = ctx.width > 1024;

  const scrollToTarget = (
    ref: RefObject<HTMLDivElement>,
    minus: number = 0,
  ) => {
    window.scrollTo({
      top: ref.current!.offsetTop - minus,
      left: 0,
      behavior: 'smooth',
    });
  };

  const swichTarget = useCallback(
    (target: string) => {
      switch (target) {
        case 'home':
          scrollToTarget(homeRef, isPc ? 74 : 60);
          break;
        case 'news':
          scrollToTarget(newsRef, 58);
          break;
        case 'portfolio':
          scrollToTarget(portfolioRef);
          break;
        case 'profile':
          scrollToTarget(profileRef);
          break;
        case 'contact':
          scrollToTarget(contactRef);
          break;
        default:
          break;
      }
    },
    [homeRef, isPc, newsRef, portfolioRef, profileRef, contactRef],
  );

  useEffect(() => {
    const targetQuery = router.query.target as string;
    const targetSamePage = ctx.target;
    if (!targetQuery && targetSamePage === '') return;
    const moveInPage = targetSamePage !== '';
    if (moveInPage) {
      swichTarget(targetSamePage);
    } else {
      swichTarget(targetQuery);
    }
  }, [swichTarget, router.query, ctx.target]);

  return (
    <>
      <Head>
        <title>右脳 - 株式会社聴くと描く</title>
      </Head>
      <div className={`${styles.topImage} a-nop`} ref={homeRef}>
        <Image src={topImage} alt={'トップイメージ'} />
      </div>
      <div className={`${styles.newsWrap}`} ref={newsRef}>
        <PageSecondSection>
          <section className='a-nbu'>
            <ul className={styles.itemWrap}>
              {news.map((item, i) => (
                <li
                  className={styles.item}
                  key={i}
                  onClick={() =>
                    router.push(`/unou/news/${item.slug}`)
                  }
                >
                  <span className={styles.date}>
                    {item.frontmatter.date.replace(/-/g, '.')}
                  </span>
                  <span className={styles.text}>
                    {item.frontmatter.title}
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.controller}>
              <PrimaryButton
                text={'More'}
                onClick={() => router.push('unou/news')}
              />
            </div>
          </section>
        </PageSecondSection>
      </div>
      <div className='sectionWrapper' ref={portfolioRef}>
        <SectionTitle title={'Portfolio'} />
        <section className={`${styles.works} a-nbu`}>
          <PortfolioList items={articles} />
        </section>
        <div className={styles.controller}>
          <PrimaryButton
            text={'More'}
            onClick={() => router.push('/unou/portfolio')}
          />
        </div>
      </div>
      <section className='sectionWrapper' ref={profileRef}>
        <UnouProfile />
      </section>
      <div ref={contactRef}>
        <Contact />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const articleFiles = fs.readdirSync(
    path.join('src', 'articles', 'unou'),
  );
  const newsFiles = fs.readdirSync(
    path.join('src', 'articles', 'news'),
  );

  const articles = articleFiles.map((filename) => {
    const slug = filename.replace(/.md/, '');
    const markdownWithMeta = fs.readFileSync(
      path.join('src', 'articles', 'unou', filename),
      'utf-8',
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);
    return { slug, frontmatter, content };
  });

  const news = newsFiles.map((filename) => {
    const slug = filename.replace(/.md/, '');
    const markdownWithMeta = fs.readFileSync(
      path.join('src', 'articles', 'news', filename),
      'utf-8',
    );
    const { data: frontmatter, content } = matter(markdownWithMeta);
    return { slug, frontmatter, content };
  });

  const orderedNews = news.sort((a, b) => {
    if (a.frontmatter.date > b.frontmatter.date) {
      return -1;
    } else {
      return 1;
    }
  });

  console.log(orderedNews);

  const orderedArticles = articles.sort((a, b) => {
    if (a.frontmatter.date > b.frontmatter.date) {
      return -1;
    } else {
      return 1;
    }
  });

  return { props: { articles: orderedArticles, news: orderedNews } };
};

export default Unou;
