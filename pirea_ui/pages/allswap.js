import Layout from "../components/layout";
import axios from "axios";
import useSWR from "swr";
import { useState, useEffect } from "react";
import allswapStyles from "./styles/allswap.module.css"
import AllSwapCart from "../components/all_swap_cart"
import AllSwapCard from "../components/all_swap.card"
import { NftSwap } from '@traderxyz/nft-swap-sdk';
import { Icon } from '@iconify/react';
import { useRouter } from "next/router"
import { useWeb3React } from "@web3-react/core";
import config from "./lib/config.json"
import { injected } from "./lib/connectors";




/*
  0: 'Invalid',
  1: 'InvalidMakerAssetAmount',
  2: 'InvalidTakerAssetAmount',
  3: 'Fillable',
  4: 'Expired',
  5: 'FullyFilled',
  6: 'Cancelled',
*/


export default function AllSwap() {


  const [moreMake, setMoreMake] = useState(false);
  const [moreTake, setMoreTake] = useState(false);
  const { library, chainId, activate, active, deactivate } = useWeb3React();
  const router = useRouter();
  const baseApi = config["API"]["SERVER_BASE"];

  const apiEndPoint = baseApi  + "/swap/get/all";
  const fetcher = async (url) =>
    await axios
      .get(url, {
        params: {
          more: "1",
        },
      })
      .then((res) => res.data);
  const { data, error } = useSWR(apiEndPoint, fetcher, { refreshInterval: 15000 });
  // console.log(`data`, typeof data);

  if (error) {
    return (
      <>
        <Layout>
          <div>failed</div>
        </Layout>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Layout>
          <div>Loading</div>
        </Layout>
      </>
    );
  }

  // More Button
  if (moreMake) {
    return (
      <Alert onClose={() => setMoreMake(false)} dismissible>
        <Alert.Heading>More Make Token Information!</Alert.Heading>

        {data.map((e) => (
          <p>{e.swapcode}</p>
        ))}
        <div className="d-flex justify-content-end">
          <Button onClick={() => setMoreMake(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert>
    );
  }

  if (moreTake) {
    return (
      <Alert onClose={() => setMoreTake(false)} dismissible>
        <Alert.Heading>More Take Token Information!</Alert.Heading>

        {data.map((e) => (
          <p>{e.swapcode}</p>
        ))}
        <div className="d-flex justify-content-end">
          <Button onClick={() => setMoreTake(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert>
    );
  }



  const load_swap = (e) => {
    console.log("Data", e);
    router.push(`/load?swap_code=${e}`)
  }
  activate(injected, (error) => {
    if (isNoEthereumObject(error))
      window.open("https://metamask.io/download.html");
  });






  return (
    <>
      <Layout>
        <div className={allswapStyles.all_swap_main}>
          {data.map((e) => (
            <AllSwapCard sign={e.sign} load_swap={load_swap} swap_code={e.swapcode}>
              <div className={allswapStyles.all_swap_cart_left_main}>
                <AllSwapCart header={"token Address"} content={e.wantForm.tokenAddress} />
                <AllSwapCart header={"token id"} content={e.wantForm.tokenId} />
                <AllSwapCart header={"token type"} content={e.wantForm.type} />
              </div>
              <div className={allswapStyles.all_swap_icon_main}>
                <Icon icon="ic:baseline-swap-horizontal-circle" color="#333" height="2.5vw" />
              </div>
              <div className={allswapStyles.all_swap_cart_right_main}>
                <div className={allswapStyles.all_swap_token_address_main}>
                  <AllSwapCart header={"token address"} content={e.haveForm.tokenAddress} />
                  <AllSwapCart header={"token id"} content={e.haveForm.tokenId} />
                  <AllSwapCart header={"token type"} content={e.haveForm.type} />
                  <AllSwapCart header={"maker address"} content={e.sign.makerAddress} />
                </div>
              </div>
            </AllSwapCard>
          ))}
        </div>
      </Layout>
    </>
  );
}
