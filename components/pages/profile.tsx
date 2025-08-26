import React, {  } from "react";
import styles from "@styles/profile.module.css";
import QuoteList from "../elements/list";
import UserCard from "../elements/user_card";
import { useSearchParams } from "react-router-dom";
import { useGetProfileByIdQuery } from "@components/redux/apis/profile";
import { CircularProgress } from "@mui/material";
const Account = () => {

  const [params] = useSearchParams();

  const userId = params.get("userId");

  const { data: profileData, isLoading } = useGetProfileByIdQuery(
    userId || "",
    { skip: !userId }
  );

  return (
    <div className="main_container">
      <div className={styles.container}>
        {isLoading && <CircularProgress className="loader" />}

        {profileData?.userData && profileData.userPosts ? (
          <div>
            <h1>{profileData.userData?.username} Profile</h1>
            <UserCard data={profileData.userData} />

            <h1>Quotes By User</h1>
            {profileData.userPosts?.map((item) => (
              <QuoteList
                key={item.quoteId}
                data={item}
                image={profileData?.userData?.profile_url}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Account;
