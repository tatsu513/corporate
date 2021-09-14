import { ReactNode, useContext } from 'react';
import SectionTitle from './common/SectionTitle';
import SectionTitleVertical from './common/SectionTitleVertical';
import { ContextData } from 'pages/BaseProvider';
import styles from 'styles/modules/PageSecondSection.module.scss';

interface Props {
  children: ReactNode;
}

const PageSecondSection: React.VFC<Props> = ({ children }) => {
  const ctx = useContext(ContextData);
  const isSanou = ctx.isSanou;
  const isMd = ctx.width < 1024;

  const sectionTitleText = isSanou ? 'About' : 'News';
  return (
    <>
      <div className={styles.contentWrap}>
        <div className={styles.sectionTitleBox}>
          {isMd ? (
            <SectionTitle title={sectionTitleText} side={'left'} />
          ) : (
            <SectionTitleVertical title={sectionTitleText} />
          )}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </>
  );
};

export default PageSecondSection;
