//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721_Create is ERC721, Ownable {
      uint16 newItemId;
      uint16 _tokenIds;

      mapping(address => uint256) private _recipient;
      mapping(uint16 => uint16) public _newItemId;
      // Question 1
      // X,Y를 밖에서 받냐 안에서 지정하고시작하냐
      mapping(uint16 => uint16) private _X;
      mapping(uint16 => uint16) private _Y;
      
    constructor() ERC721("Land", "Pixel") {
      uint256 pixelPrice = 10e18;
    }
    
    function _mint(address recipient, string memory tokenURI) public onlyOwner {
        require(newItemId < 200);
        require(recipient != address(0), "ERC721: mint to the zero address");
        require(!_exists(newItemId), "ERC721: token already minted");

        // xy를 증가시키면서 민팅을 실행한다.
        for (uint16 X = 0; X < 11; X++) {
          for (uint16 Y = 0; Y < 21; Y++) {
          X = X - 4;
          Y = Y - 9;
          }
        }
          // Question 2
          // ex11번째 토큰
          // string corX = _tokenIds%10 -5
          // string corY = _tokenIds%20 -10

        _mint(recipient, tokenURI);
        
        _tokenIds++;
         newItemId = _tokenIds;
        
        return newItemId;
    }
}