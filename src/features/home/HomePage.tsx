import { Logo } from '../../components/Logo'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Logo alt="EDMOX" size="lg" />
      </div>
    </main>
  )
}

