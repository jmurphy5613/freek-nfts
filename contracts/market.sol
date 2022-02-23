//SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';


contract Market is ReentrancyGuard {
    using Counters for Counters.Counter;
    //need 2 counters for the amount of tokens and the number that have been sold
    Counters.Counter private _itemIds;
    Counters.Counter private _nftsSold;

    //address of the owner of the market
    address payable private _owner;

    //market fee
    uint256 private marketFee = 0 ether;
    //7-8%

    constructor(address payable owner) {
        _owner = owner;
    }

    //struct for the market item
    struct MarketItem {
        address payable owner;
        address payable buyer;
        uint256 tokenId;
        uint256 price;
        bool isSold;
        address nftAddress;
        uint itemId;
    }

    //map of market items
    mapping(uint256 => MarketItem) private _idMarketItems;

    function createMarketItem (
        address nftContract,
        uint256 price,
        uint256 tokenId
    ) public payable nonReentrant {
        require(price > 0 ether, "Price must be greater than 0 ether");
        require(tokenId > 0, "TokenId must be greater than 0");
        require(nftContract != address(0), "NFT contract must be set");

        _itemIds.increment();
        uint256 currentItemId = _itemIds.current();


        //map the item
        _idMarketItems[currentItemId] = MarketItem(
            payable (msg.sender),
            payable (address(0)),
            tokenId,
            price,
            false,
            nftContract,
            currentItemId
        );

        //transfer ownership of the token to the market
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
    }

    function createMarketSale(
        uint256 itemId
    ) public payable nonReentrant {
        require(msg.value == _idMarketItems[itemId].price, "Price must match");
        require(!_idMarketItems[itemId].isSold, "Item is already sold");
        require(msg.sender != address(0), "Buyer must be set");

        _idMarketItems[itemId].owner.transfer(msg.value);
        _idMarketItems[itemId].owner.transfer(marketFee);
        IERC721(_idMarketItems[itemId].nftAddress).transferFrom(address(this), msg.sender, _idMarketItems[itemId].tokenId);
        
        _nftsSold.increment();
    }
}