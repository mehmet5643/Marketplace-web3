import { ethers } from "ethers";
import {
  CONTRACT_ADDRESS,
  ABIMARKETPLACE,
  ABIERC721,
} from "../Contract/Constants/Infos";

export const useContractFunctions= () =>{

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABIMARKETPLACE, signer);
    const contractERC721 = new ethers.Contract(CONTRACT_ADDRESS, ABIERC721, signer);

    const startNFTSale = async (contractAddress, tokenId, price) => {
        const state = await contract.getApproved(tokenId)
        if (state !== contract.address) {
            const tx = await contractERC721.approve(contract.address, tokenId);
            await tx.wait();
        }
        const tx = await contract.startNFTSale(contractAddress, tokenId, price);
        await tx.wait();
        
    }

  


}