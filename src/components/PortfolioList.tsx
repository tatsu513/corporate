import Image from 'next/image';
import styles from 'styles/modules/Portfolio.module.scss';

interface Props {
  items: any[];
}

const Portfolio: React.VFC<Props> = ({ items }) => {
  return (
    <>
      {items.map((item, i) => (
        <div className={styles.workBox} key={i}>
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

export default Portfolio;
