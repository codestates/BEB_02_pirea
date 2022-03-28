export default function Swap_want({ type, tmpWant, axis }) {

  if (tmpWant['tokenId'] == null) {
    return (
      <>
        input data
      </>
    );
  }

  if (type == 1) {
    return (
      <div>
        <div> PIXEL </div>
        <div>contract address: {tmpWant['address']} </div>
        <div>x: {axis['x']}</div>
        <div>y: {axis['y']}</div>
        <div>tokenid: {tmpWant['tokenId']}</div>
      </div>
    )
  } else if (type == 2) {
    return (
      <div>
        <div> ERC721 </div>
        <div>contract address: {tmpWant['address']}</div>
        <div>tokenid: {tmpWant['tokenId']}</div>
      </div>
    );
  } else {
    return (
      <div>
        <div> ERC20 </div>
        <div>contract address: {tmpWant['address']}</div>
        <div>amount: {tmpWant['amount']}</div>
      </div>
    )
  }
}
