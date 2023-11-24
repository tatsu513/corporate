import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import SectionTitle from './common/SectionTitle';
import SectionTitleVertical from './common/SectionTitleVertical';
import useMediaQuery, { mediaQuery } from 'hooks/useMediaQuery';
import useSanouOrUnou from 'hooks/useSanouOrUnou';
import styles from 'styles/modules/PageSecondSection.module.scss';
interface Props {
  children: ReactNode;
}

const PageSecondSection: React.FC<Props> = ({ children }) => {
  const pagename = useSanouOrUnou();
  const isSanou = pagename === 'sanou';
  const isSm = useMediaQuery(mediaQuery.sm);
  const isMd = useMediaQuery(mediaQuery.mb);
  const isBelowMd = isSm || isMd;

  const sectionTitleText = isSanou ? 'About' : 'News';

  const [contentRef, inView] = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: true,
  });
  return (
    <>
      <div className={styles.contentWrap}>
        <div className={styles.sectionTitleBox}>
          {isBelowMd ? (
            <SectionTitle title={sectionTitleText} side={'left'} />
          ) : (
            <SectionTitleVertical
              title={sectionTitleText}
              isHighMargin={true}
            />
          )}
        </div>
        <div
          ref={contentRef}
          className={`${styles.body} ${inView && styles.inView}`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default PageSecondSection;
