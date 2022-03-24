import mainStyles from "./styles/main.module.css";
import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import Layout from "../components/layout";

export default function Home() {
  return (
    <>
      <main className={mainStyles.main_layout}>
        <div className={mainStyles.main_title}>
          <motion.div
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
            <div>mainpage1</div>
          </motion.div>
        </div>
      </main>
      <div className={mainStyles.main_go_mainpage}>
        <motion.div
          whileHover={{
            scale: 1.2,
            transition: {
              duration: 0.2,
            },
            color: "white",
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
    </>
  );
}
