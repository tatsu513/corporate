import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
// import marked from 'marked';
import { GetStaticProps } from 'next';
import { useState, useContext } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Contact from '@/components/Contact';
import Menu from '@/components/Menu';
import PortfolioList from '@/components/PortfolioList';
import SectionTitle from '@/components/common/SectionTitle';
import { unouPortfolioCategories } from 'domains/unou';
import { portfolioBreadcrumb } from 'domains/unou';
import { MarkdownFileData } from 'models/';
import { ContextData } from 'pages/BaseProvider';
import styles from 'styles/modules/Illusts.module.scss';

interface Props {
  articles: MarkdownFileData[];
}

const IllustPortfolio: React.VFC<Props> = ({ articles }) => {
  const [works, setWorks] = useState(articles);
  const [selectedItem, setSelectedItem] = useState('all');

  const ctx = useContext(ContextData);

  const selectItem = (type: string) => {
    const filter = (data: MarkdownFileData[]) => {
      const n = data.filter((d) => {
        return d.frontmatter.categories.includes(type);
      });
      return n;
    };
    filter(articles);
    type === 'all'
      ? setWorks(articles)
      : setWorks(
          articles.filter((article) =>
            article.frontmatter.categories.includes(type),
          ),
        );
    setSelectedItem(type);
  };

  return (
    <>
      <Breadcrumb items={portfolioBreadcrumb} />
      <SectionTitle title={'Portfolio'} />
      <section className={`${styles.workWrap} a-nbu`}>
        <Menu
          selectedItem={selectedItem}
          items={unouPortfolioCategories}
          onClick={selectItem}
        />
      </section>
      <section className={`${styles.works} a-nbu`}>
        <PortfolioList items={works} isPage={true} />
        <p className={styles.note}>
          ※
          公開している事例はごく一部です。より詳しい事例は直接お問い合わせください。
        </p>
      </section>
      <Contact />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join('src', 'articles', 'unou'));
  const articles = files.map((filename) => {
    const slug = filename.replace(/.md/, '');
    const markdownWithMeta = fs.readFileSync(
      path.join('src', 'articles', 'unou', filename),
      'utf-8',
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);
    return { slug, frontmatter, content };
  });

  return { props: { articles } };
};

export default IllustPortfolio;
