import Layout from "../components/layout";
import dashStyles from "./styles/dashboard.module.css";
import Image from "next/image";
import profile from "../assets/test_item.png";
import { Icon } from "@iconify/react";
import Map from "../components/map";
import { useState, useCallback, useMemo, useEffect } from "react";
import { create } from "ipfs-http-client";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import abi from "./lib/abi";
import korea from "./lib/korea";
import config from "./lib/config.json";
import Web3 from "web3";
import axios from "axios";
import KoreaMap from "../components/korea_map.js";
import classNames from "classnames";
import "tailwindcss/tailwind.css";
import { motion } from "framer-motion";
import OfferList from "../components/offer_load"
import HistoryLoad from "../components/history_load"
import { useWeb3React } from "@web3-react/core";
import { NftSwap } from "@traderxyz/nft-swap-sdk";
import { injected } from "./lib/connectors";

// TODO: 스마트컨트랙트와 연동
// TODO: map click 동작구현

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#9ca3af",
  borderStyle: "dashed",
  // backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function MyDropzone({ onChange, previewFile, onDrop }) {
  // Do something with the files
  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*", onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="dropContainer">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here</p>
        ) : (
          <p>Drag drop some files here, or click to select files</p>
        )}
        {previewFile ? (
          <img src={previewFile.preview} alt="none" width="200" />
        ) : (
          "none"
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [t, setT] = useState(false);
  const [previewFile, setPreviewFile] = useState();
  const [userFileUrl, setUserFileUrl] = useState(``);
  const [userFileDesc, setUserFileDesc] = useState(``);
  const [axis, setAxis] = useState({});
  const [ownerAddr, setOwnerAddr] = useState({});
  const [tokenId, setTokenId] = useState();
  const [web3, setWeb3] = useState();
  const [tokenURI, setTokenURI] = useState();
  const [metadataJson, setMetadataJson] = useState();
  const [tokenContract, setTokenContract] = useState();
  const smartContractAddr = config["WEB3"]["CONTRACT_ADDRESS"];
  const [transacoh, setTransacoh] = useState();
  const client = create("https://ipfs.infura.io:5001/api/v0");
  const { library, chainId, activate, active, deactivate } = useWeb3React();
  const [swapSdk, setSwapSdk] = useState();
  /*
    console.log(
      "ttt",
      korea.some(function(el) {
        return el.x == 1 && el.y == 2;
      })
    ); */

  async function onChange(e) {
    const file = e.target.files[0];
    setUserFileUrl(file);
  }

  const onDescChange = (e) => {
    console.log(e.target.value);
    setUserFileDesc(e.target.value);
  };

  const onDrop = useCallback((acceptedFiles) => {
    // setUserFileUrl(acceptedFiles[0]);
    setPreviewFile({ preview: URL.createObjectURL(acceptedFiles[0]) });
    setUserFileUrl(URL.createObjectURL(acceptedFiles[0]));
  });

  const handleCreate = async (data) => {
    if (data["x"] !== axis["x"] || data["y"] !== axis["y"]) {
      setAxis(data);
      const id = toast.loading("find ....");

      const tokenIdtmp = await tokenContract.methods
        .getTokenId(data["x"], data["y"])
        .call();
      setTokenId(tokenIdtmp);
      if (tokenIdtmp == 0) {
        setT(false);
        setMetadataJson();
        toast.update(id, {
          render: `no owner `,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        const url = "http://www.pirea.kro.kr/api/v0.1/swap/get/tokenid"
        const res = await axios.get(url, {
          params: {
            tokenid: tokenIdtmp
          }
        });
        setTransacoh(res.data);
        console.log("res", res.data);
        console.log(tokenIdtmp);

        const ownerAddr = await tokenContract.methods
          .ownerOf(tokenIdtmp)
          .call();
        const tokenURItmp = await tokenContract.methods
          .tokenURI(tokenIdtmp)
          .call();
        const response = await axios.get(tokenURItmp);
        const json = await response.data;

        setMetadataJson(json);
        setTokenURI(tokenURItmp);
        setOwnerAddr(ownerAddr);
        setT(true);
        toast.update(id, {
          render: `find `,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  const mintHandleClick = async () => {
    const id = toast.loading("mint ....");
    const file = await axios
      .get(userFileUrl, { responseType: "blob" })
      .then((response) => {
        return response.data;
      });
    const cid = await client.add(file);
    const image_url = `https://ipfs.infura.io/ipfs/${cid.path}`;
    let metadata = {
      name: "pirea",
      image: image_url,
      description: userFileDesc,
      properties: {
        axis_x: axis["x"],
        axis_y: axis["y"],
      },
    };

    let cid2;
    cid2 = await client.add(JSON.stringify(metadata));
    const metadata_url = `https://ipfs.infura.io/ipfs/${cid2.path}`;
    console.log(metadata_url);

    try {
      // 최종적으로 주문서를 만들어 mint를 발생 시킵니다.
      let account = window.localStorage.getItem("account");
      var result = await tokenContract.methods
        .mintNFT(account, metadata_url, axis["x"], axis["y"])
        .send({
          from: account,
          gasLimit: 5000000,
          value: 0,
        });
      console.log(result);
      toast.update(id, {
        render: `result \n\n ${result["transactionHash"]}`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      // 결과값 출력!
    } catch (err) {
      //  에러가 날경우 err 출력
      console.log(err);
      toast.update(id, {
        render: "can't mint",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    activate(injected, (error) => {
      console.log(error);
    });
    console.log(axis);
    const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
    setWeb3(web);
    const tokenContract = new web.eth.Contract(abi, smartContractAddr);
    setTokenContract(tokenContract);

    if (active) {
      const sdk = new NftSwap(library, library.getSigner(), chainId);
      setSwapSdk(sdk);
      console.log(sdk.chainId, "chainge")
    }


  }, [axis, chainId, library]);

  return (
    <>
      <Layout>
        <div className={dashStyles.dashboard_main}>
          {/*left*/}
          <div className={dashStyles.dashboard_left_main}>
            <div className={dashStyles.dashboard_map}>
              <KoreaMap
                axisArray={korea}
                className={dashStyles.dashboard_map_canvas}
                onChange={handleCreate}
              />
            </div>
            <div className={dashStyles.dashboard_search_main}>
              <input
                placeholder="Search Owner Address"
                className={dashStyles.dashboard_search_input}
                type="text"
              />
              <Icon
                icon="ant-design:search-outlined"
                color="#087592"
                height="15"
                hFlip={true}
              />
            </div>
            <div className={dashStyles.dashboard_description_main}>
              <div
                className={classNames({
                  [dashStyles.dashboard_description_content_header]: true,
                  ["dark:text-[#9ca3af]"]: true,
                })}
              >
                Description
              </div>
              <div className={dashStyles.dashboard_description_content_text}>
                {metadataJson ? metadataJson.description : null}
              </div>
            </div>
          </div>
          {/*right*/}
          {t ? (
            <div className={dashStyles.dashboard_right_main}>
              <div>
                <div
                  className={classNames({
                    [dashStyles.dashboard_profile_header]: true,
                    ["dark:text-[#f3f4f6]"]: true,
                  })}
                >
                  Map Analytics
                </div>
                <div className={dashStyles.dashboard_profile_img_main}>
                  <div className={dashStyles.dashboard_profile_img}>
                    <Image
                      src={metadataJson.image}
                      width={50}
                      height={50}
                      alt="test"
                      layout="responsive"
                    />
                  </div>
                </div>
                <div className={dashStyles.dashboard_profile_address_main}>
                  <div
                    className={classNames({
                      [dashStyles.dashboard_profile_address_header]: true,
                      ["dark:text-[#9ca3af]"]: true,
                    })}
                  >
                    Owner address :
                  </div>
                  <div className={dashStyles.dashboard_profile_address_text}>
                    {ownerAddr}
                  </div>
                </div>
                <div className={dashStyles.dashboard_profile_address_main}>
                  <div
                    className={classNames({
                      [dashStyles.dashboard_profile_address_header]: true,
                      ["dark:text-[#9ca3af]"]: true,
                    })}
                  >
                    token id :
                  </div>
                  <div className={dashStyles.dashboard_profile_address_text}>
                    {tokenId}
                  </div>
                </div>
                <div className={dashStyles.dashboard_profile_axis_main}>
                  <div>x: {axis["x"]} </div>
                  <div className={dashStyles.dashboard_profile_axis_y_ex}>
                    y: {axis["y"]}
                  </div>
                </div>
              </div>
              <div className={dashStyles.dashboard_offers_main}>
                <div
                  className={classNames({
                    [dashStyles.dashboard_offers_header]: true,
                    ["dark:text-[#9ca3af]"]: true,
                  })}
                >
                  Offer
                </div>
                <div>
                  <div className={dashStyles.dashboard_offers_content_main_type}>
                    <div className={dashStyles.dashboard_offers_content_div}>
                      id
                    </div>
                    <div className={dashStyles.dashboard_offers_content_div}>
                      type
                    </div>
                    <div className={dashStyles.dashboard_offers_content_div}>
                    </div>
                  </div>
                  {
                    transacoh ? transacoh.map((e) =>
                      e.haveForm.type == "ERC721" ?
                        <OfferList transacof={transacoh} tokenId={e.haveForm.tokenId} type={e.haveForm.type} swapcode={e.swapcode} sign={e.sign} sdk={swapSdk} />
                        : null
                    )
                      : null
                  }
                </div>
              </div>
              <div className={dashStyles.dashboard_price_history_main}>
                <div
                  className={classNames({
                    [dashStyles.dashboard_price_history_header]: true,
                    ["dark:text-[#9ca3af]"]: true,
                  })}
                >
                  Price History
                </div>
                <div>
                  <div>
                    <div className={dashStyles.dashboard_offers_content_main_type}>
                      <div className={dashStyles.dashboard_offers_content_div}>
                        id
                      </div>
                      <div className={dashStyles.dashboard_offers_content_div}>
                        type
                      </div>
                      <div className={dashStyles.dashboard_offers_content_div}>
                      </div>
                    </div>
                    {
                      transacoh ? transacoh.map((e) =>
                        e.haveForm.type == "ERC721" ?
                          <HistoryLoad transacof={transacoh} tokenId={e.haveForm.tokenId} type={e.haveForm.type} swapcode={e.swapcode} sign={e.sign} sdk={swapSdk} />
                          : null
                      )
                        : null
                    }
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={dashStyles.dashboard_right_main}>
              <div
                className={classNames({
                  [dashStyles.dashboard_profile_header]: true,
                  ["dark:text-[#f3f4f6]"]: true,
                })}
              >
                Map Analytics
              </div>
              <div
                className={classNames({
                  [dashStyles.dashboard_none_profile_address]: true,
                  ["dark:text-[#9ca3af]"]: true,
                })}
              >
                OwnerAddress: None
              </div>
              <div className={dashStyles.dashboard_none_profile_axis_main}>
                <div
                  className={classNames({
                    [dashStyles.dashboard_none_profile_axis_x]: true,
                    ["dark:text-[#9ca3af]"]: true,
                  })}
                >
                  x: {axis["x"]}
                </div>
                <div
                  className={classNames({
                    [dashStyles.dashboard_none_profile_axis_x]: true,
                    ["dark:text-[#9ca3af]"]: true,
                  })}
                >
                  y: {axis["y"]}
                </div>
              </div>
              <div>
                <div></div>
              </div>
              <div className={dashStyles.dashboard_none_profile_input_des_main}>
                <div
                  className={classNames({
                    [dashStyles.dashboard_none_profile_input_des_header]: true,
                    ["dark:text-[#9ca3af]"]: true,
                  })}
                >
                  Description
                </div>
                <input
                  className={dashStyles.dashboard_none_profile_input_des_text}
                  onChange={onDescChange}
                  type="text"
                />
              </div>
              <div
                className={dashStyles.dashboard_none_profile_image_drop_main}
              >
                <div
                  className={classNames({
                    [dashStyles.dashboard_none_profile_image_drop_header]: true,
                    ["dark:text-[#9ca3af]"]: true,
                  })}
                >
                  Image
                </div>

                <MyDropzone
                  onChange={onChange}
                  onDrop={onDrop}
                  previewFile={previewFile}
                />

                <div
                  onClick={mintHandleClick}
                  className={dashStyles.dashboard_none_profile_button_main}
                >
                  <motion.div
                    className={dashStyles.dashboard_none_profile_button_mint}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ backgroundColor: "#06b6d4" }}
                  >
                    <Icon
                      icon="akar-icons:circle-check-fill"
                      color="white"
                      height="17"
                    // hFlip={true}
                    />
                    <div>Mint</div>
                  </motion.div>
                </div>
              </div>
              <div className={dashStyles.dashboard_price_history_main}>
                <div
                  className={classNames({
                    [dashStyles.dashboard_price_history_header]: true,
                    ["dark:text-[#9ca3af]"]: true,
                  })}
                >
                  Price History
                </div>
              </div>
            </div>
          )}
        </div>
        <div></div>
      </Layout>
    </>
  );
}
