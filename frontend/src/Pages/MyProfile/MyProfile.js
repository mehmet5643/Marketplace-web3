import React, { useEffect } from "react";
import styles from "./MyPofile.module.scss";
import { useGetNFTs } from "../../Hooks/useGetNFTs";
import { useSelector } from "react-redux";
import { NFT } from "../../Components";

export const MyProfile = () => {
  const { getNFTs } = useGetNFTs();
  const account = useSelector((state) => state.accounts.account);
  const nft = useSelector((state) => state.accounts.myNFTs);
  useEffect(() => {
    const work = async () => {
      await getNFTs();
    };
    work();
  }, [account]);
  return (
    <div className={styles.wrapper}>
      {
        nft?.map((nft) => {
          return <NFT key={nft.tokenId} nft={nft} />
        }
        )
      }
    </div>
  );
};
