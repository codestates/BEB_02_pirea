import { Icon } from "@iconify/react";
import sidebar_styles from "./styles-component/sidebar.module.css";
import Logo from "../assets/Logo_img.svg";
import Link from "next/link";
import { useRouter } from "next/router";


// TODO: 반응형 웹
export default function Sidebar() {
  const router = useRouter();

  return (
    <>
      <div className={sidebar_styles.main_sidebar}>
        <div className={sidebar_styles.sidebar_header}>
            <div className={sidebar_styles.sidebar_header_logo}>
              <Logo className={sidebar_styles.sidebar_header_logo_pro} />
            </div>
            <div className={sidebar_styles.sidebar_header_text}>
              <Link href="/">
                <div>
                  Pirea
                </div>
              </Link>
            </div>
        </div>

        <div className={sidebar_styles.sidebar_content_link}>
          <Link href="/dashboard">
            <div className={sidebar_styles.sidebar_div_main}>
              <div
                className={`
              ${router.pathname === "/dashboard"
                    ? sidebar_styles.sidebar_div_active
                    : sidebar_styles.sidebar_div_deactive
                  }
            `}
              >
                <div>
                  <Icon icon="ic:twotone-space-dashboard" />
                </div>
                <div className={sidebar_styles.sidebar_div_text}>
                  <a className={sidebar_styles.sidebar_link_a}>Dashboard</a>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/analytics">
            <div className={sidebar_styles.sidebar_div_main}>
              <div
                className={`
              ${router.pathname === "/analytics"
                    ? sidebar_styles.sidebar_div_active
                    : sidebar_styles.sidebar_div_deactive
                  }
            `}
              >
                <div>
                  <Icon icon="carbon:text-link-analysis" />
                </div>
                <div className={sidebar_styles.sidebar_div_text}>
                  <a className={sidebar_styles.sidebar_link_a}>Analytics</a>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/assets">
            <div className={sidebar_styles.sidebar_div_main}>
              <div
                className={`
              ${router.pathname === "/assets"
                    ? sidebar_styles.sidebar_div_active
                    : sidebar_styles.sidebar_div_deactive
                  }
            `}
              >
                <div>
                  <Icon icon="fluent:wallet-24-regular" />
                </div>
                <div className={sidebar_styles.sidebar_div_text}>
                  <a className={sidebar_styles.sidebar_link_a}>Assets</a>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/swap">
            <div className={sidebar_styles.sidebar_div_main}>
              <div
                className={`
              ${router.pathname === "/swap"
                    ? sidebar_styles.sidebar_div_active
                    : sidebar_styles.sidebar_div_deactive
                  }
            `}
              >
                <div>
                  <Icon icon="ant-design:swap-outlined" />
                </div>
                <div className={sidebar_styles.sidebar_div_text}>
                  <a className={sidebar_styles.sidebar_link_a}>Swap</a>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/load">
            <div className={sidebar_styles.sidebar_div_main}>
              <div
                className={`
              ${router.pathname === "/load"
                    ? sidebar_styles.sidebar_div_active
                    : sidebar_styles.sidebar_div_deactive
                  }
            `}
              >
                <div>
                  <Icon icon="ant-design:swap-outlined" />
                </div>
                <div className={sidebar_styles.sidebar_div_text}>
                  <a className={sidebar_styles.sidebar_link_a}>Load</a>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/allswap">
            <div className={sidebar_styles.sidebar_div_main}>
              <div
                className={`
              ${router.pathname === "/allswap"
                    ? sidebar_styles.sidebar_div_active
                    : sidebar_styles.sidebar_div_deactive
                  }
            `}
              >
                <div>
                  <Icon icon="fluent:cloud-swap-20-regular" />
                </div>
                <div className={sidebar_styles.sidebar_div_text}>
                  <a className={sidebar_styles.sidebar_link_a}>All_swap</a>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className={sidebar_styles.sidebar_footer}>footer</div>
      </div>
    </>
  );
}
