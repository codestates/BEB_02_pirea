import Layout from "../components/layout";
import loadSwapHave from "../components/loadSwapHave"
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

    axios.get(url, {
      params: {
        swapcode: swap_code
      }
    }).then((res) => {
      setData(res.data)
      setLoading(false)
    });
  }, [])


  if (loading || !data) return <div> Loading.. </div>
  console.log(data);



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

