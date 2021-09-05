import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Contact from '@/components/Contact';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SectionTitle from '@/components/common/SectionTitle';
import SectionTitleVertical from '@/components/common/SectionTitleVertical';
import styles from 'styles/modules/Sanou.module.scss';

interface Articles {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
    category: string;
  };
  content: string;
}

interface Props {
  articles: Articles[];
}

const Sanou: React.VFC<Props> = ({ articles }) => {
  const router = useRouter();
  return (
    <div>
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
      <SectionTitle
        title={'Portfolio'}
        subTitle={'グラフィック・WEB・UI/UXデザイン'}
      />
      <div className={styles.workWrap}>
        <div className={styles.worksErea}>
          {articles.map((article, i) => (
            <div className={styles.aaa} key={i}>
              <h3>{article.frontmatter.title}</h3>
              <h4>{article.frontmatter.category}</h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(article.content),
                }}
              />
            </div>
          ))}
        </div>
        <div className={styles.controller}>
          <PrimaryButton
            text={'More'}
            onClick={() => router.push('/designs')}
          />
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
