import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
// import marked from 'marked';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Contact from '@/components/Contact';
import Portfolio from '@/components/PortfolioList';
import Profile from '@/components/Profile';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SectionTitle from '@/components/common/SectionTitle';
import SectionTitleVertical from '@/components/common/SectionTitleVertical';
import topImage from 'images/unou-image.png';
import { MarkdownFileData } from 'models/';
import styles from 'styles/modules/Unou.module.scss';

interface Props {
  articles: MarkdownFileData[];
  news: MarkdownFileData[];
}

const Unou: React.VFC<Props> = ({ articles, news }) => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const NewsSectionTitle = () => {
    if (windowWidth > 1024) {
      return (
        <div className={styles.sectionTitleBox}>
          <SectionTitleVertical title={'News'} />
        </div>
      );
    } else {
      return <SectionTitle title={'News'} side={'left'} />;
    }
  };

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return (
    <>
      {/* {articles.map((article, i) => (
        <div className={styles.aaa} key={i}>
          <h3>{article.frontmatter.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: marked(article.content) }} />
        </div>
      ))} */}
      <div className={`${styles.topImage} a-nop `}>
        <Image src={topImage} alt={'トップイメージ'} />
      </div>
      <div className={styles.newsWrap}>
        <div className={styles.newsContents}>
          <NewsSectionTitle />
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
        </div>
      </div>
      <div className={styles.portfolioWrap}>
        <SectionTitle title={'Portfolio'} />
        <section className={`${styles.works} a-nbu`}>
          <Portfolio items={articles} />
        </section>
        <div className={styles.controller}>
          <PrimaryButton
            text={'More'}
            onClick={() => router.push('/unou/portfolio')}
          />
        </div>
      </div>
      <section className={`${styles.profileWrap} a-nop`}>
        <Profile windowWidth={windowWidth} />
      </section>
      <Contact />
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
