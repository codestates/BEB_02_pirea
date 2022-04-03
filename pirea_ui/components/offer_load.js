import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import injected from "../pages/lib/connectors";
import dashStyles from "../pages/styles/dashboard.module.css";
import classNames from "classnames";
import "tailwindcss/tailwind.css";
import { motion } from "framer-motion";

export default function OfferList({ tokenId, swapcode, type, sign, sdk }) {
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
    };
    get();
  }, [tokenId, swapcode, sdk]);

  const load_swap = (e) => {
    console.log("Data", e);
    router.push(`/load?swap_code=${e}`);
  };
  // console.log("test Ofer", transacof)
  return (
    <>
      {status == 3 ? (
        <div className={dashStyles.dashboard_offers_content_type}>
          <div className={dashStyles.dashboard_offers_content_div}>
            {tokenId}
          </div>
          <div className={dashStyles.dashboard_offers_content_div}>{type}</div>
          <div className={dashStyles.dashboard_offers_content_div}>
            <motion.div
              onClick={() => load_swap(swapcode)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ backgroundColor: "#2393b0" }}
              className={classNames({
                [dashStyles.dashboard_offers_content_div_button]: true,
              })}
            >
              go
            </motion.div>
          </div>
        </div>
      ) : null}
    </>
  );
}
