import { Icon } from "@iconify/react";
import c_content_styles from "./styles-component/c_content.module.css";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import Web3 from "web3";
import Router from "next/router";
import Avatar from "react-nice-avatar";
import axios from 'axios'
import Web3Token from 'web3-token'

//? darkMode1
// const StyledApp = styled.div`
//   color: ${(props) => props.theme.fontColor};
// `;

export default function Content_header() {
  const [account, setAccount] = useState();
  const [isShow, setIsShow] = useState(false);
  // const [theme, setTheme] = useState("light");
  //? 현재상태와 테마 상태가 일치하도록 만들어주기
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return <SunIcon role="button" onClick={() => setTheme("light")} />;
    } else {
      return <MoonIcon role="button" onClick={() => setTheme("dark")} />;
    }
  };

  useEffect(() => {
    setAccount(window.localStorage.getItem("account"));
  }, []);

  const login = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const account = accounts[0];

    const token = await Web3Token.sign(
      (msg) => web3.eth.personal.sign(msg, account),
      {
        domain: "landnft.com",
        statement: "login in pirea",
        data: "1d",
      }
    );

    const { address, body } = await Web3Token.verify(token);
    console.log(address, body);
    console.log(token);
    setAccount(account);

    const data = await axios.get('http://192.168.0.3:8000/api/v0.1/users/wallet/login', {
      params: {
        token: token,
        wallet: 'metamask',
        address: account
      }
    })


    // window.localStorage.setItem("account", token);
  }

  const logout = () => {
    window.localStorage.removeItem("account");
    Router.reload();
  };

  // const themeToggler = () => {
  //   theme === "light" ? setTheme("dark") : setTheme("light");
  // };

  return (
    <>
      <div className={c_content_styles.c_content_header_main}>
        {/* light, dark modal*/}
        {/* <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />
          <StyledApp></StyledApp>
          <button
            className={c_content_styles.toggleBtn}
            onClick={() => themeToggler()}
          ></button> */}
        <div className={c_content_styles.c_content_header_mode}>
          {renderThemeChanger()}
        </div>

        {/* message box*/}
        <div className={c_content_styles.content_header_input}>
          <input
            className={c_content_styles.content_header_input_wright}
            placeholder="Search"
          ></input>
          <Icon
            icon="bx:search-alt"
            color="#bdbdbd"
            className={c_content_styles.content_header_input_symbol}
          />
        </div>
        {/* icon message, notification*/}
        <div className={c_content_styles.content_header_noti_icon}>
          <div className={c_content_styles.content_header_noti_message_icon}>
            <Icon
              icon="bx:message-square-detail"
              height="4vh"
              color="#828282"
            />
          </div>
          <div className={c_content_styles.content_header_noti_bell_icon}>
            <Icon icon="mi:notification" height="4vh" color="#828282" />
          </div>
        </div>
        {/*profile*/}
        {account ? (
          <div
            onMouseEnter={() => setIsShow(true)}
            onMouseLeave={() => setIsShow(false)}
            className={c_content_styles.header_profile_login_main}
          >
            <div>
              <Avatar
                style={{ width: "3vw", height: "6vh" }}
                className={c_content_styles.header_profile_login_avatar}
              />
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
            <div
              onMouseEnter={() => setIsShow(true)}
              onMouseLeave={() => setIsShow(false)}
              className={c_content_styles.header_profile_login_main}
            >
              <div>

                <Avatar style={{ width: '3vw', height: '6vh' }} className={c_content_styles.header_profile_login_avatar} />

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
              <div
                className={`
${isShow
                    ? c_content_styles.header_profile_login_popup
                    : c_content_styles.header_profile_login_no_popup
                  }

            `}
            >
              {/*popup modal*/}
              <div
                onClick={logout}
                className={c_content_styles.header_profile_login_list_div}
              >
                {/*popup icon*/}
                logout
              </div>
              <div
                onClick={logout}
                className={c_content_styles.header_profile_login_list_div}
              >
                etc
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={login}
            className={c_content_styles.content_header_profile_no_login}
          >
            first login
          </div>
        )}
        <div></div>
        {/* </ThemeProvider> */}
      </div>
    </>
  );
}
