import allswapStyles from "../pages/styles/allswap.module.css"
export default function AllSwapCart({ header, content }) {



  return (
    <div className={allswapStyles.all_swap_type_main}>
      <div className={allswapStyles.all_swap_type_header}>
        {header}
      </div>
      <div className={allswapStyles.all_swap_type_content}>
        - {content}
      </div>
    </div>

  );
}
