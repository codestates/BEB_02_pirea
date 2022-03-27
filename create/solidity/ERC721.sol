//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721_Create is ERC721, Ownable {
      uint16 newItemId;
      uint16 _tokenIds;
      // 초기값설정
    constructor() ERC721("Land", "Pixel") {
      // 여기에 초기값설정가능? 함수실행시 한번만실행 변수의 값을 지정 해주는곳
    }
    
    // mint function
    // there are few conditions
    // 1. tokenId  0 to 199
    function _mint(address recipient, string memory tokenURI) public onlyOwner returns (uint16) {
        require(recipient != address(0), "ERC721: mint to the zero address");
        require(!_exists(newItemId), "ERC721: token already minted");
        require(newItemId < 200);
        // 좌표값을더해준다.tokenId값과 매핑
        _tokenIds++;

         newItemId = _tokenIds;
        _mint(recipient, tokenURI);
        
        return newItemId;
    }
    //tokenId값이 들어오면 좌표를 리턴
}