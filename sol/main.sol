// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract cozNFTs is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Axis {
      int16 x;
      int16 y;
    }

    uint256 pixelPrice = 10e18;
    mapping (uint16 => Axis) public axis;
    mapping (int16 => mapping (int16 => bool)) _axisExists;

    function _beforeTokenTransfer(
      address from,
      address to
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

    
    function mintNFT(address recipient, string memory tokenURI, int16 x, int16 y) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        require( -4 <= x_value  && x_vluae <= 5);
        require( -10 <= y_value && y_value <= 10);
        require(!axis[x][y]);
        require(recipient != address(0), "ERC721 mint to zero address");

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _axisExists[x][y] = true;
        axis.push(x, y);


        return newItemId;
    }

    function tokenAxis(uint256 tokenId) public view returns (int16, int16) {
      return (axis[tokenId].x, axis[tokenId].y);
    }
}
