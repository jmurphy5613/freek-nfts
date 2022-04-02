// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarket is ReentrancyGuard {
  using Counters for Counters.Counter;
  uint public itemCounter = 0;

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


  function createMarketItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
    require(msg.sender == feeAcount, "Only the fee account can create a new item");
    require(_price > 0, "Price must be greater than 0");
    require(_nft.ownerOf(_tokenId) == msg.sender, "You must own the token to create a new item");
    require(!items[_tokenId].isSold, "Item is already sold");

    items[itemCounter] = Item (
      _nft,
      payable(msg.sender),
      _price,
      _tokenId,
      false
    );

    itemCounter++;

  }

  function purchaceItem(uint _itemId) external payable nonReentrant {
    require(msg.sender != feeAcount, "You can't buy your own item");
    require(msg.value >= items[_itemId].price, "You don't have enough money");
    require(!items[_itemId].isSold, "Item is already sold");

    items[_itemId].owner = payable(msg.sender);
    items[_itemId].isSold = true;
    items[_itemId].nft.transferFrom(msg.sender, feeAcount, _itemId);
    feeAcount.transfer(getTruePrice(_itemId - items[_itemId].price));
  }



  //getters and setters
  function getItem(uint _tokenId) public view returns (Item memory) {
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
    return itemCounter;
  }

  function getFee() public view returns (uint) {
    return fee;
  }

  function getFeeAccount() public view returns (address) {
    return feeAcount;
  }

  function getTruePrice(uint _tokenId) public view returns (uint) {
    return ((items[_tokenId].price)*(100+fee)/100);
  }

  function getNumberOfOwners() public view returns (uint) {
    uint count = 0;
    for (uint i = 0; i < itemCounter; i++) {
      if (items[i].owner == msg.sender) {
        count++;
      }
    }
    return count;
  }

}