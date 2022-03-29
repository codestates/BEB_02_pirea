import Link from "next/link";
import navStyles from "./styles-component/navbar.module.css";
import Logo from "../assets/Logo_img.svg";
import { motion } from "framer-motion";

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
              <Logo className={navStyles.nav_logo} />
              <span className={navStyles.nav_title}>pirea</span>
            </div>
          </Link>
          <div className={navStyles.nav_link_box}>
            {" "}
            <motion.div
              whileHover={{
                scale: 1.2,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              <Link href="/main">
                <a className={navStyles.nav_link}>AboutUs</a>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.2,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              <Link href="/dashboard">
                <a className={navStyles.nav_link}>Dashboard</a>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
