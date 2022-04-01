import loadStyles from "./styles-component/load.module.css"
import { useEffect, useState } from "react"
import { useWeb3React } from "@web3-react/core";
import { injected } from "../pages/lib/connectors";
import { NftSwap } from '@traderxyz/nft-swap-sdk';
import statusOrderJson from "../pages/lib/order_status.json"

export default function LoadType({ sign, form, tokenUrl, approve, typeForm, setStatusOrder }) {
  const { library, chainId, activate, active, deactivate } = useWeb3React();
  const [statusOrder, setStatusOrderType] = useState();


  useEffect(() => {
    activate(injected, (error) => {
      console.log(error);
    });


    const getOrderStatus = async () => {
      if (active && sign) {
        const sdk = new NftSwap(library, library.getSigner(), chainId);
        const statusTmp = await sdk.getOrderStatus(sign);
        console.log("import", statusTmp);
        setStatusOrder(statusTmp);
        setStatusOrderType(statusTmp);
      }
    }
    getOrderStatus();
  }, [library, chainId]);

  if (form['type'] === "ERC721") {
    return (
      <>
        <div className={`${statusOrder == 3 ? loadStyles.load_type_form_main_start : loadStyles.load_type_form_main_end}`}>
          <div className={loadStyles.load_type_main}>
            <div className={loadStyles.load_type_header}>
              swapping token metadata url
            </div>
            <div className={loadStyles.load_type_content}>
              {tokenUrl}
            </div>
          </div>
          <div className={loadStyles.load_type_main}>
            <div className={loadStyles.load_type_header}>
              contract address
            </div>
            <div className={loadStyles.load_type_content}>
              {form['tokenAddress']}
            </div>
          </div>
          <div className={loadStyles.load_type_main}>
            <div className={loadStyles.load_type_header}>
              tokenId
            </div>
            <div className={loadStyles.load_type_content}>
              {form['tokenId']}
            </div>
          </div>
          <div className={loadStyles.load_type_main}>
            <div className={loadStyles.load_type_header}>
              type
            </div>
            <div className={loadStyles.load_type_content}>
              {form['type']}
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
          <div>
            <div className={loadStyles.load_type_header}>
              contract address
            </div>
            <div>
              {form['tokenAddress']}
            </div>
          </div>
          <div>
            <div className={loadStyles.load_type_header}>
              amount
            </div>
            <div>
              {form['amount']}
            </div>
          </div>
          <div>
            <div className={loadStyles.load_type_header}>
              type
            </div>
            <div>
              {form['type']}
            </div>
          </div>
        </div>
      </>
    )
  }
}
