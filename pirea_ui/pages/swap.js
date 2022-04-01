import Layout from "../components/layout";
import "react-toastify/dist/ReactToastify.css";
import commonStyles from "./styles/common.module.css";
import swapStyles from "./styles/swap.module.css"
import Image from "next/image";
import profile from "../assets/test_item.png";
import { Icon } from "@iconify/react";
import Map from "../components/map";
import { useState, useEffect } from "react";
import dashStyles from "./styles/dashboard.module.css";
import ErcForm from "../components/ercForm"
import Swap_have from "../components/swap_have"
import Swap_want from "../components/swap_want"
import SwapModalButton from "../components/swap_modal_num_componant";
import { useWeb3React } from "@web3-react/core";
import { NftSwap } from '@traderxyz/nft-swap-sdk';
import { injected } from "./lib/connectors";
import { approveOrder } from "./lib/approve"
import axios from "axios";
import Toast from 'light-toast';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import abi from "./lib/abi"
import config from "./lib/config.json"
import Web3 from "web3"


//TODO:

export default function swap() {

  const [t, setT] = useState(false);
  const [axis, setAxis] = useState({});
  const [wantAxis, setWantAxis] = useState({});
  const [haveAxis, setHaveAxis] = useState({});
  const [haveModalNum, setHaveModalNum] = useState(1);
  const [wantModalNum, setWantModalNum] = useState(1);
  const [commonModalNum, setCommonModalNum] = useState(1);
  const [typeTrans, setTypeTrans] = useState(1);
  const [erc20Amount, setErc20Amount] = useState();
  const [erc721Id, setErc721Id] = useState();
  const [ercContract, setErcContract] = useState();
  const { library, chainId, activate, active, deactivate } = useWeb3React();
  const [swapSdk, setSwapSdk] = useState(null);
  const [web3, setWeb3] = useState('');
  const smartContAddr = config["WEB3"]["CONTRACT_ADDRESS"];


  const [tmpHave, setTMPHave] = useState({
    type: '',
    address: '',
    tokenId: '',
    amount: '',
  });

  const [tmpWant, setTMPWant] = useState({
    type: '',
    address: '',
    tokenId: '',
    amount: '',
  });


  const handleCreate = (data) => {
    if (data["x"] !== axis["x"] || data["y"] !== axis["y"]) {
      setAxis(data);
      setErc721Id(1);
    }
  };

  /* have want, setting */
  const typeTransClick = (data) => {
    window.localStorage.setItem("typeTrans", data);
    setTypeTrans(data);
  }

  /* pixel, erc721, erc20 setting */
  const typeErcClick = (data) => {

    console.log(data);
    if (typeTrans == 1) {
      setHaveModalNum(data);
      setCommonModalNum(data);
      window.localStorage.setItem("haveModalNum", data);
    } else {
      setWantModalNum(data);
      setCommonModalNum(data);
      window.localStorage.setItem("wantModalNum", data);
    }
    window.localStorage.setItem("commonModalNum", data);
  };

  const inputHaveClick = async () => {
    // openPopup();
    var a = 0;

    activate(injected, (error) => {
      if (isNoEthereumObject(error))
        window.open("https://metamask.io/download.html");
    });




    console.log(commonModalNum);
    if (commonModalNum == 1) {
      const web = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
      const tokenContract = new web.eth.Contract(
        abi,
        smartContAddr
      );
      const tokenCallId = await tokenContract.methods.getTokenId(axis['x'], axis['y']).call();
      const ownerAddr = await tokenContract.methods.ownerOf(tokenCallId).call();
      console.log(ownerAddr);

      console.log("tokenid", a);
      console.log("before", erc721Id);
      if (typeTrans == 1) {
        setTMPHave({
          type: haveModalNum,
          address: smartContAddr,
          tokenId: tokenCallId,
          amount: erc20Amount,
          ownerAddr: ownerAddr
        });
        setHaveAxis(axis);
      } else {
        setTMPWant({
          type: wantModalNum,
          address: smartContAddr,
          tokenId: tokenCallId,
          tokenId: tokenCallId,
          amount: erc20Amount,
          ownerAddr: ownerAddr
        });
        setWantAxis(axis);
      }
    } else {
      if (typeTrans == 1) {
        setTMPHave({
          type: haveModalNum,
          address: ercContract,
          tokenId: erc721Id,
          amount: erc20Amount
        });
        setHaveAxis(axis);
      } else {
        setTMPWant({
          type: wantModalNum,
          address: ercContract,
          tokenId: erc721Id,
          amount: erc20Amount
        });
        setWantAxis(axis);
      }
    }




  }

  const approve = async () => {

    const approveId = toast.loading("Approve loading...");
    var orderForm = approveOrder(tmpHave);


    try {
      const approvalStatus = await swapSdk.loadApprovalStatus(
        orderForm,
        window.localStorage.getItem("account"))


      if (!approvalStatus.contractApproved) {
        const approvalTx = await swapSdk.approveTokenOrNftByAsset(orderForm, window.localStorage.getItem("account"));
        const approvalReceipt = await approvalTx.wait();
        // console.log(orderForm.tokenAddress, approvalReceipt);
        toast.update(approveId, {
          render: `${approvalReceipt} sucess approve`,
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      } else {
        toast.update(approveId, {
          render: "already approve",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    } catch (e) {
      toast.update(approveId, {
        render: "can`t approve",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  }

  const createSwap = async () => {
    const createSwapId = toast.loading("create swap loading..")
    const wantForm = approveOrder(tmpWant);
    const haveForm = approveOrder(tmpHave);


    console.log("want", wantForm);
    console.log("have", haveForm);

    try {
      const order = swapSdk.buildOrder(
        [haveForm],
        [wantForm],
        window.localStorage.getItem("account")
      )

      const signedOrder = await swapSdk.signOrder(order, window.localStorage.getItem("account"))
      const response = await axios.post("http://192.168.0.3:8000/api/v0.1/swap/create", {
        order: signedOrder,
        haveForm: haveForm,
        wantForm: wantForm
      });
      // openPopup(response.data);
      console.log(response.data);
      toast.update(createSwapId, {
        render: `${response.data} success swap`,
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });

      openPopup(response.data);
    } catch (e) {
      console.log(e);
      toast.update(createSwapId, {
        render: "can`t create swap",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }

    /* const signedOrder = await swapSdk.signOrder(order, "0xa179C868E21aD4C288f6084Eb349000Ba8623AeA");
    console.log(signedOrder); */

  }

  const openPopup = (swap_code) => {
    Toast.info(swap_code, 3000, () => {
      // do something after the toast disappears
    });
    const content = (
      <div>
        <p className="quotes">{swap_code}</p>

      </div>
    )

  }

  const clearHave = () => {
    setTMPHave({
      address: '',
      tokenId: '',
      amount: ''
    });
    setHaveAxis({});
  }
  const clearWant = () => {
    setTMPWant({
      address: '',
      tokenId: '',
      amount: ''
    });
    setWantAxis({});
  }

  useEffect(() => {
    console.log(active);
    const haveModal = window.localStorage.getItem("haveModalNum");
    const wantModal = window.localStorage.getItem("wantModalNum");
    const commonModal = window.localStorage.getItem("commonModalNum");

    if (haveModal) {
      setHaveModalNum(haveModal);
    }
    if (wantModal) {
      setWantModalNum(wantModal);
    }
    if (commonModal) {
      setCommonModalNum(commonModal);
    }

    if (active) {
      const sdk = new NftSwap(library, library.getSigner(), chainId);
      setSwapSdk(sdk);
    }
  }, [library, chainId, haveModalNum, wantModalNum, commonModalNum])



  return (
    <>
      {/* //? dashboard와 겹치는 스타일 컴포넌트화 하는게 좋을까? */}
      <Layout setWeb3={setWeb3}>
        <div className={commonStyles.common_main}>
          <div className={commonStyles.common_left_main}>
            <div className={swapStyles.swap_left_map_main}>
              <Map
                className={commonStyles.dashboard_map_canvas}
                onChange={handleCreate}
              />
            </div>
            <div className={swapStyles.swap_left_have_main}>
              <div className={swapStyles.swap_left_have_header}>
                Have
              </div>
              <div className={swapStyles.swap_left_have_content}>
                <Swap_have type={haveModalNum} tmpHave={tmpHave} axis={haveAxis} />
              </div>
              <div className={swapStyles.swap_left_have_footer}>
                <div onClick={clearHave} className={swapStyles.swap_left_have_footer_button}>
                  clear
                </div>
              </div>
            </div>
          </div>
          <div className={commonStyles.common_right_main}>
            <div className={swapStyles.swap_right_header}>
              create swap
            </div>
            <div className={swapStyles.swap_right_profile_image_main}>
              <Image src={profile} alt="test" />
            </div>
            <div className={swapStyles.swap_right_description_main}>
              <SwapModalButton typeTrans={typeTrans} typeErcClick={typeErcClick} typeTransClick={typeTransClick} commonModalNum={commonModalNum} haveModalNum={haveModalNum} wantModalNum={wantModalNum} />
              {/* 여기는 type form */}
              <ErcForm typeTrans={typeTrans} type={`${typeTrans == 1
                ? haveModalNum
                : wantModalNum
                }`} axis={axis} setErc20Amount={setErc20Amount} setErc721Id={setErc721Id} setErcContract={setErcContract} />

              {/* 여기는 button */}
              <div className={swapStyles.swap_right_button_main}>
                <div className={swapStyles.swap_right_button_div} onClick={inputHaveClick}>
                  input
                </div>
                <div className={swapStyles.swap_right_button_div} onClick={() => approve()}>
                  approve
                </div>
                <div className={swapStyles.swap_right_button_div} onClick={() => createSwap()}>
                  create swap
                </div>
              </div>
            </div>
            <div className={swapStyles.swap_right_want_main}>
              <div className={swapStyles.swap_right_want_header}>
                want
              </div>
              <div className={swapStyles.swap_left_have_content}>
                <Swap_want type={wantModalNum} tmpWant={tmpWant} axis={wantAxis} />
              </div>
              <div className={swapStyles.swap_right_want_footer}>
                <div onClick={clearWant} className={swapStyles.swap_right_want_footer_button}>
                  clear
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
