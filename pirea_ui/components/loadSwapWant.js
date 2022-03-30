export default function LoadWantSwap({ wantForm, wantTokenUrl, approve }) {

  if (wantForm['type'] === "ERC721") {
    return (
      <>
        <div>
          <div>
            <div>
              have token url: {wantTokenUrl}
            </div>
            <div>
              contract address: {wantForm['tokenAddress']}
            </div>
            <div>
              tokenId: {wantForm['tokenId']}
            </div>
            <div>
              type: {wantForm['type']}
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
            contract address: {wantForm['tokenAddress']}
          </div>
          <div>
            amount: {wantForm['amount']}
          </div>
          <div>
            type: {wantForm['type']}
          </div>
        </div>
      </>
    )
  }
}
