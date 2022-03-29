import Link from "next/link";
import Head from "next/head";
import reactDom from "react-dom";
import { motion } from "framer-motion";
import mainStyles from "./styles/main.module.css";
import { Color } from "three";
import { Navbar } from "../components/navbar";
import { Icon } from "@iconify/react";

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
const BuyLand2 = batch(StickyIn(0), FadeIn(), MoveIn(2000, 0));
const Swap = batch(Sticky(50, 20), FadeIn(), MoveIn(0, 1000), MoveOut(0, -500));

/* import dynamic from 'next/dynamic';

const Chart = dynamic(()=> import('react-apexcharts'), {
    ssr:false,
}) */

export default function Main() {
  if (typeof window === "undefined") {
    return <></>;
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
          {/* //? section0 */}
          <div className={mainStyles.sky}>
            <div className={mainStyles.global_main}>
              <ScrollPage page={0}>
                <Animator
                  animation={batch(Sticky(30, 50), Fade(), MoveOut(0, -500))}
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
                      <div className={mainStyles.main_title_section0_up}>
                        The Pixel Korea
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
                        Buy a local NFT of pixels or<br></br> exchange your area
                        with someone else!
                      </div>
                      <div className={mainStyles.main_section0_git}>
                        <Icon
                          icon="akar-icons:github-fill"
                          color="#8A8B8C"
                          height="30"
                        />
                        <span className={mainStyles.main_title_section0_sub}>
                          GITHUB
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </Animator>
              </ScrollPage>
            </div>
          </div>
          {/* //? Section1 */}
          <ScrollPage page={1}>
            <div className={mainStyles.main_section1}>
              <Animator
              // animation={batch(
              //   Sticky(),
              //   Fade(),
              //   MoveIn(0, 2000),
              //   MoveOut(-2000, 0)
              // )}
              >
                <div className={mainStyles.main_section1_container}>
                  <motion.div
                    className={mainStyles.main_section1_title}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {
                        scale: 1,
                        opacity: 0,
                      },
                      visible: {
                        scale: 1.3,
                        opacity: 1,
                        transition: {
                          delay: 1,
                        },
                      },
                    }}
                  >
                    Korea reborn as a Pixel.
                  </motion.div>
                  <div className={mainStyles.main_section1_sub}>
                    The Pirea project can purchase each nft pixel on a pixel
                    map.<br></br> NFTs can be exchanged between owners of NFTs
                    (ERC-721), <br></br>and buyers can exchange NFTs through
                    tokens (ERC-20).
                  </div>

                  <div className={mainStyles.main_section1_contents_container}>
                    <div className={mainStyles.main_section1_contents}>
                      <div className={mainStyles.main_section1_subtitle}>
                        1. Information on each pixel <br></br>may be easily
                        checked.
                      </div>
                      <div className={mainStyles.main_section1_des}>
                        You can check the OwnerAddress, coordinate value,
                        <br></br> and detailed description of the pixel on the
                        dashboard. <br></br>In addition, the Pirea NFT (ERC-721)
                        may be minted by <br></br>paying the cost (ERC-20).
                      </div>
                    </div>
                    <div className={mainStyles.main_section1_contents}>
                      <div className={mainStyles.main_img1}></div>
                    </div>
                  </div>
                  <div className={mainStyles.main_section1_contents_container}>
                    <div className={mainStyles.main_section1_contents}>
                      <div className={mainStyles.main_img2}></div>
                    </div>
                    <div className={mainStyles.main_section1_contents}>
                      <div className={mainStyles.main_section1_subtitle}>
                        2. Easy to exchange.
                      </div>
                      <div className={mainStyles.main_section1_des}>
                        Use your own token (ERC-20) or Pirea NFT (ERC-721)
                        <br></br> It can be exchanged for tokens or NFTs from
                        other owners.
                      </div>
                    </div>
                  </div>
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
            <div className={mainStyles.main_section2}>
              <div className={mainStyles.main_rectangle}>
                <Animator
                // animation={batch(
                //   Sticky(),
                //   Fade(),
                //   MoveIn(0, 2000),
                //   MoveOut(-2000, 0)
                // )}
                >
                  <div className={mainStyles.main_section1_container}>
                    <div
                      className={mainStyles.main_section1_contents_container}
                    >
                      <div className={mainStyles.main_section1_contents}>
                        <div className={mainStyles.main_section1_subtitle}>
                          3. Easily understand activities<br></br>and deal with
                          many people.
                        </div>
                        <div className={mainStyles.main_section1_des}>
                          You can check the OwnerAddress, coordinate value,
                          <br></br> It's easy to understand the activity history
                          <br></br> through Analytics, and you can do business
                          <br></br>
                          with many people with All Swap.
                        </div>
                      </div>
                      <div className={mainStyles.main_section1_contents}>
                        <div className={mainStyles.main_img3}></div>
                      </div>
                    </div>

                    <div
                      className={mainStyles.main_section1_contents_container}
                    >
                      <div className={mainStyles.main_section1_contents}>
                        <div className={mainStyles.main_section1_subtitle}>
                          <div className={mainStyles.goal_title}>
                            More Contents
                          </div>
                        </div>
                        <div className={mainStyles.main_section1_des}>
                          The goal and direction of the Pirea project.
                        </div>
                      </div>
                      <div className={mainStyles.main_section1_contents}></div>
                    </div>
                    <div className={mainStyles.main_feat_container}>
                      <div className={mainStyles.main_feat}>
                        <div className={mainStyles.more1_img}>
                          <div className={mainStyles.more_txt}>
                            Minting on our own<br></br> in Pirea
                          </div>
                        </div>
                      </div>
                      <motion.div
                        className={mainStyles.main_feat}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className={mainStyles.more2_img}>
                          <div className={mainStyles.more_txt}>
                            Interchangeable <br></br>between owners
                          </div>
                        </div>
                      </motion.div>
                      <motion.div
                        className={mainStyles.main_feat}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className={mainStyles.more3_img}>
                          <div className={mainStyles.more_txt}>
                            Expansion of <br></br>worldview
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Animator>
              </div>
            </div>
          </ScrollPage>

          <ScrollPage page={3}>
            <div className={mainStyles.main_section3}>
              <Animator animation={Swap}>
                <div className={mainStyles.member_title}> TEAM MEMBERS</div>
              </Animator>
              <div className={mainStyles.member_container}>
                <li className={mainStyles.avatar1}></li>
                <div className={mainStyles.member_name}>지웅</div>
                <div className={mainStyles.member_role}>PM / Full Stack</div>
              </div>
              <div className={mainStyles.member_container}>
                <li className={mainStyles.avatar2}></li>
                <div className={mainStyles.member_name}>미진</div>
                <div className={mainStyles.member_role}>Front End</div>
              </div>
              <div className={mainStyles.member_container}>
                <li className={mainStyles.avatar3}></li>
                <div className={mainStyles.member_name}>재열</div>
                <div className={mainStyles.member_role}>Front End</div>
              </div>
              <div className={mainStyles.member_container}>
                <li className={mainStyles.avatar4}></li>
                <div className={mainStyles.member_name}>규환</div>
                <div className={mainStyles.member_role}>Full Stack</div>
              </div>
            </div>
          </ScrollPage>
        </ScrollContainer>
      </div>
    </>
  );
}
