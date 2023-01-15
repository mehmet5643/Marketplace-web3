import styles from "./ListedItems.module.scss";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetNFTs } from "../../Hooks/useGetNFTs";
import { NFT } from "../../Components";
const ListedItems = () => {
    const acc = useSelector((state) => state.accounts.account);
    const listeditems = useSelector((state) => state.accounts.listedNFTs);
    const { getListedNFTs } = useGetNFTs();
    useEffect(() => {
      const work = async () => {
        getListedNFTs();
      };
      work();
    }, []);
  
    return (
      <div className={styles.wrapper}>
        {listeditems.length > 0
          ? listeditems.map((item, i) => {
              return (
                <NFT
                  key={i}
                  type="iki"
                  contractAddress={item[0]}
                  tokenId={item[1]}
                  price={item[2]}
                  id={item[3]}
                />
              );
            })
          : "Listed NFTs Information Is Loading..."}
      </div>
    );
  };
  
  export { ListedItems };
