import "../styles/global.css";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  const notify = () => toast("Wow so easy!");

  return (
    <>
      {/*//? 색상 테마 감지, 현재 테마 저장 */}
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
