import { useEffect, useRef } from 'react';
import { WorkCategories } from 'models';
import styles from 'styles/modules/Menu.module.scss';

interface Props {
  selectedItem: string;
  items: WorkCategories[];
  onClick: (category: string) => void; // eslint-disable-line
}

const Menu: React.VFC<Props> = (props) => {
  const ref = useRef(null);

  useEffect(() => {
    const target = document.getElementById('menuBox');
    let items = document.querySelectorAll('.menuItem');
    const arrItem: HTMLElement[] = [].slice.call(items);
    const widths: number[] = arrItem.map((item) => item.clientWidth);
    const itemLength = widths.length;
    const totalWidth = widths.reduce((acc: number, val: number) => {
      return acc + val;
    });
    if (target) {
      target.style.width = `${totalWidth + (40 * itemLength - 1)}px`;
    }
  });
  return (
    <ul ref={ref} id='menuBox' className={styles.itemBox}>
      {props.items.map((item, index) => (
        <li
          key={index}
          className={`${styles.item} menuItem ${
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
