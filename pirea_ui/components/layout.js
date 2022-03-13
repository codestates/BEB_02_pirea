import Sidebar from './sidebar'
import Content_header from './content_header'
import Web3 from 'web3'
import styles from './styles-component/layout.module.css'


// TODO: 호환성 고려, (dart, light)
export default function Layout({ children }) {
  return (
    <div className={styles.main_layout}>
      <div className={styles.main_sidebar}>
        <Sidebar />
      </div>
      <div className={styles.main_content}>
        <div className={styles.main_content_header}>
          <Content_header />
        </div>
        <main className={styles.main_content_body}>
          {children}
        </main>
      </div>
    </div>
  )
}
