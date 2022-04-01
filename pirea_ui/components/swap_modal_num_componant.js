import swapStyles from "../pages/styles/swap.module.css";
import classNames from "classnames";
import "tailwindcss/tailwind.css";

export default function SwapModalButton({
  type,
  typeTrans,
  haveModalNum,
  commonModalNum,
  typeTransClick,
  typeErcClick,
  wantModalNum,
}) {
  if (typeTrans == 1) {
    return (
      <>
        <div
          className={classNames({
            [swapStyles.swap_right_type_select_hw_main]: true,
            ["dark:text-[#27272a]"]: true,
          })}
        >
          <div
            onClick={() => typeTransClick(1)}
            className={`
${
  typeTrans == 1
    ? swapStyles.swap_right_type_select_hw_div_selected
    : swapStyles.swap_right_type_select_hw_div
}
                `}
          >
            HAVE
          </div>
          <div
            onClick={() => typeTransClick(2)}
            className={`
${
  typeTrans == 2
    ? swapStyles.swap_right_type_select_hw_div_selected
    : swapStyles.swap_right_type_select_hw_div
}
                `}
          >
            WANT
          </div>
        </div>

        <div
          className={classNames({
            [swapStyles.swap_right_type_select_main]: true,
            ["dark:text-[#27272a]"]: true,
          })}
        >
          <div
            onClick={() => typeErcClick(1)}
            className={`
${
  haveModalNum == 1
    ? swapStyles.swap_right_type_select_div_selected
    : swapStyles.swap_right_type_select_div
}
                `}
          >
            PIXEL
          </div>
          <div
            onClick={() => typeErcClick(2)}
            className={`
${
  haveModalNum == 2
    ? swapStyles.swap_right_type_select_div_selected
    : swapStyles.swap_right_type_select_div
}
                `}
          >
            ERC721
          </div>
          <div
            onClick={() => typeErcClick(3)}
            className={`
${
  haveModalNum == 3
    ? swapStyles.swap_right_type_select_div_selected
    : swapStyles.swap_right_type_select_div
}
                `}
          >
            ERC20
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={classNames({
            [swapStyles.swap_right_type_select_hw_main]: true,
            ["dark:text-[#27272a]"]: true,
          })}
        >
          <div
            onClick={() => typeTransClick(1)}
            className={`
${
  typeTrans == 1
    ? swapStyles.swap_right_type_select_hw_div_selected
    : swapStyles.swap_right_type_select_hw_div
}
                `}
          >
            HAVE
          </div>
          <div
            onClick={() => typeTransClick(2)}
            className={`
${
  typeTrans == 2
    ? swapStyles.swap_right_type_select_hw_div_selected
    : swapStyles.swap_right_type_select_hw_div
}
                `}
          >
            WANT
          </div>
        </div>

        <div
          className={classNames({
            [swapStyles.swap_right_type_select_main]: true,
            ["dark:text-[#27272a]"]: true,
          })}
        >
          <div
            onClick={() => typeErcClick(1)}
            className={`
${
  wantModalNum == 1
    ? swapStyles.swap_right_type_select_div_selected
    : swapStyles.swap_right_type_select_div
}
                `}
          >
            PIXEL
          </div>
          <div
            onClick={() => typeErcClick(2)}
            className={`
${
  wantModalNum == 2
    ? swapStyles.swap_right_type_select_div_selected
    : swapStyles.swap_right_type_select_div
}
                `}
          >
            ERC721
          </div>
          <div
            onClick={() => typeErcClick(3)}
            className={`
${
  wantModalNum == 3
    ? swapStyles.swap_right_type_select_div_selected
    : swapStyles.swap_right_type_select_div
}
                `}
          >
            ERC20
          </div>
        </div>
      </>
    );
  }
}
