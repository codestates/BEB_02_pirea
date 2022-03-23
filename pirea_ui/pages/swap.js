import Layout from "../components/layout";
import "react-toastify/dist/ReactToastify.css";
import commonStyles from "./styles/common.module.css";
import swapStyles from "./styles/swap.module.css"
import Image from "next/image";
import profile from "../assets/test_item.png";
import { Icon } from "@iconify/react";
import Map from "../components/map";
import { useState, useEffect } from "react";

//TODO:

export default function swap() {
  const [t, setT] = useState(false);
  const [axis, setAxis] = useState({});

  const handleCreate = (data) => {
    if (data["x"] !== axis["x"] || data["y"] !== axis["y"]) {
      setAxis(data);
    }
  };

  useEffect(() => {
    console.log(axis);
  }, [axis]);

  return (
    <>
      {/* //? dashboard와 겹치는 스타일 컴포넌트화 하는게 좋을까? */}
      <Layout>
        <div className={commonStyles.common_main}>
          <div className={commonStyles.common_left_main}>
            <div className={swapStyles.swap_left_modal_main}>
              <div className={swapStyles.swap_left_modal_button}>
                <div className={swapStyles.swap_left_modal_button_first}>
                  have
                  <Icon icon="ooui:bold-v" color="#333" height="1.5vh" />
                </div>
                <div className={swapStyles.swap_left_modal_button_second}>
                  want
                </div>
              </div>
            </div>
            <div>
              <Map
                className={commonStyles.dashboard_map_canvas}
                onChange={handleCreate}
              />
            </div>
            <div>
            </div>
          </div>
          <div className={commonStyles.common_right_main}>
            <div className={commonStyles.common_profile_header}>
              create swap
            </div>
            <div>
              <div>
              </div>

            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
