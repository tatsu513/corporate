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
  const isSp = ctx.width < 600;

  const sectionTitleText = isSanou ? 'About' : 'News';
  return (
    <div className={styles.aboutContents}>
      <div className={styles.sectionTitleBox}>
        {isSp ? (
          <SectionTitle title={sectionTitleText} side={'left'} />
        ) : (
          <SectionTitleVertical title={sectionTitleText} />
        )}
      </div>
      <div className={styles.aboutBody}>{children}</div>
    </div>
  );
};

export default PageSecondSection;
