## Project Overview

## Smart Contracts
# nft.sol: 
This contract manages the minting and distribution of each NFT. 

- The constructor takes in a market address which sets the contractAdress which is reference in the rest of the contract. 
- The function createToken takes in a tokenURI which is a unique idendifier of what the token "looks" like. The tokenID is incremented for each NFT that is created, this allows us to track each NFT on the blockchain. 
- The _mint function is called to create a new NFT in the address of the sender of the function (the buyer).
- The function call to _setTokenURI sets the custom URI to the current token
- The function call of setApprovalForAll: ???????

# market.sol
This contract manages the selling of each NFT and creates functions that can give the blockchain data to the frontend.

- Each market item is mapped to a state that is maintained within this smart contract it follows the following structure:

`MarketItem : { uint itemId, address nftContract, uint tokenId, address payable owner, address payable original owner, uint price, bool isBeingSold }`

- The original creator is the address of the orginal sellers of the NFT





