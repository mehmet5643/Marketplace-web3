import styles from "./Navbar.module.scss";
import React from "react";
import { parseAddress } from "../../utils/parseAddress";
import { NavLink } from "react-router-dom";
import LOGO from "../../Assets/logoTransparent.png";
import { useSetAccount } from "../../Hooks/useSetAccount";
import { useSelector } from "react-redux";
export const Navbar = () => {
  const connectAccount = useSetAccount();
  const account = useSelector((state) => state.accounts.account);
  return (
    <div className={styles.wrapper}>
      <div className={styles.brand}>
        <img src={LOGO} className={styles.logo} />
        <div className={styles.title}>Recycle Marketplace</div>
      </div>
      <div className={styles.links}>
        <NavLink to="/" className={styles.link}>
          Home
        </NavLink>
        <NavLink to="/myprofile" className={styles.link}>
          My Profile
        </NavLink>
        <NavLink to="/listeditems" className={styles.link}>
          Listed Items
        </NavLink>
      </div>
      <button onClick={() => connectAccount()}>{account ? parseAddress(account) : "Connect Wallet" }</button>
    </div>
  );
};
