import {ethers} from "ethers";
import {useDispatch} from "react-redux";
import {setAccount} from "../Store/slicers/accounts";

export const useSetAccount = () => {
    const dispatch = useDispatch();
    const connectAccount = async () =>{
        if(window.ethereum){
            try{
                await window.ethereum.request({method: "eth_requestAccounts"});
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const account = await signer.getAddress();
                dispatch(setAccount(account));
            }catch(err){
                console.log(err);
            }
        }else{
            console.log("Install Metamask");
        }
        //we want to connect goerli test network
        if( window.ethereum.chainId === "0x5"){
            console.log("Connected to Goerli Test Network");
        }
        else{
            console.log("Connect to Goerli Test Network");
        }
    }
    
    return connectAccount;
}