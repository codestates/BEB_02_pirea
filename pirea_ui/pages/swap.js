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

  const [tmpHave, setTMPHave] = useState({
    address: '',
    tokenId: '',
    amount: '',
  });
  const [tmpWant, setTMPWant] = useState({
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
    setTypeTrans(data);
  }

  /* pixel, erc721, erc20 setting */
  const typeErcClick = (data) => {
    if (typeTrans == 1) {
      setHaveModalNum(data);
      setCommonModalNum(data);
    } else {
      setWantModalNum(data);
      setCommonModalNum(data);
    }
  };

  const inputHaveClick = () => {
    if (typeTrans == 1) {
      setTMPHave({
        address: ercContract,
        tokenId: erc721Id,
        amount: erc20Amount
      });
      setHaveAxis(axis);
    } else {
      setTMPWant({
        address: ercContract,
        tokenId: erc721Id,
        amount: erc20Amount
      });
      setWantAxis(axis);
    }
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
    console.log(axis);
  }, [axis]);

  return (
    <>
      {/* //? dashboard와 겹치는 스타일 컴포넌트화 하는게 좋을까? */}
      <Layout>
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
            <div className={dashStyles.dashboard_profile_img}>
              <Image src={profile} alt="test" />
            </div>
            <div className={swapStyles.swap_right_description_main}>
              <SwapModalButton typeTrans={typeTrans} typeErcClick={typeErcClick} typeTransClick={typeTransClick} commonModalNum={commonModalNum} />
              {/* 여기는 type form */}
              <ErcForm type={commonModalNum} axis={axis} setErc20Amount={setErc20Amount} setErc721Id={setErc721Id} setErcContract={setErcContract} />


              {/* 여기는 button */}
              <div className={swapStyles.swap_right_button_main}>
                <div className={swapStyles.swap_right_button_div} onClick={inputHaveClick}>
                  input
                </div>
                <div className={swapStyles.swap_right_button_div}>
                  approve
                </div>
                <div className={swapStyles.swap_right_button_div}>
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
