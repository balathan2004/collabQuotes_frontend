import React, { useEffect, useState } from "react";
import styles from "@styles/profile.module.css";
import { UserDataInterface } from "../interfaces";
import { QuoteInterface, ProfileResponseCofig } from "../interfaces";
import QuoteList from "../elements/list";
import UserCard from "../elements/user_card";
import { useLoadingContext } from "@components/context/loading_context";
const Profile = () => {
  const url = import.meta.env.VITE_DEST_URL;
  const [profileUserData, setProfileUserData] =
    useState<UserDataInterface | null>(null);
  const [profilePosts, setProfilePosts] = useState<QuoteInterface[] | null>(
    null
  );
  const{setIsLoading}=useLoadingContext();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const response = await fetch(`${url}/profile/my_profile`, {
        method: "GET",
        credentials: "include",
      });
      const res = (await response.json()) as ProfileResponseCofig;

      if (res && res.status == 200 && res.userData) {
        setProfilePosts(res.userPosts);
        setProfileUserData(res.userData);
      }
      setIsLoading(false)
    }
    fetchData();
  }, []);

  return (
    <div className="main_container">
      <div className={styles.container}>
        {profileUserData ? <UserCard data={profileUserData} /> : null}

        <h1>Quotes</h1>
        {profilePosts?.map((item) => (
          <QuoteList key={item.quoteId} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
