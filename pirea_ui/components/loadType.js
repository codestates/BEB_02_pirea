import loadStyles from "./styles-component/load.module.css"

export default function LoadType({ form, tokenUrl, approve }) {

  if (form['type'] === "ERC721") {
    return (
      <>
        <div className={loadStyles.load_type_form_main}>
          <div className={loadStyles.load_type_main}>
            <div className={loadStyles.load_type_header}>
              swapping token metadata url
            </div>
            <div className={loadStyles.load_type_content}>
              {tokenUrl}
            </div>
          </div>
          <div className={loadStyles.load_type_main}>
            <div className={loadStyles.load_type_header}>
              contract address
            </div>
            <div className={loadStyles.load_type_content}>
              {form['tokenAddress']}
            </div>
          </div>
          <div className={loadStyles.load_type_main}>
            <div className={loadStyles.load_type_header}>
              tokenId
            </div>
            <div className={loadStyles.load_type_content}>
              {form['tokenId']}
            </div>
          </div>
          <div className={loadStyles.load_type_main}>
            <div className={loadStyles.load_type_header}>
              type
            </div>
            <div className={loadStyles.load_type_content}>
              {form['type']}
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
          <div>
            <div className={loadStyles.load_type_header}>
              contract address
            </div>
            <div>
              {form['tokenAddress']}
            </div>
          </div>
          <div>
            <div className={loadStyles.load_type_header}>
              amount
            </div>
            <div>
              {form['amount']}
            </div>
          </div>
          <div>
            <div className={loadStyles.load_type_header}>
              type
            </div>
            <div>
              {form['type']}
            </div>
          </div>
        </div>
      </>
    )
  }
}
