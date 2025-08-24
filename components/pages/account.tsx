import React, {  useState } from "react";
import styles from "@styles/profile.module.css";
import { UserDataInterface } from "../interfaces";
import { QuoteInterface } from "../interfaces";
import AuthorQuoteList from '@components/elements/auth_list'
import UserCard from "../elements/user_card";
import { useLoadingContext } from "@components/context/loading_context";
import { useAuth } from "@components/redux/apis/authSlice";
import {useGetUserQuotesQuery} from '../redux/apis/profile'

const Account = () => {
  const url = import.meta.env.VITE_DEST_URL;



  const {data:userData,accessToken}=useAuth()
  console.log('userData: ', accessToken);



  const { setIsLoading } = useLoadingContext();

  const {data:quotesData,error}=useGetUserQuotesQuery()

  console.log({quotesData,error})


  return (
    <div className="main_container">
      <div className={styles.container}>
        {/* {profileUserData && profilePosts ? ( */}
          <div>
            <h1>Your Profile</h1>
            <UserCard data={userData} />

            <h1>Quotes By User</h1>
            {quotesData?.userPosts?.map((item) => (
              <AuthorQuoteList
                key={item.quoteId}
                data={item}
                image={userData.profile_url}
                isUserId={userData.userId}
                // filterData={setProfilePosts}
              />
            ))}
          </div>
        {/* ) : null} */}
      </div>
    </div>
  );
};

export default Account;
