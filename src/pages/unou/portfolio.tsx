import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import Contact from '@/components/Contact';
import Menu from '@/components/Menu';
import Portfolio from '@/components/PortfolioList';
import SectionTitle from '@/components/common/SectionTitle';
import { illustCategories } from 'domains';
import styles from 'styles/modules/Illusts.module.scss';

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

const Illusts: React.VFC<Props> = ({ articles }) => {
  const [works, setWorks] = useState(articles);
  const [selectedItem, setSelectedItem] = useState('all');

  const selectItem = (type: string) => {
    type === 'all'
      ? setWorks(articles)
      : setWorks(
          articles.filter(
            (article) => article.frontmatter.category === type,
          ),
        );
    setSelectedItem(type);
  };

  return (
    <>
      <SectionTitle title={'Portfolio'} />
      <div className={styles.workWrap}>
        <section>
          <Menu
            selectedItem={selectedItem}
            items={illustCategories}
            onClick={selectItem}
          />
        </section>
        <section className={styles.works}>
          <Portfolio items={works} />
          <p className={styles.note}>
            ※
            公開している事例はごく一部です。より詳しい事例は直接お問い合わせください。
          </p>
        </section>
      </div>
      <Contact />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join('src', 'unou'));
  const articles = files.map((filename) => {
    const slug = filename.replace(/.md/, '');
    const markdownWithMeta = fs.readFileSync(
      path.join('src', 'unou', filename),
      'utf-8',
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);
    return { slug, frontmatter, content };
  });

  return { props: { articles } };
};

export default Illusts;
