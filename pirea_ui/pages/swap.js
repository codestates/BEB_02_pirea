import Layout from "../components/layout";
import "react-toastify/dist/ReactToastify.css";
import commonStyles from "./styles/common.module.css";
import Image from "next/image";
import profile from "../assets/test_item.png";
import { Icon } from "@iconify/react";
import Map from "../components/map";
import { useState } from "react";

//TODO:

export default function swap() {
  const [t, setT] = useState(false);

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
          {t ? (
            <div className={commonStyles.common_right_main}>
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
            </div>
          ) : (
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
                  <div className={commonStyles.common_none_profile_address}>
                    OwnerAddress: None
                  </div>
                </div>
                <div></div>
              </div>
              <div className={commonStyles.common_offers_main}>
                <div className={commonStyles.common_offers_header}>Offer</div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
