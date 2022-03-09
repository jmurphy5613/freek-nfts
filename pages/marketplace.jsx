import theme from '../helpers/theme';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/navbar';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { Web3Modal } from 'web3modal';
import { nftaddress, nftmarketaddress } from '../config';
import NFT from '../artifacts/contracts/nft.sol/NFT.json';
import NFTMarket from '../artifacts/contracts/market.sol/NFTMarket.json';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        backgroundColor: theme.palette.secondary.main,
        minHeight: '100vh',
        minWidth: '100vw',
        margin: 0,
        padding: 0,
    },
}); 


const Marketplace = () => {

    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState('loading');

    const classes = useStyles();

    useEffect(() => {
        getNfts();
    }, []);

    const getNfts = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
        const marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, provider);
        const data = await marketContract.fetchMarketItems();

        const items = await Promise.all(data.map(async i => {
            const tokenUri = await tokenContract.tokenURI;
            const metaData = await axios.get(tokenUri);
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');

            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.owner,
                name: metaData.data.name,
                description: metaData.data.description,
                image: metaData.data.image,
            }
            return item;
        }));
        setNfts(items);
        setLoadingState('loaded');
    }

    const buyNft = async (nft) => {
        const web3Modal = new Web3Modal();
        const connnetion = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connnetion);

        const signer = provider.getSigner();
        const contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer);

        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');

        const transition = nftmarketaddress.createMarketSale(nftaddress, nft.tokenId, { value: price});
        await transition.wait();
        getNfts();
    }


    if(nfts.length === 0) {
        return (
            <div className={classes.root}>
                <Navbar />
                <div style={{textAlign: 'center', paddingTop: '50px'}}>
                    <h1>Sold out!</h1>
                </div>
            </div>
        )
    }

    return (

        <div className={classes.root}>
            <Navbar />
            {console.log(nfts)}
        </div>
    )
}

export default Marketplace