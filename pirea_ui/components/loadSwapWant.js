export default function LoadWantSwap({ wantForm }) {

  if (wantForm['type'] === "ERC721") {
    return (
      <>
        <div>
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
