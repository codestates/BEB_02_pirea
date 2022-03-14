import Layout from '../components/layout'
import Map from '../assets/amCharts.pixelMap-1.svg'
import dashStyles from './styles/dashboard.module.css'
export default function Dashboard() {
  return (
    <>
      <Layout>
        <div className={dashStyles.dashboard_main}>
          {/*left*/}
          <div>
            <div>
              <Map className={dashStyles.dashboard_map} />
            </div>
            <div>
              Description
            </div>
          </div>
          {/*right*/}
          <div>
            <div>
              Map Analytics
            </div>
            <div>
              Offer
            </div>
            <div>
              Price History
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
