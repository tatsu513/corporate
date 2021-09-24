import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
// import marked from 'marked';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Menu from '@/components/Menu';
import PortfolioList from '@/components/PortfolioList';
import SectionTitle from '@/components/common/SectionTitle';
import {
  sanouPortfolioBreadcrumb,
  sanouPortfolioCategories,
} from 'domains/sanou';
import { MarkdownFileData } from 'models/';
import styles from 'styles/modules/Illusts.module.scss';

interface Props {
  articles: MarkdownFileData[];
}

const IllustPortfolio: React.VFC<Props> = ({ articles }) => {
  const [works, setWorks] = useState(articles);
  const [selectedItem, setSelectedItem] = useState('all');

  const selectItem = (type: string) => {
    const filter = (data: MarkdownFileData[]) => {
      const filterdItems = data.filter((d) => {
        return d.frontmatter.categories.includes(type);
      });
      return filterdItems;
    };
    filter(works);
    type === 'all'
      ? setWorks(works)
      : setWorks(
          articles.filter((article) =>
            article.frontmatter.categories.includes(type),
          ),
        );
    setSelectedItem(type);
  };
  return (
    <>
      <Breadcrumb items={sanouPortfolioBreadcrumb} />
      <SectionTitle title={'Portfolio'} />
      <section className={`${styles.workWrap} a-nbu`}>
        <Menu
          selectedItem={selectedItem}
          items={sanouPortfolioCategories}
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
    </>
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

export default IllustPortfolio;
