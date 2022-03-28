import Layout from "../components/layout";
import commonStyles from "./styles/common.module.css"
import { useRouter } from 'next/router'
import axios from "axios";
import useSWR from "swr";

export default function Load() {
  const router = useRouter()
  const { swap_code } = router.query

  if (swap_code === undefined) {
    return (
      <>
        <Layout>
          <div className={commonStyles.common_main}>
            input Search code
          </div>
        </Layout>
      </>
    )
  }


  const address = `http://www.pirea.kro.kr/api/v0.1/swap/get`;
  const fetcher = async (url) => await axios.get(url, {
    params: {
      swapcode: swap_code
    }
  }).then((res) => res.data);

  const { data, error } = useSWR(address, fetcher);




  if (error) {
    return (
      <>
        <Layout>
          <div className={commonStyles.common_main}>
            failed
          </div>
        </Layout>
      </>
    )
  }

  if (!data) {
    return (
      <>
        <Layout>
          <div className={commonStyles.common_main}>
            Loading
          </div>
        </Layout>
      </>
    )
  }

  return (
    <>
      <Layout>
        <div className={commonStyles.common_main}>
          {data['id']}
        </div>
      </Layout>
    </>
  )
}

