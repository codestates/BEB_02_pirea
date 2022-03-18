import Layout from "../components/layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import assetsStyles from "./styles/assets.module.css";
import Image from "next/image";
import profile from "../assets/test_item.png";
import { Icon } from "@iconify/react";
import Map from "../components/map";

export default function Assets() {
  return (
    <>
      {/* //? dashboard와 겹치는 스타일 컴포넌트화 하는게 좋을까? */}
      <Layout>
        <div className={assetsStyles.assets_main}>
          {/*left*/}
          <div className={assetsStyles.assets_left_main}>
            <div className={assetsStyles.assets_map}>
              <Map />
            </div>
          </div>
          {/*right*/}
          <div>
            <div>
              <div className={assetsStyles.assets_profile_header}>
                Map Analytics
              </div>
              <div className={assetsStyles.assets_profile_img_main}>
                <div className={assetsStyles.assets_profile_img}>
                  <Image src={profile} alt="test" />
                </div>
              </div>
              <div className={assetsStyles.assets_profile_address_main}>
                <div className={assetsStyles.assets_profile_address_header}>
                  Owner address:
                </div>
                <div className={assetsStyles.assets_profile_address_text}>
                  0x8772901ea06D450C18A92a53927Ba63EFcC97Dbe
                </div>
              </div>
              <div></div>
            </div>
            <div className={assetsStyles.assets_offers_main}>
              <div className={assetsStyles.assets_offers_header}>Offer</div>
            </div>
            {/* <div className={assetsStyles.assets_price_history_main}>
              <div className={assetsStyles.assets_price_history_header}>
                Price History
              </div>
            </div> */}
          </div>
        </div>
      </Layout>
    </>
  );
}
