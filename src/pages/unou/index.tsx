import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
// import marked from 'marked';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import React, {
  createRef,
  RefObject,
  useCallback,
  useEffect,
} from 'react';
import { useInView } from 'react-intersection-observer';
import Contact from '@/components/Contact';
import PageSecondSection from '@/components/PageSecondSection';
import PortfolioList from '@/components/PortfolioList';
import UnouProfile from '@/components/UnouProfile';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SectionTitle from '@/components/common/SectionTitle';
import topImage from 'images/unou-image.png';
import { MarkdownFileData } from 'models/';
import styles from 'styles/modules/Unou.module.scss';

interface Props {
  articles: MarkdownFileData[];
  news: MarkdownFileData[];
}

const Unou: React.VFC<Props> = ({ articles, news }) => {
  const router = useRouter();

  const homeRef = createRef<HTMLDivElement>();
  const newsRef = createRef<HTMLDivElement>();
  const portfolioRef = createRef<HTMLDivElement>();
  const profileRef = createRef<HTMLDivElement>();
  const contactRef = createRef<HTMLDivElement>();

  const [topImageRef, inView] = useInView({
    rootMargin: '-50px 0px',
    triggerOnce: true,
  });

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
          scrollToTarget(homeRef);
          break;
        case 'news':
          scrollToTarget(newsRef, 114);
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
    [homeRef, newsRef, portfolioRef, profileRef, contactRef],
  );

  useEffect(() => {
    const target = router.query.target as string;
    if (!target) return;
    swichTarget(target || 'home');
  }, [swichTarget, router.query]);

  return (
    <>
      {/* {articles.map((article, i) => (
        <div className={styles.aaa} key={i}>
          <h3>{article.frontmatter.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: marked(article.content) }} />
        </div>
      ))} */}
      <div className={`${styles.topImage}`} ref={homeRef}>
        <span
          ref={topImageRef}
          className={`${styles.imageWrap} ${inView && styles.inView}`}
        >
          <Image src={topImage} alt={'トップイメージ'} />
        </span>
      </div>
      <div className={`${styles.newsWrap}`} ref={newsRef}>
        <PageSecondSection>
          <section className='a-nbu'>
            <ul className={styles.itemWrap}>
              {news.map((item, i) => (
                <li className={styles.item} key={i}>
                  <span className={styles.date}>
                    {item.frontmatter.date.replace(/-/g, '.')}
                  </span>
                  <span className={styles.text}>
                    {item.frontmatter.excerpt}
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
    if (a.frontmatter.date < b.frontmatter.date) {
      return -1;
    } else {
      return 1;
    }
  });

  const orderedArticles = articles.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return -1;
    } else {
      return 1;
    }
  });

  return { props: { articles: orderedArticles, news: orderedNews } };
};

export default Unou;
