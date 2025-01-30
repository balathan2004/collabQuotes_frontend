import React, { Component, FC } from "react";
import styles from "@styles/profile.module.css";
import { UserDataInterface } from "../interfaces";
import moment from "moment";
interface Props {
  data: UserDataInterface;
}


const timeHandler=(date:number)=>{
  return moment(new Date(date)).fromNow()
}


const UserCard: FC<Props> = ({ data }) => {
  return (
    <div className={styles.user_card}>
      <div className={styles.left}>
        <img src={data.profile_url} alt="profile image" />
      </div>
      <div className={styles.right}>
        <a href="#" className={styles.username}>{data.username}</a>
        <span>{data.email}</span>
        <span>Joined {timeHandler(data.createdAt)}</span>
        
      </div>
    </div>
  );
};

export default UserCard;
