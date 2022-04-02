import Layout from "../components/layout";
import LoadType from "../components/loadType";
import commonStyles from "./styles/common.module.css";

import loadStyles from "../components/styles-component/load.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./lib/connectors";
import { NftSwap } from "@traderxyz/nft-swap-sdk";
import { ToastContainer, toast } from "react-toastify";
import LoadSwapImage from "../components/loadSwapImage";
import Image from "next/image";
import statusOrderJson from "./lib/order_status.json";
import axios from "axios";
import useSWR from "swr";
import { Bars } from "react-loading-icons";
import GridLoader from "react-spinners/GridLoader";
import classNames from "classnames";
import "tailwindcss/tailwind.css";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function Load() {
  const apiEndPoint = "http://www.pirea.kro.kr/api/v0.1/swap/get";
  const router = useRouter();
  const { swap_code } = router.query;
  const [data, setData] = useState();
  const { library, chainId, activate, active, deactivate } = useWeb3React();
  const [swapSdk, setSwapSdk] = useState(null);
  const [statusOrder, setStatusOrder] = useState("");

  const fetcher = async (url) => {
    await axios
      .get(url, {
        params: {
          swapcode: swap_code,
        },
      })
      .then((res) => setData(res.data));
  };

  const { datas, error } = useSWR(apiEndPoint, fetcher);

  console.log(data);
  useEffect(() => {
    if (active) {
      const sdk = new NftSwap(library, library.getSigner(), chainId);
      // const statusTmp = await sdk.getOrderStatus(data.sign);
      setSwapSdk(sdk);
    }
  }, [swap_code, library, chainId]);

  if (!swap_code) {
    return (
      <>
        <Layout>
          <div className={commonStyles.common_main}>input Search code</div>
        </Layout>
      </>
    );
  }

  if (!data)
    return (
      <>
        <Layout>
          <div className={loadStyles.load_loading_main}>
            <div className={loadStyles.load_loading_content_main}>
              <div className={loadStyles.load_loading_main_icon}>
                <GridLoader color={"#087592"} />
              </div>
              <div className={loadStyles.load_loading_main_text}>
                loading...
              </div>
            </div>
          </div>
        </Layout>
      </>
    );

  const approve = async () => {
    activate(injected, (error) => {
      console.log(error);
    });
    const id = toast.loading("approve ....");

    try {
      await swapSdk.approveTokenOrNftByAsset(
        data["wantForm"],
        window.localStorage.getItem("account")
      );

      toast.update(id, {
        render: `approve, success`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (e) {
      toast.update(id, {
        render: "can't approve",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const accept = async () => {
    const id = toast.loading("accept ....");
    try {
      const fillTx = await swapSdk.fillSignedOrder(data["sign"]);
      console.log("fill", fillTx);
      const fillTxReceipt = await swapSdk.awaitTransactionHash(fillTx.hash);
      console.log("tx hash", fillTxReceipt.transactionHash);

      toast.update(id, {
        render: `result \n\n ${fillTxReceipt.transactionHash}`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (e) {
      toast.update(id, {
        render: "can't swap",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Layout>
        <div className={loadStyles.load_main}>
          <div className={loadStyles.load_status_main}>
            {statusOrder ? "Status: " + statusOrderJson[statusOrder] : null}
          </div>
          <div className={loadStyles.card_container}>
            <div
              className={classNames({
                [loadStyles.card_left]: true,
                ["dark:bg-[#0c4a6e]"]: true,
              })}
            >
              <div className={loadStyles.metadata_image_sup_main}>
                <LoadSwapImage url={data["want_token_url"]} />
              </div>
              <div
                className={classNames({
                  [loadStyles.load_left_form_main]: true,
                  // ["dark:bg-[#0c4a6e]"]: true,
                })}
              >
                <LoadType
                  sign={data.sign}
                  typeForm="want"
                  form={data["wantForm"]}
                  tokenUrl={data["want_token_url"]}
                  approve={approve}
                  setStatusOrder={setStatusOrder}
                />
              </div>
            </div>
            <Icon
              icon="fluent:arrow-swap-24-filled"
              color="gray"
              height="4vw"
            />
            <div
              className={classNames({
                [loadStyles.card_right]: true,
                ["dark:bg-[#52525b]"]: true,
              })}
            >
              <div className={loadStyles.metadata_image_sup_main}>
                <LoadSwapImage url={data["have_token_url"]} />
              </div>
              <div className={loadStyles.load_right_main}>
                <LoadType
                  setStatusOrder={setStatusOrder}
                  typeForm="have"
                  sign={data.sign}
                  form={data["haveForm"]}
                  tokenUrl={data["have_token_url"]}
                />
              </div>
            </div>
          </div>

          <div className={loadStyles.load_button_main}>
            <div className={loadStyles.button_container}>
              <motion.div
                onClick={approve}
                className={classNames({
                  [loadStyles.load_left_approve_btn_main]: true,
                })}
                whileTap={{ scale: 0.9 }}
                whileHover={{ backgroundColor: "#27a0be", color: "#fff" }}
              >
                Approve
              </motion.div>
              <motion.div
                onClick={accept}
                className={loadStyles.load_left_accept_btn_main}
                whileTap={{ scale: 0.9 }}
                whileHover={{ backgroundColor: "#27a0be", color: "#fff" }}
              >
                Accept swap
              </motion.div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
