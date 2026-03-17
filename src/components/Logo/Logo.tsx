import styles from './Logo.module.css'
import logoEdmox from '../../assets/logoEdmox.png'

export type LogoProps = {
  alt: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClassNameBySize: Record<NonNullable<LogoProps['size']>, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

export function Logo({ alt, size = 'md' }: LogoProps) {
  return (
    <img
      className={`${styles.logo} ${sizeClassNameBySize[size]}`}
      src={logoEdmox}
      alt={alt}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  )
}

