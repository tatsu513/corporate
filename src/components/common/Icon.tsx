import Image, { StaticImageData } from 'next/image';
import styles from 'styles/modules/Icon.module.scss';
interface Props {
  alt: string;
  icon: string | StaticImageData;
  width: number;
  height?: number;
  href?: string;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

const Icon: React.FC<Props> = (props) => {
  return (
    <a
      className={`${styles.iconBox} ${props.href && styles.linkIcon}`}
      style={{
        width: `${props.width}px`,
        height: `${props.height || props.width}px`,
        marginTop: `${props.marginTop || 0}px`,
        marginRight: `${props.marginRight || 0}px`,
        marginBottom: `${props.marginBottom || 0}px`,
        marginLeft: `${props.marginLeft || 0}px`,
      }}
      href={props.href || '#'}
      rel='noreferrer'
      target='_blank'
    >
      <Image src={props.icon} alt={props.alt} />
    </a>
  );
};

export default Icon;
