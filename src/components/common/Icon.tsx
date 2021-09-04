import Image from 'next/image';
import styles from 'styles/modules/Icon.module.scss';

interface Props {
  alt: string;
  icon: string | StaticImageData;
  width: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

const Icon: React.VFC<Props> = (props) => {
  return (
    <div
      className={styles.iconBox}
      style={{
        width: `${props.width}px`,
        height: `${props.height || props.width}px`,
        marginTop: `${props.marginTop || 0}px`,
        marginRight: `${props.marginRight || 0}px`,
        marginBottom: `${props.marginBottom || 0}px`,
        marginLeft: `${props.marginLeft || 0}px`,
      }}
    >
      <Image src={props.icon} alt={props.alt} />
    </div>
  );
};

export default Icon;
