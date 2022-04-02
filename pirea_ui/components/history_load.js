import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import injected from "../pages/lib/connectors";
import dashStyles from "../pages/styles/dashboard.module.css"


export default function HistroyList({ tokenId, swapcode, type, sign, sdk }) {
  const [status, setStatus] = useState("");
  const router = useRouter();
  /* if (!transacof) {
    return (
      <>
      </>
    )
  } */
  useEffect(() => {

    const get = async () => {
      if (sign) {
        const statusTmp = await sdk.getOrderStatus(sign);
        console.log("import", statusTmp);
        setStatus(statusTmp);
      }
    }
    get();
  }, [tokenId, swapcode, sdk]);


  const load_swap = (e) => {
    console.log("Data", e);
    router.push(`/load?swap_code=${e}`)
  }
  // console.log("test Ofer", transacof)
  return (
    <>
      {
        status == 5 ?
          < div className={dashStyles.dashboard_offers_content_type}>
            <div className={dashStyles.dashboard_offers_content_div}>
              {tokenId}
            </div>
            <div className={dashStyles.dashboard_offers_content_div}>
              {type}
            </div>
            <div className={dashStyles.dashboard_offers_content_div}>
              <div onClick={() => load_swap(swapcode)} className={dashStyles.dashboard_offers_content_div_button}>
                go
              </div>
            </div>
          </div>
          : null
      }
    </>
  )

}
