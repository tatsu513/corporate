import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import { MarkdownFileData } from 'models/';
import { ContextData } from 'pages/BaseProvider';
import styles from 'styles/modules/PortfolioList.module.scss';

interface Props {
  items: MarkdownFileData[];
}

const PortfolioList: React.VFC<Props> = ({ items }) => {
  const router = useRouter();
  const ctx = useContext(ContextData);

  const [contentRef, inView] = useInView({
    rootMargin: '-50px 0px',
    triggerOnce: true,
  });

  const isMinWidth = () => {
    if (ctx.width <= 1024) {
      const sectionWidth = ctx.width * 0.9;
      const workBoxWidth = sectionWidth * 0.46;
      return workBoxWidth <= 300;
    } else {
      return false;
    }
  };

  const maxItemLength = ctx.width > 1024 ? 9 : 6;
  return (
    <div
      ref={contentRef}
      className={`${styles.workWrap} ${inView && styles.inView}`}
    >
      {items.map(
        (item, i) =>
          i <= maxItemLength && (
            <div
              className={`${styles.workBox} ${
                isMinWidth() && styles.minWidth
              }`}
              key={i}
              onClick={() =>
                router.push(`/unou/portfolio/${item.slug}`)
              }
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
          ),
      )}
    </div>
  );
};

export default PortfolioList;
