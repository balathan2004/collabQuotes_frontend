import React, { useEffect, useState } from "react";
import styles from "@styles/profile.module.css";
import AuthorQuoteList from "@components/elements/auth_list";
import UserCard from "../elements/user_card";
import { useAuth } from "@components/redux/apis/authSlice";
import {
  useLazyGetMyQuotesQuery,
  useGetUserProfileQuery,
} from "../redux/apis/profile";
import ConfirmPopup from "@components/elements/ComfirmPopup";
import { useDeletePostMutation } from "@components/redux/apis/postApi";
import { CircularProgress } from "@mui/material";
import { CustomToast } from "@components/elements/CustomAlert";
import { Quotes } from "@components/interfaces";
import InfiniteScroll from "react-infinite-scroller";
import { debounce } from "lodash";

const Account = () => {
  const [query, setQuery] = useState({ page: 0, limit: 10 });

  const { handleLogout } = useAuth();
  const [selectedId, setSelectedId] = useState<string>("");

  const [hasMore, setHasMore] = useState(true);

  const { data: { data: profileData } = {}, isLoading: isLoadingProfile } =
    useGetUserProfileQuery();

  const [getQuotes, { isLoading }] = useLazyGetMyQuotesQuery();

  const [quotes, setQuotes] = useState<Quotes[]>([]);

  const [deletePost] = useDeletePostMutation();

  const handleDelete = () => {
    if (!selectedId) return;

    deletePost({ postId: selectedId })
      .unwrap()
      .then((res) => {
        CustomToast({ type: "success", message: res.message });
        setQuotes((prev) =>
          prev.filter((quote) => quote.quoteId !== selectedId),
        );
        setSelectedId("");
      })
      .catch((err) => {
        CustomToast({ type: "error", message: err.message || "Error Caught" });
        console.log(err);
      });
  };

  const logout = async () => {
    localStorage.removeItem("collabQuotes_refreshToken");
    localStorage.removeItem("collabQuotes_accessToken");
    handleLogout();
  };

  const debouncedFunction = debounce(async () => {
    setQuery((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  }, 1000);

  const triggerMorePosts = async () => {
    if (isLoading || !hasMore) return; // Prevent multiple requests
    debouncedFunction();
  };

  useEffect(() => {
    getQuotes(query)
      .unwrap()
      .then((res) => {
        setHasMore((res.totalCount || 0) > (query.page * query.limit || 0));
        setQuotes((prev) => {
          const existingIds = new Set(prev.map((quote) => quote.quoteId));

          const newQuotes = res.data.filter(
            (quote) => !existingIds.has(quote.quoteId),
          );

          return [...prev, ...newQuotes];
        });
      });
  }, [query.page]);

  return (
    <div className="main_container">
      <div className={styles.container}>
        <h1>Your Profile</h1>
        <ConfirmPopup
          btnFunc1={() => setSelectedId("")}
          isVisible={!!selectedId}
          message="are you sure want to delete the post"
          title="Confimation"
          btnFunc2={handleDelete}
          btnLabel2="Yes"
        />
        {profileData && <UserCard data={profileData} />}
        <button onClick={logout}>Logout</button>

        <h1>Quotes By User</h1>

        {isLoadingProfile ? <CircularProgress className="loader" /> : null}
        <InfiniteScroll
          loadMore={triggerMorePosts}
          pageStart={0}
          hasMore={hasMore}
        >
          {quotes?.map((item) => (
            <AuthorQuoteList
              key={item.quoteId}
              data={item}
              image={profileData?.profile_url || ""}
              idSelector={setSelectedId}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Account;
