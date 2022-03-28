//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721_Create is ERC721, Ownable {
      uint16 newItemId;
      uint16 _tokenIds;
      int16 x;
      int16 y;

      mapping(address => uint256) private _recipient;
      mapping(uint16 => uint16) public _newItemId;
      mapping(uint16 => int16) public _X;
      mapping(uint16 => int16) public _Y;
      
    constructor() ERC721("Land", "Pixel") {
      uint256 pixelPrice = 10e18;
       x = -4;
       y = -9;
    }
    
    function _mint(address recipient, string memory tokenURI) public onlyOwner returns (uint16) {
          // 총 개수는 200개
          //x,y가 한계값을 넘어갔는지 확인한다. x가 5안넘게 , y가 10이안넘게
        require(newItemId < 201);
        require(recipient != address(0), "ERC721: mint to the zero address");
        require(!_exists(newItemId), "ERC721: token already minted");
        require(x < 5 && y < 10);

        _mint(recipient, tokenURI);
        
        // xy를 증가시키면서 민팅을 실행한다.
          // tokenIds로 x,y값을 구할 수 있음.
          // uint16  coorX = _tokenIds%10 -5;
          // uint16  coorY = _tokenIds%20 -10;
          _tokenIds++;
          x++;
          y++;
          // 한계값에서 초기화
          if(x > 4) {
            x = -4;
          } 
          if(y > 9) {
            y = -9;
          }

         newItemId = _tokenIds;
        
        return newItemId;
    }

    //x,y값으로 토큰값 구하기
    function returnTokenIds() public view returns ( int16 ) {
      return (x + y + 13);
    }
    
    
}