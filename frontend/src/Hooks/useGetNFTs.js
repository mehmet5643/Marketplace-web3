
import { useSelector,useDispatch } from "react-redux";
import { setMyNFTs } from "../Store/slicers/accounts";
import axios from 'axios';

export const useGetNFTs = () => {
    const account = useSelector((state) => state.accounts.account);
    const dispatch = useDispatch();
  

    const options = {
      method: 'GET',
      url: 'https://eth-goerli.g.alchemy.com/nft/v2/2rz_J-1axRStunsA3Tt-1fpoLrOzZcz7/getNFTs',
      params: {owner: account, pageSize: '100', withMetadata: 'false'},
      headers: {accept: 'application/json'}
    };
    const getNFTs = async () => {
      const response = axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
      dispatch(setMyNFTs(response.data));
    }
    return { getNFTs };
};
// Setup: npm install alchemy-sdk
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
// Docs: https://docs.alchemy.com/alchemy/documentation/alchemy-sdk
