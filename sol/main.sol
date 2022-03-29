// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract testCoz is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("pirea", "pirea"){}


    struct Axis {
      int16 x;
      int16 y;
    }

    uint256 pixelPrice = 10e18;
    mapping (uint256 => Axis) public axis;
    mapping (int16 => mapping (int16 => uint256))_axisTokenId;
    //mapping (int16 => mapping (int16 => int256)) _axisTokenId;

    function _beforeTokenTransfer(
      address from,
      address to,
      uint256 tokenId
    ) internal
      override(ERC721, ERC721Enumerable) {
      super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(
        uint256 tokenId
    ) internal
      override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

  function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view
      override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    
    function mintNFT(address recipient, string memory tokenURI, int16 x_value, int16 y_value) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        require( -4 <= x_value  && x_value <= 5,"out of the bounds of the land");
        require( -10 <= y_value && y_value <= 10, "out of the bounds of the land");
        require(_axisTokenId[x_value][y_value] <= 0, "the owner exists");
        require(recipient != address(0), "ERC721 mint to zero address");

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _axisTokenId[x_value][y_value] = newItemId;

        Axis memory axis_tmp;
        axis_tmp.x = x_value;
        axis_tmp.y = y_value;
        axis[newItemId] = axis_tmp;

        return newItemId;
    }

    function tokenAxis(uint256 tokenId) public view returns (int16, int16) {
        return (axis[tokenId].x, axis[tokenId].y);
    }

    function getTokenId(int16 x_value, int16 y_value) public view returns(uint256) {
        return _axisTokenId[x_value][y_value];
    }
} 
