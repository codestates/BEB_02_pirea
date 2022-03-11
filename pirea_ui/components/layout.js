import Sidebar from './sidebar'
import Web3 from 'web3'
import styles from './layout.module.css'

export default function Layout({ children }) {


  return (
    <>
      <div className={styles.container}>
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  )
}
