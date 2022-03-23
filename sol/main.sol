// mapping 


contract MyNFTs is ERC721URIStorage, Ownable {
  using Counters from Counters.Counter;
  constructor() ERC20("ZeppelinTestToken", "ZTT") {
    _mint(msg.sender, 10000000e18);
  }
}

