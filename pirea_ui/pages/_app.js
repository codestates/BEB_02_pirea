import "../styles/global.css";
import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  const notify = () => toast("Wow so easy!");

  return (
    <>
      {/*//? 색상 테마 감지, 현재 테마 저장 */}
      <motion.div
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
        }}
      >
        <ThemeProvider enableSystem={true} attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </motion.div>
    </>
  );
}

export default MyApp;
