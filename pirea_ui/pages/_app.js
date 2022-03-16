import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  const notify = () => toast("Wow so easy!");

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
