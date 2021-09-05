import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import styles from 'styles/modules/PortfolioList.module.scss';

interface Article {
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
  items: Article[];
}

const PortfolioList: React.VFC<Props> = ({ items }) => {
  const router = useRouter();
  return (
    <>
      {items.map((item, i) => (
        <div
          className={styles.workBox}
          key={i}
          onClick={() => router.push(`/unou/portfolio/${item.slug}`)}
        >
          <div className={styles.imageBox} key={i}>
            <div className={styles.imageAjBox}>
              <Image
                src={item.frontmatter.coverImage}
                width='1000'
                height='1000'
                alt={'トップイメージ'}
              />
            </div>
          </div>
          <div className={styles.worksText}>
            {item.frontmatter.title}／{item.frontmatter.excerpt}
          </div>
        </div>
      ))}
    </>
  );
};

export default PortfolioList;
