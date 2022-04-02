// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFT is ERC721URIStorage {

    uint public itemCounter = 0;

    constructor() ERC721("Freek NFT", "FRK") {}

    function mint(string memory _tokenURI) external returns(uint) {
        itemCounter++;

        _safeMint(msg.sender, itemCounter);
        _setTokenURI(itemCounter, _tokenURI);
        
        return itemCounter;
    }


}