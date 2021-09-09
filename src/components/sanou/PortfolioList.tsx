import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { workCategories } from 'domains';
import { MarkdownFileData } from 'models/';
import styles from 'styles/modules/sanou/PortfolioList.module.scss';

interface Props {
  items: MarkdownFileData[];
  windowWidth: number;
}

const PortfolioList: React.VFC<Props> = ({ items, windowWidth }) => {
  const isMinWidth = () => {
    if (windowWidth <= 1024) {
      const sectionWidth = windowWidth * 0.9;
      const workBoxWidth = sectionWidth * 0.46;
      return workBoxWidth <= 300;
    } else {
      return false;
    }
  };
  const router = useRouter();
  return (
    <div className={styles.workWrap}>
      {items.map((item, i) => (
        <div
          className={`${styles.workBox} ${
            isMinWidth() && styles.minWidth
          }`}
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
          <ul className={styles.workCategoryBox}>
            {item.frontmatter.categories.map((cacategory, i) => (
              <li className={styles.workCategory} key={i}>
                {cacategory}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PortfolioList;
