import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { MarkdownFileData } from 'models/';
import { ContextData } from 'pages/BaseProvider';
import styles from 'styles/modules/PortfolioList.module.scss';

interface Props {
  items: MarkdownFileData[];
  isPage?: boolean;
}

const PortfolioList: React.VFC<Props> = ({ items, isPage }) => {
  const router = useRouter();
  const ctx = useContext(ContextData);
  const [isMin, setIsMin] = useState(false);
  const [maxLength, setMaxLength] = useState(0);

  const [contentRef, inView] = useInView({
    rootMargin: '-100px 0px',
    triggerOnce: true,
  });

  useEffect(() => {
    if (ctx.width <= 1024) {
      const sectionWidth = ctx.width * 0.9;
      const workBoxWidth = sectionWidth * 0.46;
      setIsMin(workBoxWidth <= 300);
    } else {
      setIsMin(false);
    }
  }, [ctx.width]);

  useEffect(() => {
    !isPage
      ? setMaxLength(items.length)
      : isMin
      ? setMaxLength(6)
      : setMaxLength(3);
  }, [isPage, items.length, isMin]);

  useEffect(() => {
    if (isPage) {
      const onScroll = () => {
        const scrollVal = document.documentElement.scrollTop;
        const documentHeight = document.documentElement.clientHeight;
        const pageXOffset = document.documentElement.scrollHeight;

        if (
          pageXOffset === scrollVal + documentHeight &&
          items.length > maxLength
        ) {
          setMaxLength((prevState) => prevState + 6);
        }
      };
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [isPage, maxLength, items.length]);

  return (
    <div
      ref={contentRef}
      className={`${styles.workWrap} ${inView && styles.inView}`}
    >
      {items.map(
        (item, i) =>
          i + 1 <= maxLength && (
            <div
              className={`${styles.workBox} ${
                isMin && styles.minWidth
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
