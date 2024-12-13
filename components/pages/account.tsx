import React, { useEffect, useState } from "react";
import styles from "@styles/profile.module.css";
import { UserDataInterface } from "../interfaces";
import { QuoteInterface, ProfileResponseCofig } from "../interfaces";
import QuoteList from "../elements/list";
import UserCard from "../elements/user_card";
import { useLoadingContext } from "@components/context/loading_context";
const Account = () => {
  const url = import.meta.env.VITE_DEST_URL;
  const [profileUserData, setProfileUserData] =
    useState<UserDataInterface | null>(null);
  const [profilePosts, setProfilePosts] = useState<QuoteInterface[] | null>(
    null
  );
  const { setIsLoading } = useLoadingContext();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch(`${url}/profile/my_profile`, {
        method: "GET",
        credentials: "include",
      });
      const res = (await response.json()) as ProfileResponseCofig;

      if (res && res.status == 200 && res.userData) {
        setProfilePosts(res.userPosts);
        setProfileUserData(res.userData);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="main_container">
      <div className={styles.container}>
        {profileUserData && profilePosts ? (
          <div>
          <h1>Your Profile</h1>
            <UserCard data={profileUserData} />

            <h1>Quotes By User</h1>
            {profilePosts?.map((item) => (
              <QuoteList key={item.quoteId} data={item} image={profileUserData.profile_url} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Account;
