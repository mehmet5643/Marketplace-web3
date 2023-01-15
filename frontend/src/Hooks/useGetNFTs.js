import { useSelector, useDispatch } from "react-redux";
import { setNFTs,setListedNFTs } from "../Store/slicers/accounts";
import axios from "axios";
import { ethers } from "ethers";
import {
  CONTRACT_ADDRESS,
  ABIMARKETPLACE,
  ABIERC721,
} from "../Contract/Constants/Infos";

export const useGetNFTs = () => {
  const account = useSelector((state) => state.accounts.account);
  const dispatch = useDispatch();

  const options = {
    method: "GET",
    url: "https://eth-goerli.g.alchemy.com/nft/v2/2rz_J-1axRStunsA3Tt-1fpoLrOzZcz7/getNFTs",
    params: { owner: account, pageSize: "100", withMetadata: "false" },
    headers: { accept: "application/json" },
  };
  const getNFTs = async () => {
    const response = axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        dispatch(setNFTs(response.data));
      })
      .catch(function (error) {
        console.error(error);
      });
     
    
  };

  const getListedNFTs = async () => {
    if (account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABIMARKETPLACE,
        signer
      );
      const contractERC721 = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABIERC721,
        signer
      );
      const number = await contract.idForSale();
      if (!(number > 0)) {
        return;
      }
      let nfts = [];
      for (let i = 0; i < number; i++) {
        let info = await contract.idToItemForSale(i);
        if (!info.state) {
          let newItem = {
            0: info.contractAddress,
            1: info.tokenId.toString(),
            2: info.price.toString(),
          };
          
          nfts.push(newItem);
        }
      }
      console.log(nfts);
      dispatch(setListedNFTs(nfts));
    }
  };
  return { getNFTs,getListedNFTs };
};
// Setup: npm install alchemy-sdk
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
// Docs: https://docs.alchemy.com/alchemy/documentation/alchemy-sdk
