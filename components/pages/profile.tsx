import React, { useEffect, useState } from "react";
import styles from "@styles/profile.module.css";
import { UserDataInterface } from "../interfaces";
import { QuoteInterface, ProfileResponseCofig } from "../interfaces";
import QuoteList from "../elements/list";
import UserCard from "../elements/user_card";
import { useSearchParams } from "react-router-dom";
import { useLoadingContext } from "@components/context/loading_context";
import { useGetProfileByIdQuery } from "@components/redux/apis/profile";
const Account = () => {
  const url = import.meta.env.VITE_DEST_URL;
  const [params]=useSearchParams()

  const userId=params.get("userId")
  const [profileUserData, setProfileUserData] =
    useState<UserDataInterface | null>(null);
  const [profilePosts, setProfilePosts] = useState<QuoteInterface[] | null>(
    null
  );

  const {data:profileData,isLoading}=useGetProfileByIdQuery(userId||"",{skip:!userId})

 
  const{setIsLoading}=useLoadingContext();

  // useEffect(() => {
  //   async function fetchData() {
  //     setIsLoading(true)
  //     const response = await fetch(`${url}/profile/get_profile/${userId}`, {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const res = (await response.json()) as ProfileResponseCofig;

  //     if (res && res.status == 200 && res.userData) {
  //       setProfilePosts(res.userPosts);
  //       setProfileUserData(res.userData);
  //     }
  //     setIsLoading(false)
  //   }
  //   fetchData();
  // }, [userId]);

  return (
    <div className="main_container">
    <div className={styles.container}>
      {profileData?.userData && profileData.userPosts ? (
        <div>
        <h1>{profileData.userData?.username} Profile</h1>
          <UserCard data={profileData.userData} />
          
          <h1>Quotes By User</h1>
          {profileData.userPosts?.map((item) => (
            <QuoteList key={item.quoteId} data={item} image={profileData?.userData?.profile_url} />
          ))}
       
        </div>
      ) : null}
    </div>
  </div>
  );
};

export default Account;
