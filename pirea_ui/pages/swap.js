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

//TODO:

export default function swap() {
  const [t, setT] = useState(false);
  const [axis, setAxis] = useState({});
  const [typeModalNum, setTypeModalNum] = useState(1);
  const [typeTrans, setTypeTrans] = useState(1);

  const handleCreate = (data) => {
    if (data["x"] !== axis["x"] || data["y"] !== axis["y"]) {
      setAxis(data);
    }
  };

  const typeErcClick = (data) => {
    setTypeModalNum(data);
  };

  const typeTransClick = (data) => {
    setTypeTrans(data);
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
              <div className={swapStyles.swap_right_type_select_main}>

                <div onClick={() => typeTransClick(1)} className={`
${typeTrans == 1
                    ? swapStyles.swap_right_type_select_div_selected
                    : swapStyles.swap_right_type_select_div
                  }
                `}>
                  HAVE
                </div>
                <div onClick={() => typeTransClick(2)} className={`
${typeTrans == 2
                    ? swapStyles.swap_right_type_select_div_selected
                    : swapStyles.swap_right_type_select_div
                  }
                `}>
                  WANT
                </div>
              </div>


              <div className={swapStyles.swap_right_type_select_main}>

                <div onClick={() => typeErcClick(1)} className={`
${typeModalNum == 1
                    ? swapStyles.swap_right_type_select_div_selected
                    : swapStyles.swap_right_type_select_div
                  }
                `}>
                  PIXEL
                </div>
                <div onClick={() => typeErcClick(2)} className={`
${typeModalNum == 2
                    ? swapStyles.swap_right_type_select_div_selected
                    : swapStyles.swap_right_type_select_div
                  }
                `}>
                  ERC721
                </div>
                <div onClick={() => typeErcClick(3)} className={`
${typeModalNum == 3
                    ? swapStyles.swap_right_type_select_div_selected
                    : swapStyles.swap_right_type_select_div
                  }
                `}>

                  ERC20
                </div>
              </div>
              {/* 여기는 type form */}
              <ErcForm type={typeModalNum} axis={axis} />


              {/* 여기는 button */}
              <div className={swapStyles.swap_right_button_main}>
                <div className={swapStyles.swap_right_button_div}>
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
            </div>
          </div>

        </div>
      </Layout>
    </>
  );
}
