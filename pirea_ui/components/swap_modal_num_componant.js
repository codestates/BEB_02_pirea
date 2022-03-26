import swapStyles from "../pages/styles/swap.module.css"

export default function SwapModalButton({ type, typeTrans, haveModalNum, commonModalNum, typeTransClick, typeErcClick }) {

  return (
    <>
      <div className={swapStyles.swap_right_type_select_main}>
        <div onClick={() => typeTransClick(1)} className={`
${typeTrans == 1
            ? swapStyles.swap_right_type_select_div_selected
            : swapStyles.swap_right_type_select_div
          }
                `}>
          HAVE
        </div>
        <div onClick={() => typeTransClick(2)} className={`
${typeTrans == 2
            ? swapStyles.swap_right_type_select_div_selected
            : swapStyles.swap_right_type_select_div
          }
                `}>
          WANT
        </div>
      </div>


      <div className={swapStyles.swap_right_type_select_main}>

        <div onClick={() => typeErcClick(1)} className={`
${commonModalNum == 1
            ? swapStyles.swap_right_type_select_div_selected
            : swapStyles.swap_right_type_select_div
          }
                `}>
          PIXEL
        </div>
        <div onClick={() => typeErcClick(2)} className={`
${commonModalNum == 2
            ? swapStyles.swap_right_type_select_div_selected
            : swapStyles.swap_right_type_select_div
          }
                `}>
          ERC721
        </div>
        <div onClick={() => typeErcClick(3)} className={`
${commonModalNum == 3
            ? swapStyles.swap_right_type_select_div_selected
            : swapStyles.swap_right_type_select_div
          }
                `}>

          ERC20
        </div>
      </div>

    </>
  )
}
