import Link from "next/link";
import Head from "next/head";
import reactDom from "react-dom";
import { motion, useMotionValue, useViewportScroll } from "framer-motion";
import mainStyles from "./styles/main.module.css";
import { Color } from "three";

import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  ZoomIn,
} from "react-scroll-motion";

const BuyLand = batch(StickyIn(20, 20), FadeIn(), MoveIn(-2000, 0));
const BuyLand2 = batch(StickyIn(80, 50), FadeIn(), MoveIn(2000, 0));
const Swap = batch(Sticky(50, 20), FadeIn(), MoveIn(0, 1000), MoveOut(0, -500));
const Team = batch(Fade(), Sticky(50, 20), ZoomIn(2, 1));

export default function Home() {
  return (
    <>
      <Head>
        <title>Pirea</title>
      </Head>

      <div className={mainStyles.main_go_mainpage}>
        <motion.div
          whileHover={{
            scale: 1.2,
            transition: {
              duration: 0.2,
            },
          }}
        >
          <Link href="/">Home</Link>
        </motion.div>
      </div>

      <div className={mainStyles.main_go_map}>
        <motion.div
          whileHover={{
            scale: 1.2,
            transition: {
              duration: 0.2,
            },
          }}
        >
          <Link href="/dashboard">map</Link>
        </motion.div>
      </div>

      {/* //? 여기다하면되겠다 */}
      <div className={mainStyles.main_bg}>
        <ScrollContainer>
          <div className={mainStyles.global_main}>
            <ScrollPage page={0}>
              <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -500))}>
                <div className={mainStyles.global_main_support}>
                  {/* <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      scale: 0.8,
                      opacity: 0,
                    },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        delay: 0.6,
                      },
                    },
                  }}
                >
                  <img
                    src="https://img.freepik.com/free-vector/isometric-city-industrial-area-illustration_1284-9947.jpg?size=626&ext=jpg&uid=R21621456&ga=GA1.2.349551803.1641537500"
                    className={mainStyles.main_landImg}
                  ></img>
                </motion.div> */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    style={{ height: "100%" }}
                    variants={{
                      hidden: {
                        scale: 1,
                        opacity: 0,
                      },
                      visible: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                          delay: 0.6,
                        },
                      },
                    }}
                  >
                    <div className={mainStyles.main_title_section0}>
                      WELCOME TO PIREA
                    </div>
                  </motion.div>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {
                        scale: 1,
                        opacity: 0,
                      },
                      visible: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                          delay: 1,
                        },
                      },
                    }}
                  >
                    <div className={mainStyles.main_title_section0_sub}>
                      pirea sells land in Korea in pixels. You can buy, resell,
                      and exchange the area you want.
                    </div>
                  </motion.div>
                </div>
              </Animator>
            </ScrollPage>
          </div>

          <ScrollPage page={1}>
            <div className={mainStyles.main_section1}>
              <Animator animation={BuyLand}>
                <div className={mainStyles.main_buyland}>BUY LAND</div>
                <div className={mainStyles.main_buyland_sub}>
                  create your own land🏛
                </div>
              </Animator>
              <Animator animation={BuyLand2}>
                <img
                  src="https://img.freepik.com/free-vector/earth-exploration-isometric-composition-with-prospecting-work-terrain-with-pond-rock-formations_1284-28097.jpg?t=st=1648242912~exp=1648243512~hmac=8be5cb5db4d49cc675f786559b665ffb87460862b27ed454f40134e6d61a410f&w=1380"
                  className={mainStyles.main_landImg}
                ></img>
              </Animator>
            </div>
          </ScrollPage>

          <ScrollPage page={2}>
            <Animator animation={Swap}>
              <div className={mainStyles.main_buyland}>Swap</div>
            </Animator>
          </ScrollPage>

          <ScrollPage page={3}>
            <div className={mainStyles.main_section3}>
              <Animator animation={Team}>
                <div className={mainStyles.main_buyland}> TEAM</div>
              </Animator>
              <div className={mainStyles.avatar}>avatar</div>
              <div className={mainStyles.avatar}>avatar</div>
              <div className={mainStyles.avatar}>avatar</div>
              <div className={mainStyles.avatar}>avatar</div>
            </div>
          </ScrollPage>
        </ScrollContainer>
      </div>
    </>
  );
}
