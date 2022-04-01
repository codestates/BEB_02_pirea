import { useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core";
import allswapStyles from "../pages/styles/allswap.module.css"
import injected from "../pages/lib/connectors"
import statusJson from "../pages/lib/order_status.json"

import { NftSwap } from '@traderxyz/nft-swap-sdk';


/*
  0: 'Invalid',
  1: 'InvalidMakerAssetAmount',
  2: 'InvalidTakerAssetAmount',
  3: 'Fillable',
  4: 'Expired',
  5: 'FullyFilled',
  6: 'Cancelled',
*/
export default function AllSwapCard({ children, sign, load_swap, swap_code }) {

  const { library, chainId, activate, active, deactivate } = useWeb3React();
  const [sdk, setSwapSdk] = useState();
  const [status, setStatus] = useState("");


  useEffect(() => {
    console.log("hello");
    activate(injected, (error) => {
      console.log(error);
    });
    if (active) {

      const sdk = new NftSwap(library, library.getSigner(), chainId);
      setSwapSdk(sdk);

      const get = async () => {

        const statusTmp = await sdk.getOrderStatus(sign);
        console.log(statusTmp);
        setStatus(statusTmp);
      }
      get();
    }
  }, [library, chainId])
  return (
    <>
      {status == 3 ? (
        < div className={allswapStyles.all_swap_card_main_start} onClick={() => load_swap(swap_code)
        }>
          <div className={allswapStyles.all_swap_card_header}>
            {statusJson[status]}
          </div>
          <div className={allswapStyles.all_swap_cart_main_end} >

            {children}
          </div>
        </div >

      )
        : (
          < div className={allswapStyles.all_swap_card_main_end} onClick={() => load_swap(swap_code)
          }>
            <div className={allswapStyles.all_swap_card_header}>
              {statusJson[status]}
            </div>
            <div className={allswapStyles.all_swap_cart_main_end} >

              {children}
            </div>
          </div >
        )
      }
    </>
  )
}
