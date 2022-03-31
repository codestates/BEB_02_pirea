import Layout from "../components/layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import commonStyles from "./styles/common.module.css";
import Image from "next/image";
import profile from "../assets/test_item.png";
import { Icon } from "@iconify/react";
import Map from "../components/map";
import { useEffect, useState } from "react"
import Web3 from "web3"
import abi from "./lib/abi"
import config from "./lib/config.json"

export default function Assets() {
  if (typeof window == "undefined") {
    return <> loading </>;
  }

  const [account, setAccount] = useState(window.localStorage.getItem("account"));
  const [web3, setWeb3] = useState();
  const [tokenContract, setTokenContract] = useState();
  const [data, setData] = useState();


  useEffect(() => {
    if (typeof window.ethereum !== "undefined" && account !== '') {
      try {
        console.log("before", config["WEB3"]["CONTRACT_ADDRESS"])
        const web = new Web3(window.ethereum);
        setWeb3(web);
        const tokenContract = new web.eth.Contract(
          abi,
          config["WEB3"]["CONTRACT_ADDRESS"]
        )
        setTokenContract(tokenContract);

        const getData = async () => {
          const axisArray = await tokenContract.methods.getTokenAllByAddress(window.localStorage.getItem("account")).call();
          console.log("array", axisArray);
        }
        getData();
      } catch (e) {
        console.log(e);
      }
    }
  }, [account]);


  return (
    <>
      {/* //? dashboard와 겹치는 스타일 컴포넌트화 하는게 좋을까? */}
      <Layout>
        <div className={commonStyles.common_main}>
          {/*left*/}
          <div className={commonStyles.common_left_main}>
            <div className={commonStyles.common_map}>
              <Map className={commonStyles.common_map_canvas} />
            </div>
            <div className={commonStyles.common_search_main}>
              <input
                placeholder="Search Owner Address"
                className={commonStyles.common_search_input}
                type="text"
              />
              <Icon
                icon="ant-design:search-outlined"
                color="#087592"
                height="15"
                hFlip={true}
              />
            </div>
            <div className={commonStyles.common_description_main}>
              <div className={commonStyles.common_description_content_header}>
                Description
              </div>
            </div>
          </div>
          {/*right*/}
          <div>
            <div>
              <div className={commonStyles.common_profile_header}>
                Map Analytics
              </div>
              <div className={commonStyles.common_profile_img_main}>
                <div className={commonStyles.common_profile_img}>
                  <Image src={profile} alt="test" />
                </div>
              </div>
              <div className={commonStyles.common_profile_address_main}>
                <div className={commonStyles.common_profile_address_header}>
                  Owner address:
                </div>
                <div className={commonStyles.common_profile_address_text}>
                  0x8772901ea06D450C18A92a53927Ba63EFcC97Dbe
                </div>
              </div>
              <div></div>
            </div>
            <div className={commonStyles.common_offers_main}>
              <div className={commonStyles.common_offers_header}>Offer</div>
            </div>
            {/* <div className={commonStyles.common_price_history_main}>
              <div className={commonStyles.common_price_history_header}>
                Price History
              </div>
            </div> */}
          </div>
        </div>
      </Layout>
    </>
  );
}
