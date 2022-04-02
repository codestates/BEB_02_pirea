import { Icon } from "@iconify/react";
import sidebar_styles from "./styles-component/sidebar.module.css";
import Logo from "../assets/Logo_img.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import "tailwindcss/tailwind.css";
import { motion } from "framer-motion";

// TODO: 반응형 웹
export default function Sidebar() {
  const router = useRouter();

  return (
    <>
      <div
        className={classNames({
          [sidebar_styles.main_sidebar]: true,
          ["dark:border-[#475569]"]: true,
        })}
      >
        <div className={sidebar_styles.sidebar_header}>
          <div className={sidebar_styles.sidebar_header_logo}></div>

          <div className={sidebar_styles.sidebar_header_text}>
            <Link href="/">
              <div className={sidebar_styles.sidebar_header_text}>Pirea</div>
            </Link>
          </div>
        </div>

        <div className={sidebar_styles.sidebar_content_link}>
          <Link href="/dashboard">
            <div className={sidebar_styles.sidebar_div_main}>
              <div
                className={`
              ${
                router.pathname === "/dashboard"
                  ? sidebar_styles.sidebar_div_active
                  : sidebar_styles.sidebar_div_deactive
              }
            `}
              >
                <div>
                  <Icon height="2.5rem" icon="ic:twotone-space-dashboard" />
                </div>
                <div className={sidebar_styles.sidebar_div_text}>
                  <a
                    className={classNames({
                      [sidebar_styles.sidebar_link_a]: true,
                      ["dark:text-[#cbd5e1]"]: true,
                      ["hidden md:flex"]: true,
                    })}
                  >
                    Dashboard
                  </a>
                </div>
              </div>
            </div>
          </Link>

          {/* <Link href="/analytics">
            <div className={sidebar_styles.sidebar_div_main}>
              <div
                className={`
              ${
                router.pathname === "/analytics"
                  ? sidebar_styles.sidebar_div_active
                  : sidebar_styles.sidebar_div_deactive
              }
            `}
              >
                <div>
                  <Icon height="2.2rem" icon="carbon:text-link-analysis" />
                </div>
                <div className={sidebar_styles.sidebar_div_text}>
                  <a
                    className={classNames({
                      [sidebar_styles.sidebar_link_a]: true,
                      ["dark:text-[#cbd5e1]"]: true,
                    })}
                  >
                    Analytics
                  </a>
                </div>
              </div>
            </div>
          </Link> */}
          <Link href="/assets">
            <div className={sidebar_styles.sidebar_div_main}>
              <div
                className={`
              ${
                router.pathname === "/assets"
                  ? sidebar_styles.sidebar_div_active
                  : sidebar_styles.sidebar_div_deactive
              }
            `}
              >
                <div>
                  <Icon height="2.2rem" icon="fluent:wallet-24-regular" />
                </div>
                <div className={sidebar_styles.sidebar_div_text}>
                  <a
                    className={classNames({
                      [sidebar_styles.sidebar_link_a]: true,
                      ["dark:text-[#cbd5e1]"]: true,
                      ["hidden md:flex"]: true,
                    })}
                  >
                    Assets
                  </a>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/swap">
            <div className={sidebar_styles.sidebar_div_main}>
              <div
                className={`
              ${
                router.pathname === "/swap"
                  ? sidebar_styles.sidebar_div_active
                  : sidebar_styles.sidebar_div_deactive
              }
            `}
              >
                <div>
                  <Icon height="2.2rem" icon="ant-design:swap-outlined" />
                </div>
                <div className={sidebar_styles.sidebar_div_text}>
                  <a
                    className={classNames({
                      [sidebar_styles.sidebar_link_a]: true,
                      ["dark:text-[#cbd5e1]"]: true,
                      ["hidden md:flex"]: true,
                    })}
                  >
                    Swap
                  </a>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/load">
            <div className={sidebar_styles.sidebar_div_main}>
              <div
                className={`
              ${
                router.pathname === "/load"
                  ? sidebar_styles.sidebar_div_active
                  : sidebar_styles.sidebar_div_deactive
              }
            `}
              >
                <div>
                  <Icon icon="akar-icons:check-box-fill" height="2.2rem" />
                </div>
                <div className={sidebar_styles.sidebar_div_text}>
                  <a
                    className={classNames({
                      [sidebar_styles.sidebar_link_a]: true,
                      ["dark:text-[#cbd5e1]"]: true,
                      ["hidden md:flex"]: true,
                    })}
                  >
                    Load
                  </a>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/allswap">
            <div className={sidebar_styles.sidebar_div_main}>
              <div
                className={`
              ${
                router.pathname === "/allswap"
                  ? sidebar_styles.sidebar_div_active
                  : sidebar_styles.sidebar_div_deactive
              }
            `}
              >
                <div>
                  <Icon height="2.2rem" icon="fluent:cloud-swap-20-regular" />
                </div>
                <div className={sidebar_styles.sidebar_div_text}>
                  <a
                    className={classNames({
                      [sidebar_styles.sidebar_link_a]: true,
                      ["dark:text-[#cbd5e1]"]: true,
                      ["hidden md:flex"]: true,
                    })}
                  >
                    All_swap
                  </a>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className={sidebar_styles.sidebar_footer}></div>
      </div>
    </>
  );
}
