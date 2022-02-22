//SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

contract nft is ERC721URIStorage {
    using Counters for Counters.Counter;
    address contractAdress;
    Counters.Counter private _tokenID;

    constructor (address marketAddress) ERC721("FreekcordNFT", "FK") {
        contractAdress = marketAddress;
    }


    function createToken(string memory tokenURI) public returns (uint256) {
        //_tokenID starts at 0, the first minted NFT will recieve a tokenID of 1, then 2, etc.
        _tokenID.increment();
        //mints the nft, and sets the owner as the msg.sender or the buyer
        _mint(msg.sender, _tokenID.current());
        //sets the custom URI to the current token
        _setTokenURI(_tokenID.current(), tokenURI);
        //literally no clue what is happening, just saw it in example code
        setApprovalForAll(contractAdress, true);

        return _tokenID.current();
    }

}   