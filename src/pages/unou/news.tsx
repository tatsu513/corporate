import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import { GetStaticProps } from 'next';
import Contact from '@/components/Contact';
import ArrowLinkNormal from '@/components/common/ArrowLinkNormal';
import SectionTitle from '@/components/common/SectionTitle';
import styles from 'styles/modules/News.module.scss';

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
  news: markdownInfo[];
}

const News: React.VFC<Props> = ({ news }) => {
  return (
    <>
      <div className='top-title-box'>
        <SectionTitle title={'News Archive'} />
      </div>
      <section className={styles.newsWrap}>
        {news.map((item, i) => (
          <div className={styles.itemBox} key={i}>
            <div className={styles.date}>
              {item.frontmatter.date.replace(/-/g, '.')}
            </div>
            <div className={styles.title}>
              {item.frontmatter.excerpt}
            </div>
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{
                __html: marked(item.content),
              }}
            />
            <div className={styles.controller}>
              <ArrowLinkNormal
                text={'More'}
                onClick={() => alert('more')}
              />
            </div>
          </div>
        ))}
      </section>
      <Contact />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const newsFiles = fs.readdirSync(path.join('src', 'news'));

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

  return { props: { news: orderedNews } };
};

export default News;
