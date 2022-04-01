import Link from "next/link";
import navStyles from "./styles-component/navbar.module.css";
import Logo from "../assets/Logo_img.svg";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export const Navbar = () => {
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: -70,
        }}
        animate={{
          duration: 1,
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          ease: [0.6, 0.05, -0.01, 0.9],
        }}
      >
        <div className={navStyles.nav_position}>
          <Link href="/">
            <div className={navStyles.nav_logo_text}>
              <div className={navStyles.nav_logo}></div>
              <span className={navStyles.nav_title}>Pirea</span>
            </div>
          </Link>
          <div className={navStyles.nav_link_box}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              whileHover={{
                scale: 1.1,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              <Link href="/">
                <a className={navStyles.nav_link}>Home</a>
              </Link>
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.9 }}
              whileHover={{
                color: "pink",
                scale: 1.1,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              <Link href="/dashboard">
                <a className={navStyles.nav_link}>
                  <Icon height="2rem" icon="ic:outline-space-dashboard"></Icon>
                </a>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
