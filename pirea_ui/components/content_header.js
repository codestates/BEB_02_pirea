import { Icon } from '@iconify/react';
import c_content_styles from './styles-component/c_content.module.css'
import { useEffect } from 'react'
import Web3 from 'web3'

export default function Content_header() {
  useEffect(() => {
    console.log(window.localStorage);
  }, [])
  return (
    <>
      <div className={c_content_styles.c_content_header_main}>
        {/* light, dark modal*/}
        <div>
          mode
        </div>
        {/* message box*/}
        <div>
          <input className={c_content_styles.content_header_input} placeholder="Search">
          </input>
          <Icon icon="bx:search-alt" color="#bdbdbd" />

        </div>
        {/* icon message, notification*/}
        <div className={c_content_styles.content_header_noti_icon}>
          <div className={c_content_styles.content_header_noti_message_icon}>
            <Icon icon="bx:message-square-detail" height="4vh" color="#828282" />
          </div>
          <div className={c_content_styles.content_header_noti_bell_icon}>
            <Icon icon="mi:notification" height="4vh" color="#828282" />
          </div>
        </div>
        {/*profile*/}
        <div className={c_content_styles.content_header_profile}>
          first login
        </div>
        <div>
        </div>
      </div>
    </>
  )
}
