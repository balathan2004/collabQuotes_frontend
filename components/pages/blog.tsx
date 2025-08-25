import {
  QuotesInterfaceWithProfile,
  PostResponseConfig,
} from "@components/interfaces";
import { FC, useEffect, useState } from "react";
import QuoteList from "../elements/list";
import styles from "@styles/blog.module.css";
import InfiniteScroll from "react-infinite-scroller";
import { useLoadingContext } from "@components/context/loading_context";
import { debounce } from "lodash";

import { CircularProgress } from "@mui/material";
import { useLazyGetBlogQuery } from "@components/redux/apis/blogApi";
const url = import.meta.env.VITE_DEST_URL;

function LoadingTextComponent() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dot}></div>
      <span className={styles.text}>Fetching Posts</span>
    </div>
  );
}

const Blog: FC = () => {
  const [quotesData, setQuotesData] = useState<QuotesInterfaceWithProfile[]>(
    []
  );
  // const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
  });

  const [getBlogs, { isLoading }] = useLazyGetBlogQuery();

  const [hasMorePosts, setHasMorePosts] = useState(true);

  const fetchMorePosts = async () => {
    try {
      getBlogs(query)
        .unwrap()
        .then((res) => {
          setQuotesData((prev) => {
            const newQuotes = res.quotes.filter(
              (quote) =>
                !prev.some(
                  (existingQuote) => existingQuote.quoteId === quote.quoteId
                )
            );

            return [...prev, ...newQuotes];
          });
        });
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  const debouncedFunction = debounce(async () => {
    setQuery((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  }, 1000);

  const triggerMorePosts = async () => {
    if (isLoading || !hasMorePosts) return; // Prevent multiple requests
    debouncedFunction();
  };

  useEffect(() => {
    fetchMorePosts();
  }, [query]);

  return (
    <div className="main_container">
      <div className={styles.container}>
        <h1>Blog</h1>

        <InfiniteScroll
          pageStart={0}
          loadMore={triggerMorePosts} // Use the debounced function for scrolling
          hasMore={hasMorePosts}
        >
          {quotesData?.map((item) => (
            <QuoteList
              key={item.quoteId}
              data={item}
              image={item.profile_url}
            />
          ))}
          <div></div>
        </InfiniteScroll>

        {hasMorePosts ? <LoadingTextComponent /> : ""}
      </div>
    </div>
  );
};

export default Blog;
