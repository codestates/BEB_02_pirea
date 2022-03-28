import Layout from "../components/layout";
import LoadSwapHave from "../components/loadSwapHave"
import LoadSwapWant from "../components/loadSwapWant"
import commonStyles from "./styles/common.module.css"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from "axios";

export default function Load() {

  const url = 'http://www.pirea.kro.kr/api/v0.1/swap/get';
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { swap_code } = router.query;


  useEffect(() => {
    const getData = async () => {
      try {
        await axios.get(url, {
          params: {
            swapcode: swap_code
          }
        }).then((res) => {
          setData(res.data)
          setLoading(false)
        });
      } catch (e) {
        console.log(e);
      }
    }
    if (swap_code !== null) {
      getData();
    }
  }, [swap_code])

  console.log(data);
  if (!swap_code) {
    return (
      <>
        <Layout>
          <div className={commonStyles.common_main}>
            input swap code
          </div>
        </Layout>
      </>
    )
  }

  if (!data) return (
    <>
      <Layout>
        <div className={commonStyles.common_main}>
          loading
        </div>
      </Layout>
    </>
  )

  return (
    <>
      <Layout>
        <div className={commonStyles.common_main}>
          <div>
            <LoadSwapWant wantForm={data['wantForm']} />
          </div>
          <div>
            <LoadSwapHave haveForm={data['haveForm']} />
          </div>
        </div>
      </Layout>
    </>
  )
}

