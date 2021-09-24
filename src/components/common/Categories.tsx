import styles from 'styles/modules/Categories.module.scss';

interface Props {
  categories: string[];
}

const Categories: React.VFC<Props> = (props) => {
  return (
    <ul className={styles.workCategoryBox}>
      {props.categories.map((cacategory, i) => (
        <li className={styles.workCategory} key={i}>
          {cacategory}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
