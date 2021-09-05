import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import Contact from '@/components/Contact';
import Menu from '@/components/Menu';
import SectionTitle from '@/components/common/SectionTitle';
import { workCategories } from 'domains';
import styles from 'styles/modules/Designs.module.scss';

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

const Designs: React.VFC<Props> = (props) => {
  const [works, setWorks] = useState(props.articles);
  const [selectedItem, setSelectedItem] = useState('all');

  const selectItem = (type: string) => {
    type === 'all'
      ? setWorks(props.articles)
      : setWorks(
          props.articles.filter(
            (article) => article.frontmatter.category === type,
          ),
        );
    setSelectedItem(type);
  };
  return (
    <div>
      <SectionTitle title={'Portfolio'} />
      <div className={styles.workWrap}>
        <Menu
          selectedItem={selectedItem}
          items={workCategories}
          onClick={selectItem}
        />
        <div className={styles.worksErea}>
          {works.map((article, i) => (
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
        <p className={styles.note}>
          ※
          公開している事例はごく一部です。より詳しい事例は直接お問い合わせください。
        </p>
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

export default Designs;
