import Layout from "../components/layout";
import styles from "./styles/analytics.module.css";
import Trend from "react-trend";
import { Icon } from "@iconify/react";

export default function Analytics() {
  const MyComponent = () => <Trend data={[0, 10, 5, 22, 3.6, 11]} />;

  
  const ActivityToken = () => (
    <Trend
      smooth
      autoDraw
      autoDrawDuration={3000}
      autoDrawEasing="ease-out"
      data={[
        21312,321312,3211321,213,21312,23131,2131122
      ]}
      gradient={["white", "#868CFF"]}
      radius={4.8}
      strokeWidth={4.1}
      strokeLinecap={"butt"}
      width={170}
      height={120}
    />
  );

  const NewClients = () => (
    <Trend
      smooth
      autoDraw
      autoDrawDuration={6000}
      autoDrawEasing="ease-out"
      data={[
        1123,421,3213,41,321
      ]}
      gradient={["white", "#868CFF"]}
      radius={4.8}
      strokeWidth={4.1}
      strokeLinecap={"butt"}
      width={170}
      height={120}
    />
  );


  return (
    <>
      <Layout>
        <div className={styles.container}>
          <div className={styles.top__container}>
            <div className={styles.topbox}>
              <div className={styles.topboxcontent1}>
                <Icon icon="akar-icons:coin" color="#26e2b3" height="12vh" />{" "}
              </div>
              <div className={styles.topboxcontent2}>
              Activity Token 
              </div>
              <div className={styles.topboxcontent3}>
              123
              </div>
              <div className={styles.topboxcontent4}>
                {" "}
                <ActivityToken />
              </div>
            </div>

            <div className={styles.topbox}>
              <div className={styles.topboxcontent5}><Icon icon="ion:people-circle-sharp" color="#26e2b3" height="13vh"/></div>
              <div className={styles.topboxcontent6}>New Clients</div>
              <div className={styles.topboxcontent7}>342</div>
              <div className={styles.topboxcontent8}><NewClients/></div>
            </div>
            <div className={styles.topbox}>box2</div>
          </div>

          <div className={styles.middle__container}>
            <div className={styles.middlebox}>box3</div>
            <div className={styles.middlebox1}>box4</div>
          </div>

          <div className={styles.bottom__container}>
            <div className={styles.bottombox}>box5</div>
          </div>
        </div>
      </Layout>
    </>
  );
}
