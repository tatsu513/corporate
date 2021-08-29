import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Contact from '@/components/Contact';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SectionTitle from '@/components/common/SectionTitle';
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
  const files = fs.readdirSync(path.join('src', 'sanou'));
  const articles = files.map((filename) => {
    const slug = filename.replace(/.md/, '');
    const markdownWithMeta = fs.readFileSync(
      path.join('src', 'sanou', filename),
      'utf-8',
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);
    return { slug, frontmatter, content };
  });

  return { props: { articles } };
};

export default Sanou;
