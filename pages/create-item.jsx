import { useState } from "react";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

import { Input } from "@material-ui/core";

const client = ipfsHttpClient('');

import { nftaddress, nftmarketaddress } from "../config";

import NFT from "../artifacts/contracts/nft.sol/NFT.json";
import NFTMarket from "../artifacts/contracts/market.sol/NFTMarket.json";

const CreateItem = () => {

    const [fileUrl, setFileUrl] = useState();
    const [formInput, setFormInput] = useState({ name: "", description: "", price: "" });
    const router = useRouter();



    return (
        <div>
            <h1>Create Item</h1>
            <Input />
        </div>
    )
}

export default CreateItem;