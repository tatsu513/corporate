import { WorkCategories } from 'models';
import styles from 'styles/modules/Menu.module.scss';

interface Props {
  selectedItem: string;
  items: WorkCategories[];
  onClick: (category: string) => void; // eslint-disable-line
}

const Menu: React.VFC<Props> = (props) => {
  return (
    <ul className={styles.itemBox}>
      {props.items.map((item, index) => (
        <li
          key={index}
          className={`${styles.item} ${
            item.type === props.selectedItem && styles.isActive
          }`}
          onClick={() => props.onClick(item.type)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
