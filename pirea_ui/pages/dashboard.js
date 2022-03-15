import Layout from '../components/layout'
import Map from '../assets/amCharts.pixelMap-1.svg'
import dashStyles from './styles/dashboard.module.css'
import Image from "next/image";
import profile from '../assets/test_item.png'

// TODO: 스마트컨트랙트와 연동
export default function Dashboard() {
  return (
    <>
      <Layout>
        <div className={dashStyles.dashboard_main}>
          {/*left*/}
          <div className={dashStyles.dashboard_left_main}>
            <div>
              <Map className={dashStyles.dashboard_map} />
            </div>
            <div className={dashStyles.dashboard_description_main}>
              <div className={dashStyles.dashboard_description_content_header}>
                Description
              </div>
            </div>
          </div>
          {/*right*/}
          <div>
            <div>
              <div className={dashStyles.dashboard_profile_header} >
                Map Analytics
              </div>
              <div className={dashStyles.dashboard_profile_img_main} >
                <div className={dashStyles.dashboard_profile_img}>
                  <Image src={profile} alt="test" />
                </div>
              </div>
              <div className={dashStyles.dashboard_profile_address_main}>
                <div className={dashStyles.dashboard_profile_address_header}>
                  Owner address:
                </div>
                <div className={dashStyles.dashboard_profile_address_text}>
                  0x8772901ea06D450C18A92a53927Ba63EFcC97Dbe
                </div>
              </div>
              <div>
              </div>
            </div>
            <div className={dashStyles.dashboard_offers_main}>
              <div className={dashStyles.dashboard_offers_header}>
                Offer
              </div>
            </div>
            <div className={dashStyles.dashboard_price_history_main}>
              <div className={dashStyles.dashboard_price_history_header}>
                Price History
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
