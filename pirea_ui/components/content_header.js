import { Icon } from '@iconify/react';
import c_content_styles from './styles-component/c_content.module.css'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import Router from 'next/router'
import Avatar from 'react-nice-avatar'


export default function Content_header() {
  const [account, setAccount] = useState();
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setAccount(window.localStorage.getItem("account"));

  }, []);

  const login = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0];
    setAccount(account);
    window.localStorage.setItem("account", account);
    Router.reload();
  }
  const logout = () => {
    window.localStorage.removeItem("account");
    Router.reload();
  }



  return (
    <>
      <div className={c_content_styles.c_content_header_main}>
        {/* light, dark modal*/}
        <div>
          mode
        </div>
        {/* message box*/}
        <div className={c_content_styles.content_header_input}  >
          <input className={c_content_styles.content_header_input_wright} placeholder="Search">
          </input>
          <Icon icon="bx:search-alt" color="#bdbdbd" className={c_content_styles.content_header_input_symbol} />


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
        {
          account ?
            <div onMouseEnter={() => setIsShow(true)} onMouseLeave={() => setIsShow(false)} className={c_content_styles.header_profile_login_main}>
              <div>
                <Avatar style={{ width: '3.5rem', height: '3.5rem' }} />
              </div>
              <div className={c_content_styles.header_profile_login_properties}>
                <div className={c_content_styles.header_profile_login_nickname}>
                  nickname
                </div>
                <div className={c_content_styles.header_profile_login_address}>
                  {account.slice(0, 20) + "....."}
                </div>
              </div>
              <div>
                {/*popup icon*/}
                <Icon icon="fa6-solid:v" color="#444" height="2vh" />
              </div>
              <div className={`
${isShow ?
                  c_content_styles.header_profile_login_popup
                  :
                  c_content_styles.header_profile_login_no_popup
                }

            `}>
                {/*popup modal*/}
                <div onClick={logout} className={c_content_styles.header_profile_login_list_div}>
                  {/*popup icon*/}
                  logout
                </div>
                <div onClick={logout} className={c_content_styles.header_profile_login_list_div}>
                  etc
                </div>
              </div>
            </div>
            :
            <div onClick={login} className={c_content_styles.content_header_profile_no_login}>
              first login
            </div>
        }
        <div>
        </div>
      </div>
    </>
  )
}
