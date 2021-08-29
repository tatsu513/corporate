import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import Contact from '@/components/Contact';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SectionTitle from '@/components/common/SectionTitle';
import SectionTitleVertical from '@/components/common/SectionTitleVertical';
import topImage from 'images/a.png';
import styles from 'styles/modules/Unou.module.scss';

interface markdownInfo {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
  };
  content: string;
}

interface Props {
  articles: markdownInfo[];
  news: markdownInfo[];
}

const Unou: React.VFC<Props> = ({ articles, news }) => {
  const router = useRouter();
  return (
    <>
      {/* {articles.map((article, i) => (
        <div className={styles.aaa} key={i}>
          <h3>{article.frontmatter.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: marked(article.content) }} />
        </div>
      ))} */}
      <div className={styles.topImage}>
        <Image src={topImage} alt={'トップイメージ'} />
      </div>
      <div className={styles.newsWrap}>
        <div className={styles.newsContents}>
          <div className={styles.sectionTitleBox}>
            <SectionTitleVertical title={'News'} />
          </div>
          <div className={styles.newsBody}>
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
                onClick={() => router.push('news')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.portfolioWrap}>
        <SectionTitle title={'Portfolio'} />
        <div className={styles.works}>
          {articles.map((article, i) => (
            <div className={styles.imageBox} key={i}>
              <div className={styles.imageAjBox}>
                <Image
                  src={article.frontmatter.coverImage}
                  width='360'
                  height='360'
                  alt={'トップイメージ'}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.controller}>
          <PrimaryButton
            text={'More'}
            onClick={() => router.push('/illusts')}
          />
        </div>
      </div>
      <Contact />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const articleFiles = fs.readdirSync(path.join('src', 'unou'));
  const newsFiles = fs.readdirSync(path.join('src', 'news'));

  const articles = articleFiles.map((filename) => {
    const slug = filename.replace(/.md/, '');
    const markdownWithMeta = fs.readFileSync(
      path.join('src', 'unou', filename),
      'utf-8',
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);
    return { slug, frontmatter, content };
  });

  const news = newsFiles.map((filename) => {
    const slug = filename.replace(/.md/, '');
    const markdownWithMeta = fs.readFileSync(
      path.join('src', 'news', filename),
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
