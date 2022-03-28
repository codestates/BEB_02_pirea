import axios from "axios";
import useSWR from "swr";


export default function LoadSwapHave({ haveForm }) {

  if (haveForm['type'] === "ERC721") {
    return (
      <>
        <div>
          <div>
            contract address: {haveForm['tokenAddress']}
          </div>
          <div>
            token id: {haveForm['tokenId']}
          </div>
          <div>
            type: {haveForm['type']}
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
          <div>
            contract address: {haveForm['tokenAddress']}
          </div>
          <div>
            amount: {haveForm['amount']}
          </div>
          <div>
            type: {haveForm['type']}
          </div>
        </div>
      </>
    )
  }

}
