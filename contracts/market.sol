// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarket is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter public itemCounter = Counters.Counter(0);
  Counters.Counter public ownerCounter = Counters.Counter(0);

  address payable public feeAcount;
  uint public immutable fee;


  constructor(uint _fee)  {
    feeAcount = payable(msg.sender);
    fee = _fee;
  }

  struct Item {
    IERC721 nft;
    address payable owner;
    uint price;
    uint tokenId;
    bool isSold;
  }

  mapping(uint => Item) public items;

  //getters and setters
  function getItem(uint _tokenId) public view returns (Item) {
    return items[_tokenId];
  }

  function getItemOwner(uint _tokenId) public view returns (address) {
    return items[_tokenId].owner;
  }

  function getItemPrice(uint _tokenId) public view returns (uint) {
    return items[_tokenId].price;
  }

  function getItemIsSold(uint _tokenId) public view returns (bool) {
    return items[_tokenId].isSold;
  }

  function getItemNFT(uint _tokenId) public view returns (IERC721) {
    return items[_tokenId].nft;
  }

  function getItemCount() public view returns (uint) {
    return itemCounter.get();
  }

  function getOwnerCount() public view returns (uint) {
    return ownerCounter.get();
  }

  function getFee() public view returns (uint) {
    return fee;
  }

  function getFeeAccount() public view returns (address) {
    return feeAcount;
  }

}