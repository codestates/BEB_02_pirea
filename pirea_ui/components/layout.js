import Sidebar from './sidebar'
import Content_header from './content_header'
import styles from './styles-component/layout.module.css'


// TODO: 호환성 고려, (dart, light)
export default function Layout({ children }) {
  return (
    <>
      <div className={styles.main_layout}>
        <div className={styles.main_sidebar}>
          <Sidebar />
        </div>
        <div className={styles.main_content}>
          <div className={styles.main_content_header}>
            <Content_header />
          </div>
          <div className={styles.main_content_body}>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
