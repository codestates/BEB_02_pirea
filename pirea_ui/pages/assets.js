import Layout from "../components/layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import commonStyles from "./styles/common.module.css";
import assetsStyles from "./styles/assets.module.css";
import Image from "next/image";
import profile from "../assets/test_item.png";
import { Icon } from "@iconify/react";
import Map from "../components/map";
import axios from "axios";
import { useEffect, useState } from "react";
import Web3 from "web3";
import abi from "./lib/abi";
import config from "./lib/config.json";
import LoadMap from "../components/load_map.js";
import classNames from "classnames";
import "tailwindcss/tailwind.css";

export default function Assets() {
  if (typeof window == "undefined") {
    return <> loading </>;
  }

  const [account, setAccount] = useState(
    window.localStorage.getItem("account")
  );
  const [web3, setWeb3] = useState();
  const [tokenContract, setTokenContract] = useState();
  const [data, setData] = useState();
  const [metadataJson, setMetadataJson] = useState();
  const [tokenId, setTokenId] = useState();
  const [selectedOwner, setSelectedOwner] = useState();

  const [axis, setAxis] = useState({});

  const handleCreate = async (data) => {
    if (data["x"] !== axis["x"] || data["y"] !== axis["y"]) {
      setAxis(data);
      const id = toast.loading("find ....");

      const tokenIdtmp = await tokenContract.methods
        .getTokenId(data["x"], data["y"])
        .call();

      if (tokenIdtmp == 0) {
        toast.update(id, {
          render: `no owner `,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }
      const ownerAddr = await tokenContract.methods.ownerOf(tokenIdtmp).call();
      setSelectedOwner(ownerAddr);

      const tokenURI = await tokenContract.methods.tokenURI(tokenIdtmp).call();

      const res = await axios.get(tokenURI);
      const metaTmp = res.data;

      setTokenId(tokenIdtmp);
      setMetadataJson(metaTmp);
      toast.update(id, {
        render: `find `,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined" && account !== "") {
      try {
        console.log("before", config["WEB3"]["CONTRACT_ADDRESS"]);
        const web = new Web3(window.ethereum);
        setWeb3(web);
        const tokenContract = new web.eth.Contract(
          abi,
          config["WEB3"]["CONTRACT_ADDRESS"]
        );
        setTokenContract(tokenContract);

        const getData = async () => {
          const axisArray = await tokenContract.methods
            .getTokenAllByAddress(window.localStorage.getItem("account"))
            .call();
          /* console.log("array", axisArray.some(function(el) {
            return el.x == '5' && el.y == '10';
          })); */
          setData(axisArray);
        };
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
              <LoadMap
                axisArray={data}
                onChange={handleCreate}
                className={commonStyles.common_map_canvas}
              />
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
            <div
              className={classNames({
                [commonStyles.common_description_main]: true,
                ["dark:text-[#9ca3af]"]: true,
              })}
            >
              <div className={commonStyles.common_description_content_header}>
                Description
              </div>
              <div className={commonStyles.common_description_content_text}>
                {metadataJson ? metadataJson.description : null}
              </div>
            </div>
          </div>
          {/*right*/}
          <div className={assetsStyles.assets_right_main}>
            <div>
              <div
                className={classNames({
                  [commonStyles.common_profile_header]: true,
                  ["dark:text-[#f3f4f6]"]: true,
                })}
              >
                Map Analytics
              </div>
              <div className={commonStyles.common_profile_img_main}>
                <div className={commonStyles.common_profile_img}>
                  {metadataJson ? (
                    <Image
                      src={metadataJson.image}
                      alt="text"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <Image src={profile} alt="test" />
                  )}
                </div>
              </div>
              <div className={commonStyles.common_profile_address_main}>
                <div
                  className={classNames({
                    [commonStyles.common_profile_address_header]: true,
                    ["dark:text-[#9ca3af]"]: true,
                  })}
                >
                  Owner address :
                </div>
                <div className={commonStyles.common_profile_address_text}>
                  {window.localStorage.getItem("account")}
                </div>
              </div>

              <div class="dark:text-[#9ca3af]">
                selectedOwner: {selectedOwner ? selectedOwner : null}
              </div>
              <div class="dark:text-[#9ca3af]">
                selectedTokenId: {tokenId ? tokenId : null}
              </div>
              <div>
                <div class="dark:text-[#9ca3af]">
                  x: {axis["x"] ? axis["x"] : null}
                </div>
                <div class="dark:text-[#9ca3af]">
                  y: {axis["y"] ? axis["y"] : null}
                </div>
              </div>
              <div></div>
            </div>
            <div
              className={classNames({
                [commonStyles.common_offers_main]: true,
                ["dark:text-[#9ca3af]"]: true,
              })}
            >
              <div
                className={classNames({
                  [commonStyles.common_offers_header]: true,
                  ["dark:text-[#9ca3af]"]: true,
                })}
              >
                Offer
              </div>
            </div>

            <div className={commonStyles.common_offers_main}>
              <div
                className={classNames({
                  [commonStyles.common_offers_header]: true,
                  ["dark:text-[#9ca3af]"]: true,
                })}
              >
                Asset
              </div>

              <div className={assetsStyles.assets_content_header_main}>
                <div classname={assetsStyles.assets_content_header_id}>id</div>
                <div classname={assetsStyles.assets_content_header_type_x}>
                  x
                </div>
                <div classname={assetsStyles.assets_content_header_type_y}>
                  y
                </div>
              </div>

              {data
                ? data.map((e) =>
                    e.id != 0 ? (
                      <div className={assetsStyles.assets_content_main}>
                        <div>{e.id}</div>
                        <div>{e.x}</div>
                        <div>{e.y}</div>
                      </div>
                    ) : null
                  )
                : "test"}
            </div>
            {/* <div className={commonStyles.common_price_history_main}>
              <div className={commonStyles.common_price_history_header}>
                Price History
              </div>
            </div> */}
            <div></div>
          </div>
        </div>
      </Layout>
    </>
  );
}
