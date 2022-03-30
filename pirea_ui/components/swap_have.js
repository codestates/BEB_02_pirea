export default function Swap_have({ type, tmpHave, axis }) {

  if (tmpHave['tokenId'] == null) {
    return (
      <>
        input data!
      </>
    );
  }
  console.log(tmpHave);

  if (type == 1) {
    return (
      <div>
        <div> PIXEL </div>
        <div>contract address: {tmpHave['address']} </div>
        {tmpHave['ownerAddr']
          ?
          (

            <div>
             ownerAddr {tmpHave['ownerAddr']}
            </div>
          )
          : (null)
        }
        <div>x: {axis['x']}</div>
        <div>y: {axis['y']}</div>
        <div>tokenid: {tmpHave['tokenId']}</div>
      </div>
    )
  } else if (type == 2) {
    return (
      <div>
        <div> ERC721 </div>
        <div>contract address: {tmpHave['address']}</div>
        <div>tokenid: {tmpHave['tokenId']}</div>
      </div>
    );
  } else {
    return (
      <div>
        <div> ERC20 </div>
        <div>contract address: {tmpHave['address']}</div>
        <div>tokenid: {tmpHave['amount']}</div>
      </div>
    )
  }
}
