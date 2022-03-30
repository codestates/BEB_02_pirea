import Layout from '../components/layout';
import styles from "./styles/analytics.module.css";

export default function Analytics() {

  return (
    <>
      <Layout>
        <div className={styles.container}>
          
          <div className={styles.top__container}>
            <div className={styles.topbox}>box</div>
            <div className={styles.topbox}>box1</div>
            <div className={styles.topbox}>box2</div>
          </div>

          <div className={styles.middle__container}>
           
            <div className={styles.middlebox}>box3</div>
            <div className={styles.middlebox1}>box4</div>
          </div>

          <div className={styles.bottom__container}>
            <div className={styles.bottombox}>
            box5
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
