import React, { useEffect } from "react";
import styles from "@styles/profile.module.css";
import QuoteList from "../elements/list";
import UserCard from "../elements/user_card";
import { useSearchParams } from "react-router-dom";
import {
  useGetUserProfileByIdQuery,
  useLazyGetProfilePostsQuery,
} from "@components/redux/apis/profile";
import { CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import { QuotesWithProfile } from "@components/interfaces";
import { debounce } from "lodash";

const initialParams = {
  page: 0,
  limit: 10,
};

const Account = () => {
  const [params] = useSearchParams();

  const userId = params.get("userId");

  const [query, setQuery] = React.useState(initialParams);

  const { data: { data: user } = {}, isLoading } = useGetUserProfileByIdQuery(
    userId || "",
    { skip: !userId },
  );

  const [hasMore, setHasMore] = React.useState(true);
  const [quotes, setQuotes] = React.useState<QuotesWithProfile[]>([]);

  const [getProfilePosts, { isLoading: isLoadingPosts }] =
    useLazyGetProfilePostsQuery();

  const debouncedFunction = debounce(async () => {
    setQuery((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  }, 1000);

  const triggerMorePosts = async () => {
    if (isLoadingPosts || !hasMore) return; // Prevent multiple requests
    debouncedFunction();
  };

  useEffect(() => {
    if (!userId) return;

    getProfilePosts({ userId: userId, page: query.page, limit: query.limit })
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
  }, [query.page, userId]);

  return (
    <div className="main_container">
      <div className={styles.container}>
        {isLoading && <CircularProgress className="loader" />}

        {user && typeof quotes === "object" ? (
          <div>
            <h1>{user?.username} Profile</h1>
            <UserCard data={user} />

            <h1>Quotes By User</h1>
            <InfiniteScroll
              pageStart={0}
              loadMore={triggerMorePosts}
              hasMore={hasMore}
            >
              {quotes?.map((item) => (
                <QuoteList
                  key={item.quoteId}
                  data={item}
                  image={user?.profile_url}
                />
              ))}
            </InfiniteScroll>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Account;
