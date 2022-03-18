import Layout from "../components/layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swapStyles from "./styles/swap.module.css";
import Image from "next/image";
import profile from "../assets/test_item.png";
import { Icon } from "@iconify/react";
import Map from "../components/map";

export default function Swap() {
  return (
    <>
      {/* //? dashboard와 겹치는 스타일 컴포넌트화 하는게 좋을까? */}
      <Layout>
        <div className={swapStyles.swap_main}>
          {/*left*/}
          <div className={swapStyles.swap_left_main}>
            <div className={swapStyles.swap_map}>
              <Map />
            </div>
            <div className={swapStyles.swap_search_main}>
              <input
                placeholder="Search Owner Address"
                className={swapStyles.swap_search_input}
                type="text"
              />
              <Icon
                icon="ant-design:search-outlined"
                color="#087592"
                height="15"
                hFlip={true}
              />
            </div>
            <div className={swapStyles.swap_description_main}>
              <div className={swapStyles.swap_description_content_header}>
                Description
              </div>
            </div>
          </div>
          {/*right*/}
          <div>
            <div>
              <div className={swapStyles.swap_profile_header}>
                Map Analytics
              </div>
              <div className={swapStyles.swap_profile_img_main}>
                <div className={swapStyles.swap_profile_img}>
                  <Image src={profile} alt="test" />
                </div>
              </div>
              <div className={swapStyles.swap_profile_address_main}>
                <div className={swapStyles.swap_profile_address_header}>
                  Owner address:
                </div>
                <div className={swapStyles.swap_profile_address_text}>
                  0x8772901ea06D450C18A92a53927Ba63EFcC97Dbe
                </div>
              </div>
              <div></div>
            </div>
            <div className={swapStyles.swap_offers_main}>
              <div className={swapStyles.swap_offers_header}>Offer</div>
            </div>
            {/* <div className={swapStyles.swap_price_history_main}>
              <div className={swapStyles.swap_price_history_header}>
                Price History
              </div>
            </div> */}
          </div>
        </div>
      </Layout>
    </>
  );
}
