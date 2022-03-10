import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { Web3Modal } from "web3modal";

import { Input, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from '../components/navbar';

// const client = ipfsHttpClient('');

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/nft.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/market.sol/NFTMarket.json";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
    },
    mainTitle: {
        color: '#ffffff',
        fontFamily: theme.typography.fontFamily.primary,
        margin: '3rem'
    }
}));


const CreateItem = () => {

    const classes = useStyles();
    
    const [fileUrl, setFileUrl] = useState();
    const [formInput, setFormInput] = useState({ name: "", description: "", price: "" });
    const router = useRouter();



    return (
        <>
            <Navbar />
            <div className={classes.root}>
                <Typography variant="h2" className={classes.mainTitle}>
                    Upload Your Art
                </Typography>
            </div>
        </>

    )
}

export default CreateItem;