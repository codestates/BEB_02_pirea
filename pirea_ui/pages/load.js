import Layout from "../components/layout";
import LoadType from "../components/loadType";
import commonStyles from "./styles/common.module.css"
import loadStyles from "../components/styles-component/load.module.css"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useWeb3React } from "@web3-react/core";
import { injected } from "./lib/connectors";
import { NftSwap } from '@traderxyz/nft-swap-sdk';

import axios from "axios";

export default function Load() {

  const url = 'http://www.pirea.kro.kr/api/v0.1/swap/get';
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { swap_code } = router.query;
  const { library, chainId, activate, active, deactivate } = useWeb3React();
  const [swapSdk, setSwapSdk] = useState(null);


  useEffect(() => {

    if (active) {

      const sdk = new NftSwap(library, library.getSigner(), chainId);
      setSwapSdk(sdk);
      console.log(sdk);
    }

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

  }, [swap_code, library, chainId]);

  if (!swap_code) {
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

  if (!data) return (
    <>
      <Layout>
        <div className={commonStyles.common_main}>
          loading
        </div>
      </Layout>
    </>
  )
  console.log(data);


  const approve = async () => {
    activate(injected, (error) => {
      if (isNoEthereumObject(error))
        window.open("https://metamask.io/download.html");
    });
    if (active) {

      const sdk = new NftSwap(library, library.getSigner(), chainId);
      setSwapSdk(sdk);
      console.log(sdk);
    }

    await swapSdk.approveTokenOrNftByAsset(data['wantForm'], window.localStorage.getItem("account"))

  }

  const accept = async () => {

    const id = toast.loading("accept ....");
    try {
      const fillTx = await swapSdk.fillSignedOrder(data['sign']);
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
        render: "can't mint",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }

  return (
    <>
      <Layout>
        <div className={loadStyles.load_main}>
          <div className={loadStyles.load_left_main} >
            <LoadType form={data['wantForm']} tokenUrl={data['want_token_url']} approve={approve} />
            {/*<div className={loadStyles.load_left_button_main}>
              <div onClick={approve} className={loadStyles.load_left_approve_btn_main}>
                approve
              </div>
              <div onClick={accept} className={loadStyles.load_left_accept_btn_main}>
                accept swap
              </div>
            </div>*/}
          </div>
          <div className={loadStyles.load_right_main}>
            <LoadType form={data['haveForm']} tokenUrl={data['have_token_url']} />
          </div>
        </div>
      </Layout>
    </>
  )
}

