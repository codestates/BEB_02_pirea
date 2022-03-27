export const approveOrder = (setTmpOrder) => {
  console.log(setTmpOrder);
  var approveForm;
  if (setTmpOrder['type'] == 1 || setTmpOrder['type'] == 2) {
    approveForm = {
      tokenAddress: setTmpOrder['address'],
      tokenId: setTmpOrder['tokenId'],
      type: 'ERC721',
    }
  } else {
    approveForm = {
      tokenAddress: setTmpOrder['address'],
      amount: setTmpOrder['amount'],
      type: 'ERC20',
    }
  }
  return approveForm
}
