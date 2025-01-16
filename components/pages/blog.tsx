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
  const [isLoading, setIsLoading] = useState(false);
  const [startFrom, setStartFrom] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  // Fetch function for both initial load and scrolling
  const fetchMorePosts = async () => {
    try {
      const response = await fetch(
        `${url}/posts/get_posts?page=${startFrom}&limit=5`,
        { method: "GET" }
      );

      if (response.ok) {
        const data: PostResponseConfig = await response.json();
        const { quotes } = data;

        if (quotes && quotes.length > 0) {
          // Filter out duplicates before updating state
          setQuotesData((prevData) => [...prevData, ...quotes]);

          setStartFrom((prev) => prev + 1);
        } else {
          setHasMorePosts(false);
        }
      } else {
        console.error("Failed to fetch more posts");
        setHasMorePosts(false);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  const debouncedFunction = debounce(async () => {
    await fetchMorePosts();
    setIsLoading(false);
  }, 1000);

  const triggerMorePosts = async () => {
    if (isLoading || !hasMorePosts) return; // Prevent multiple requests
    setIsLoading(true); // Set loading as soon as debounce starts
    debouncedFunction();
  };

  useEffect(() => {
    fetchMorePosts();
  }, []);

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
