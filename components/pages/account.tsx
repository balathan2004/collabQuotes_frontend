import React, { useState } from "react";
import styles from "@styles/profile.module.css";
import AuthorQuoteList from "@components/elements/auth_list";
import UserCard from "../elements/user_card";
import { useAuth } from "@components/redux/apis/authSlice";
import { useGetUserQuotesQuery } from "../redux/apis/profile";
import ConfirmPopup from "@components/elements/ComfirmPopup";
import { useDeletePostMutation } from "@components/redux/apis/postApi";
import { CircularProgress } from "@mui/material";
import { CustomToast } from "@components/elements/CustomAlert";

import { useNavigate } from "react-router-dom";

const Account = () => {
  const { data: userData, handleLogout } = useAuth();
  const [selectedId, setSelectedId] = useState<string>("");

  const {
    data: quotesData,
    error,
    isLoading: isLoadingQuotes,
  } = useGetUserQuotesQuery();

  const [deletePost, { isLoading }] = useDeletePostMutation();

  const handleDelete = () => {
    if (!selectedId) return;

    deletePost({ postId: selectedId })
      .unwrap()
      .then((res) => {
        CustomToast({ type: "success", message: res.message });
        setSelectedId("");
      })
      .catch((err) => {
        CustomToast({ type: "error", message: err.message || "Error Caught" });
        console.log(err);
      });
  };

  const logout = async () => {
    handleLogout()
  };

  return (
    <div className="main_container">
      <div className={styles.container}>
        {/* {profileUserData && profilePosts ? ( */}
        <div>
          <h1>Your Profile</h1>
          <ConfirmPopup
            btnFunc1={() => setSelectedId("")}
            isVisible={!!selectedId}
            message="are you sure want to delete the post"
            title="Confimation"
            btnFunc2={handleDelete}
            btnLabel2="Yes"
          />
          <UserCard data={userData} />
          <button onClick={logout}>Logout</button>

          <h1>Quotes By User</h1>

          {isLoadingQuotes && <CircularProgress className="loader" />}

          {quotesData?.userPosts?.map((item) => (
            <AuthorQuoteList
              key={item.quoteId}
              data={item}
              image={userData.profile_url}
              idSelector={setSelectedId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
