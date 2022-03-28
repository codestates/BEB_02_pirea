import Link from "next/link";
import Head from "next/head";
import reactDom from "react-dom";
import { motion, useMotionValue, useViewportScroll } from "framer-motion";
import mainStyles from "./styles/main.module.css";
import { Color } from "three";
import { Navbar } from "../components/navbar";

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

/* import dynamic from 'next/dynamic';

const Chart = dynamic(()=> import('react-apexcharts'), {
    ssr:false,
}) */

export default function Main() {
  if (typeof window === 'undefined') {
    return (
      <>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Pirea</title>
      </Head>

      {/* <div className={mainStyles.main_go_mainpage}>
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
      </div> */}

      {/* //? 여기다하면되겠다 */}
      <div className={mainStyles.main_bg}>
        <Navbar />

        <ScrollContainer>
          <div className={mainStyles.sky}>
            <div className={mainStyles.global_main}>
              <ScrollPage page={0}>
                <Animator
                  animation={batch(Sticky(30, 40), Fade(), MoveOut(0, -500))}
                >
                  <div className={mainStyles.global_main_support}>
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
                        <div>Welcome to</div>
                      </div>
                    </motion.div>
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
                        Pirea - World
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
                        <div>Another Republic of Korea.</div>
                      </div>
                    </motion.div>
                  </div>
                </Animator>
              </ScrollPage>
            </div>
          </div>
          <ScrollPage page={1}>
            <div className={mainStyles.main_section1}>
              <Animator animation={BuyLand}>
                <div className={mainStyles.main_buyland}>With Pirea</div>
                <div className={mainStyles.main_section2_container}>
                  <div className={mainStyles.main_section1_card}>1. Swap</div>
                </div>
              </Animator>
              {/* <Animator animation={BuyLand2}>
                
              </Animator> */}
            </div>
          </ScrollPage>

          {/* <ScrollPage page={2}>
            <Animator animation={Swap}>
              <div className={mainStyles.main_buyland}>Swap</div>
            </Animator>
          </ScrollPage> */}

          <ScrollPage page={2}>
            <div className={mainStyles.main_section3}>
              <Animator animation={Swap}>
                <div className={mainStyles.main_buyland}> TEAM</div>
              </Animator>

              <li className={mainStyles.avatar}></li>
              <li className={mainStyles.avatar}></li>
              <li className={mainStyles.avatar}></li>
              <li className={mainStyles.avatar}></li>
            </div>
          </ScrollPage>
        </ScrollContainer>
      </div>
    </>
  );
}
