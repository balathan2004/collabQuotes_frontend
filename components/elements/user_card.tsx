import React, { Component, FC } from "react";
import styles from "@styles/profile.module.css";
import { UserDataInterface } from "../interfaces";

interface Props {
  data: UserDataInterface;
}

const UserCard: FC<Props> = ({ data }) => {
  return (
    <div className={styles.user_card}>
      <div className={styles.left}>
        <img src={data.profile_url} alt="profile image" />
      </div>
      <div className={styles.right}>
        <span>{data.username}</span>
      </div>
    </div>
  );
};

export default UserCard;
