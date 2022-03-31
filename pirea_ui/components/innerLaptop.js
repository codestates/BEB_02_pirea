import { motion } from "framer-motion";
import innerStyles from "./styles-component/innerLaptop.module.css";
import Link from "next/link";

export default function InnerLaptop() {
  return (
    <>
      <div className={innerStyles.inner_container}>
        <motion.div
          className={innerStyles.inner_img}
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            scale: 1.1,
            transition: { duration: 1 },
          }}
        ></motion.div>
        <motion.div
          className={innerStyles.inner_title}
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            scale: 1.1,
            transition: { duration: 1, delay: 0.3 },
          }}
        >
          WELCOME TO PIREA
        </motion.div>
        <motion.div
          className={innerStyles.inner_sub}
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            scale: 1.1,
            transition: { duration: 1, delay: 0.6 },
          }}
        >
          Get your NFTland in PIREA
        </motion.div>
        <motion.div
          className={innerStyles.inner_btn}
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            scale: 1.1,
            transition: { duration: 1, delay: 0.6 },
          }}
        >
          More
        </motion.div>
      </div>
    </>
  );
}
