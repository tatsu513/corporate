import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import Contact from '@/components/Contact';
import { newsBreadcrumb } from 'domains/unou';
import styles from 'styles/modules/Slug.module.scss';

interface Props {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    excerpt: string;
    coverImage: string;
  };
  content: string;
}

const NewsPage: React.VFC<Props> = (props) => {
  const [breadcrumbList, setBreadcrumbList] =
    useState(newsBreadcrumb);

  useEffect(() => {
    const customList = [...newsBreadcrumb];
    customList.push({ name: props.frontmatter.title, path: '' });
    setBreadcrumbList([...customList]);
  }, [props.frontmatter.title]);

  return (
    <>
      <Breadcrumb items={breadcrumbList} />
      <section className={styles.newsWrao}>
        <div className={styles.date}>{props.frontmatter.date}</div>
        <div className={styles.title}>
          {props.frontmatter.excerpt}
        </div>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{
            __html: marked(props.content),
          }}
        />
      </section>
      <Contact />
    </>
  );
};

interface Params {
  params: {
    slug: string;
  };
}

export const getStaticPaths = async () => {
  const newsFiles = fs.readdirSync(
    path.join('src', 'articles', 'news'),
  );

  const paths = newsFiles.map((filename) => ({
    params: {
      slug: filename.replace(/.md/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('src', 'articles', 'news', `${params.slug}.md`),
    'utf-8',
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);
  return { props: { frontmatter, slug: params.slug, content } };
};

export default NewsPage;
