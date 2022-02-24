const hardhat = require('hardhat');

async function main() {
    const NFTMarket = await hardhat.ethers.getContractFactory('NFTMarket');
    const market = await NFTMarket.deploy();
    await market.deployed();
    console.log("NFTMarket address:", market.address);


    const NFT = await hardhat.ethers.getContractFactory('NFT');
    const nft = await NFT.deploy(market.address);
    await nft.deployed();
    console.log("NFT address:", nft.address);
}

main().then(() => process.exit(0)).catch(error => { console.error(error); process.exit(1); } );