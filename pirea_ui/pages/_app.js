import "../styles/global.css";
import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";

import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import 'bootstrap/dist/css/bootstrap.min.css'; // react-bootstrap

function getLibrary(provider) {
  const library = new Web3Provider(provider, "any");
  return library;
}

export default function MyApp({ Component, pageProps, router }) {
   if (typeof window === 'undefined') return (<>loading </>);
  return (
    <>
      <motion.div
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        style={{ height: "100%" }}
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
        }}
      >
        <Web3ReactProvider getLibrary={getLibrary}>
          <ThemeProvider enableSystem={true} attribute="class">
            <Component {...pageProps} />
          </ThemeProvider>
        </Web3ReactProvider>
      </motion.div>
    </>
  );
}
/*
export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
*/
// export default MyApp;
