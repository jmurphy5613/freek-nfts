import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { Web3Modal } from "web3modal";

import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Navbar from '../components/navbar';

const client = ipfsHttpClient('');

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/nft.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/market.sol/NFTMarket.json";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        minHeight: '100vh',
        minWidth: '100vw',
        margin: 0,
        padding: 0,
    },  
    mainTitle: {
        color: '#ffffff',
        fontFamily: theme.typography.fontFamily.primary,
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '7vh',
    }
}));


const CreateItem = () => {

    const classes = useStyles();

    const [fileUrl, setFileUrl] = useState();
    const [formInput, setFormInput] = useState({ name: "", description: "", price: "" });
    const router = useRouter();

    async function onChange(e) {
        const file = e.target.files[0];

        try {
            const added = await client.add(file);
            const url = 'https://ipfs.infura.io/ipfs/' + added.path;
            setFileUrl(url);
        } catch (err) {
            console.error(err);
        }
    }

    async function createItem() {
        const { name, description, price } = formInput;
        if(!name || !description || !price) {
            return;
        }
        const data = JSON.stringify({ name, description, image: fileUrl });
        try {
            const added = await client.add(data);
            const url = 'https://ipfs.infura.io/ipfs/' + added.path;
            createSale(url);
        } catch (err) {
            console.error(err);
        }
    }

    async function createSale(url) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        let contract = new ethers.Contract(nftaddress, NFTMarket.abi, signer);
        let transaction = await contract.createToken(url);
        let receipt = await transaction.wait();
    }
    return (
            <div className={classes.root}>
                <Navbar />
                <Container maxWidth="md" className={classes.mainContent}>
                    <Typography variant="h2" className={classes.mainTitle}>
                        Upload Your Art
                    </Typography>
                    <Button variant="" style={{ width: '100%' }}>
                        Submit
                    </Button>
                </Container>
            </div>

    )
    
}

export default CreateItem;