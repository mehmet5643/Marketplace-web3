import React, { useEffect } from "react";
import styles from "./MyPofile.module.scss";
import { useGetNFTs } from "../../Hooks/useGetNFTs";
import { useSelector } from "react-redux";

export const MyProfile = () => {
  const { getNFTs } = useGetNFTs();
  const account = useSelector((state) => state.accounts.account);
  useEffect(() => {
    const work = async () => {
      await getNFTs();
    };
    work();
  }, [account]);
  return (
    <div>
      <h1>My Profile</h1>
    </div>
  );
};
