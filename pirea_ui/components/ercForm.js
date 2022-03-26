import swapStyles from "../pages/styles/swap.module.css"

export default function ErcForm({ type, axis, setErc20Amount, setErc721Id, setErcContract }) {


  if (type == 1) {
    return (
      <div className={swapStyles.swap_right_type_description_main}>
        <div>
          Smart Contract Address:
        </div>
        <div>
          X axis: &nbsp; {axis['x']}
        </div>
        <div>
          Y axis: &nbsp;  {axis['y']}
        </div>
      </div>
    )
  } else if (type == 2) {
    return (
      <>
        <div className={swapStyles.swap_right_form_main}>
          <div> contract address: </div>
          <input onChange={(e) => (e) = setErcContract(e.target.value)} type="text" name="contractAddress" placeholder="input" className={swapStyles.swap_right_type_input} />
        </div>
        <div className={swapStyles.swap_right_form_main}>
          <div> token id: </div>
          <input onChange={(e) => (e) = setErc721Id(e.target.value)} type="text" name="tokenId" placeholder="input" className={swapStyles.swap_right_type_input} />
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className={swapStyles.swap_right_form_main}>
          <div> contract address: </div>
          <input onChange={(e) => (e) = setErcContract(e.target.value)} type="text" name="contractAddress" placeholder="input" className={swapStyles.swap_right_type_input} />
        </div>
        <div className={swapStyles.swap_right_form_main}>
          <div> Amount: </div>
          <input onChange={(e) => (e) = setErc20Amount(e.target.value)} type="text" name="amount" className={swapStyles.swap_right_type_input} placeholder="input" />
        </div>

      </>
    )
  }
}
